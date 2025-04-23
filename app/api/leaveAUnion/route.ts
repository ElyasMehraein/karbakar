import { NextResponse } from 'next/server';

import { GET as getMe } from '@/app/api/auth/me/route';
import connectToDB from '@/configs/db';
import BusinessModel from '@/models/Business';
import UnionModel from '@/models/Union';

interface User {
  code: number;
}

interface Business {
  _id: string;
  agentCode: number;
  guild:
    | {
        _id: string;
      }
    | string;
  union?: string;
}

interface Union {
  _id: string;
  isActive: boolean;
  members: Array<{
    member: {
      _id: string;
    };
  }>;
  votes: Array<{
    voter?: string;
    voteFor?: string;
  }>;
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    // گرفتن ورودی‌های مورد نیاز از بادی
    const body = await req.json();
    const { unionID, myBusinessID, businessToRemoveID } = body;

    // اتصال به دیتابیس
    await connectToDB();

    // دریافت اطلاعات کاربر لاگین‌کرده
    const response = await getMe(req);
    if (!response.ok) {
      return NextResponse.json({ message: 'log in first' }, { status: 401 });
    }
    const user: User = await response.json();

    // پیدا کردن کسب‌وکار کاربر بر اساس myBusinessID
    // تا مطمئن شویم agentCode آن با user.code یکی است
    const myBusiness: Business =
      await BusinessModel.findById(myBusinessID).populate('guild');
    if (!myBusiness) {
      return NextResponse.json(
        { message: 'Business (of user) not found' },
        { status: 404 }
      );
    }
    // بررسی نمایندگی کاربر
    if (Number(myBusiness.agentCode) !== user.code) {
      return NextResponse.json(
        { message: '403 Unauthorized access (agentCode mismatch)' },
        { status: 403 }
      );
    }

    // پیدا کردن اتحاد
    const union: Union =
      await UnionModel.findById(unionID).populate('members.member');
    if (!union) {
      return NextResponse.json({ message: 'Union not found' }, { status: 404 });
    }

    // بررسی اینکه اتحاد اکتیو (فعال) نباشد
    if (union.isActive) {
      return NextResponse.json(
        { message: 'Cannot remove member from an active union' },
        { status: 403 }
      );
    }

    // چک کنیم آیا کسب‌وکاری که قرار است حذف شود در این اتحاد عضو هست؟
    const memberIndex = union.members.findIndex(
      (m) => m.member && m.member._id.toString() === businessToRemoveID
    );
    if (memberIndex === -1) {
      return NextResponse.json(
        { message: 'The business you want to remove is not in this union' },
        { status: 404 }
      );
    }

    // حذف آن عضو از لیست اعضای اتحاد
    union.members.splice(memberIndex, 1);

    // حذف رأی‌هایی که مربوط به آن کسب‌وکار است
    // (چه به عنوان رأی‌دهنده (voter) یا کسی که به او رأی داده شده (voteFor))
    if (Array.isArray(union.votes)) {
      union.votes = union.votes.filter(
        (vote) =>
          vote.voter?.toString() !== businessToRemoveID &&
          vote.voteFor?.toString() !== businessToRemoveID
      );
    }

    // اگر بخواهید از extensionVote هم حذف کنید، می‌توانید اینجا مشابه بالا عمل کنید
    // union.extensionVote = union.extensionVote.filter(
    //   (ev) => ev.extensionVoter?.toString() !== businessToRemoveID
    // );

    // اگر بعد از حذف، هیچ عضوی در اتحادیه باقی نمانده باشد، خود اتحاد را پاک می‌کنیم
    if (union.members.length === 0) {
      await UnionModel.findByIdAndDelete(unionID);
      return NextResponse.json(
        { message: 'The union had no members left and was deleted entirely' },
        { status: 200 }
      );
    }

    // در غیر این صورت تغییرات را ذخیره می‌کنیم
    await union.save();

    return NextResponse.json(
      { message: 'Business removed from the union successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const body = await req.json();
    const { unionId, businessId } = body;

    if (!unionId || !businessId) {
      return NextResponse.json(
        { message: 'Union ID and Business ID are required' },
        { status: 400 }
      );
    }

    const union = (await UnionModel.findById(unionId)) as Union | null;
    if (!union) {
      return NextResponse.json({ message: 'Union not found' }, { status: 404 });
    }

    const business = (await BusinessModel.findById(
      businessId
    )) as Business | null;
    if (!business) {
      return NextResponse.json(
        { message: 'Business not found' },
        { status: 404 }
      );
    }

    if (!business.union || business.union.toString() !== unionId) {
      return NextResponse.json(
        { message: 'Business is not a member of this union' },
        { status: 400 }
      );
    }

    await UnionModel.findByIdAndUpdate(unionId, {
      $pull: { members: businessId },
    });

    await BusinessModel.findByIdAndUpdate(businessId, {
      $unset: { union: '' },
    });

    return NextResponse.json(
      { message: 'Business left union successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error leaving union:', error);
    return NextResponse.json(
      { message: 'Error leaving union' },
      { status: 500 }
    );
  }
}
