import { NextResponse } from 'next/server';
import connectToDB from "@/configs/db";
import UnionModel from "@/models/Union";
import BusinessModel from "@/models/Business";
import { Types } from 'mongoose';

interface VoteRequest {
  unionId: string;
  voterId: string;
  voteForId: string;
  voteType: 'approve' | 'reject';
}

interface ProductTotals {
  supply: number;
  demand: number;
}

interface LeftoverResult {
  leftoverSupply: number;
  leftoverDemand: number;
}

function calculateLeftover(union: any): LeftoverResult {
  const productTotals = new Map<string, ProductTotals>();

  union.members.forEach(({ offerBasket, demandBasket }: any) => {
    offerBasket.forEach((offer: any) => {
      if (!offer?.product) return;
      const id = offer.product.toString();
      if (!productTotals.has(id)) {
        productTotals.set(id, { supply: 0, demand: 0 });
      }
      productTotals.get(id)!.supply += offer.amount;
    });

    demandBasket.forEach((demand: any) => {
      if (!demand?.product) return;
      const id = demand.product.toString();
      if (!productTotals.has(id)) {
        productTotals.set(id, { supply: 0, demand: 0 });
      }
      productTotals.get(id)!.demand += demand.amount;
    });
  });

  let leftoverSupply = 0;
  let leftoverDemand = 0;

  Array.from(productTotals.values()).forEach(({ supply, demand }) => {
    const diff = supply - demand;
    if (diff > 0) {
      leftoverSupply += diff;
    } else if (diff < 0) {
      leftoverDemand += Math.abs(diff);
    }
  });

  return { leftoverSupply, leftoverDemand };
}

function allMembersHaveVotedForEachOther(union: any): boolean {
  const memberIds = union.members.map((m: any) => m.member.toString());
  
  for (let i = 0; i < memberIds.length; i++) {
    for (let j = 0; j < memberIds.length; j++) {
      if (i === j) continue;
      const voter = memberIds[i];
      const voteFor = memberIds[j];

      const hasVote = union.votes.some(
        (v: any) =>
          v.voter.toString() === voter &&
          v.voteFor.toString() === voteFor
      );
      if (!hasVote) {
        return false;
      }
    }
  }

  return true;
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { unionId, voterId, voteForId, voteType } = await req.json() as VoteRequest;

    if (!unionId || !voterId || !voteForId || !voteType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const union = await UnionModel.findById(unionId);
    if (!union) {
      return NextResponse.json(
        { message: "Union not found" },
        { status: 404 }
      );
    }

    if (union.isActive) {
      return NextResponse.json(
        { message: "This union is already active. No more changes allowed." },
        { status: 403 }
      );
    }

    const isVoterMember = union.members.some(
      (m: any) => m.member.toString() === voterId.toString()
    );
    const isVoteForMember = union.members.some(
      (m: any) => m.member.toString() === voteForId.toString()
    );

    if (!isVoterMember || !isVoteForMember) {
      return NextResponse.json(
        { message: "Voter or voteFor is not a union member" },
        { status: 403 }
      );
    }

    if (voteType === "approve") {
      const hasAlreadyVoted = union.votes.some(
        (v: any) =>
          v.voter.toString() === voterId.toString() &&
          v.voteFor.toString() === voteForId.toString()
      );

      if (!hasAlreadyVoted) {
        union.votes.push({
          voter: new Types.ObjectId(voterId),
          voteFor: new Types.ObjectId(voteForId),
        });
      }

    } else if (voteType === "reject") {
      union.votes = union.votes.filter(
        (v: any) =>
          !(
            v.voter.toString() === voterId.toString() &&
            v.voteFor.toString() === voteForId.toString()
          )
      );

      union.members = union.members.filter(
        (m: any) => m.member.toString() !== voteForId.toString()
      );

      union.votes = union.votes.filter(
        (v: any) =>
          v.voter.toString() !== voteForId.toString() &&
          v.voteFor.toString() !== voteForId.toString()
      );

    } else {
      return NextResponse.json(
        { message: "Invalid voteType" },
        { status: 400 }
      );
    }

    await union.save();

    const { leftoverSupply, leftoverDemand } = calculateLeftover(union);
    if (leftoverSupply === 0 && leftoverDemand === 0) {
      if (allMembersHaveVotedForEachOther(union)) {
        union.isActive = true;
        await union.save();
      }
    }

    return NextResponse.json(
      { message: "Vote processed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERROR in /api/union/vote:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
} 