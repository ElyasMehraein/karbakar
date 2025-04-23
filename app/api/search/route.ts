import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";

interface User {
    _id?: string;
    userName: string;
    code: number;
    avatarUrl?: string;
}

interface Business {
    _id?: string;
    businessName: string;
    businessBrand: string;
    avatarUrl?: string;
}

interface UserResult {
    _id: string;
    type: 'user';
    name: string;
    code: number;
    avatarUrl?: string;
}

interface BusinessResult {
    _id: string;
    type: 'business';
    name: string;
    brand: string;
    avatarUrl?: string;
}

type SearchResult = UserResult | BusinessResult;

export async function GET(request: Request): Promise<Response> {
    try {
        await connectToDB();
        const { searchParams } = new URL(request.url);
        const term = searchParams.get("term")?.trim() || "";

        if (!term) {
            return new Response(
                JSON.stringify({ data: [] }),
                { status: 200 }
            );
        }

        const parsedCode = Number(term);
        const isNumber = !isNaN(parsedCode);

        let users: User[] = [];
        let businesses: Business[] = [];

        if (isNumber) {
            users = await UserModel.find(
                { code: parsedCode },
                "userName code avatarUrl"
            )
                .limit(10)
                .lean();
        } else {
            users = await UserModel.find(
                { userName: { $regex: term, $options: "i" } },
                "userName code avatarUrl"
            )
                .limit(10)
                .lean();

            businesses = await BusinessModel.find(
                {
                    $or: [
                        { businessName: { $regex: term, $options: "i" } },
                        { businessBrand: { $regex: term, $options: "i" } },
                    ],
                },
                "businessName businessBrand avatarUrl"
            )
                .limit(10)
                .lean();
        }

        const combinedResults: SearchResult[] = [
            ...users.map(u => ({
                _id: u._id?.toString() ?? `user-${u.code}`,
                type: 'user' as const,
                name: u.userName,
                code: u.code,
                avatarUrl: u.avatarUrl,
            })),
            ...businesses.map(b => ({
                _id: b._id?.toString() ?? '',
                type: 'business' as const,
                name: b.businessName,
                brand: b.businessBrand,
                avatarUrl: b.avatarUrl,
            })),
        ];

        return new Response(
            JSON.stringify({ data: combinedResults }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in search route:", error);
        return new Response(
            JSON.stringify({ 
                message: "An error occurred", 
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500 }
        );
    }
} 