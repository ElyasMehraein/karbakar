import connectToDB from "@/configs/db"
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from "@/models/Bill";
import { GET } from "@/app/api/auth/me/route"
import ReportModel from "@/models/Report";

interface AnswerJobOfferRequestBody {
    reportID: string;
    parameter: boolean;
}

interface User {
    _id: string;
    businesses: string[];
    primeJob?: string;
}

interface Business {
    _id: string;
    workers: string[];
}

interface Report {
    _id: string;
    recepiant: string;
    isAnswerNeed: boolean;
    isSeen: boolean;
    answer: boolean;
    business: {
        _id: string;
    };
    save(): Promise<void>;
}

export async function PUT(req: Request): Promise<Response> {
    try {
        const { reportID, parameter }: AnswerJobOfferRequestBody = await req.json();
        const response = await GET(req);
        const user: User = await response.json();
        
        await connectToDB();
        const report = await ReportModel.findOne({ _id: reportID }) as Report | null;

        if (!report) {
            return Response.json(
                { message: "Report not found" },
                { status: 404 }
            );
        }

        if (report.recepiant.toString() !== user._id.toString()) {
            return Response.json(
                { message: "403 Unauthorized access" },
                { status: 403 }
            );
        }

        if (!report.isAnswerNeed) {
            return Response.json(
                { message: "This jobOffer already answered" },
                { status: 410 }
            );
        }

        const business = await BusinessModel.findOne({ _id: report.business._id }) as Business | null;

        if (!business) {
            return Response.json(
                { message: "Business not found" },
                { status: 404 }
            );
        }

        const isEmployeeHere = business.workers.some(
            (worker) => worker.toString() === user._id.toString()
        );

        if (isEmployeeHere) {
            return Response.json(
                { message: "you are currently a member of this business" },
                { status: 409 }
            );
        }

        report.isSeen = true;
        report.isAnswerNeed = false;
        report.answer = parameter;
        await report.save();

        if (parameter) {
            business.workers.push(user._id);
            await BusinessModel.findByIdAndUpdate(business._id, { workers: business.workers });

            const candidate = await UserModel.findOne({ _id: user._id }) as User | null;
            if (!candidate) {
                return Response.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            await UserModel.findByIdAndUpdate(
                candidate._id,
                { $addToSet: { businesses: business._id } }
            );

            if (candidate.primeJob) {
                return Response.json(
                    { message: "job offer accepted successfully" },
                    { status: 201 }
                );
            }

            await UserModel.updateOne(
                { _id: candidate._id },
                { primeJob: business._id }
            );
        }

        return Response.json(
            { message: "job offer answered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            { 
                message: "server error",
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 