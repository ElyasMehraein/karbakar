import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";
import ReportModel from "@/models/Report";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import GuildModel from "@/models/Guild";
import { NextRequest } from 'next/server';

interface Product {
    product: {
        productName: string;
        unitOfMeasurement: string;
        isRetail: boolean;
    };
    amount: number;
}

interface RequestBody {
    unionName: string;
    slogan: string;
    deadline: Date;
    offerBasket: Product[];
    demandBasket: Product[];
    businessID: string;
    guildID: string;
}

interface User {
    code: number;
    _id: string;
}

interface Business {
    _id: string;
    agentCode: number;
    guild: string;
}

interface Guild {
    _id: string;
}

interface ProductDocument {
    _id: string;
    productName: string;
    unitOfMeasurement: string;
    guild: string;
    isRetail: boolean;
}

interface ValidatedBasketItem {
    product: string;
    amount: number;
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const body: RequestBody = await req.json();
        const {
            unionName,
            slogan,
            deadline,
            offerBasket,
            demandBasket,
            businessID,
            guildID,
        } = body;

        const res = await GET(req);
        const user: User = await res.json();

        if (!user || !user.code) {
            return Response.json({ message: "Please log in first" }, { status: 401 });
        }

        const loggedUser = await UserModel.findOne({ code: user.code });
        if (!loggedUser) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const business: Business = await BusinessModel.findById(businessID).lean();
        if (!business) {
            return Response.json({ message: "Business not found" }, { status: 404 });
        }

        if (Number(business.agentCode) !== Number(user.code)) {
            return Response.json({ message: "Unauthorized access" }, { status: 403 });
        }

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const unionsCount = await UnionModel.countDocuments({
            createdBy: businessID,
            createdAt: { $gte: oneMonthAgo },
        });

        if (unionsCount >= 5) {
            return Response.json({ message: "Each business can only create 5 unions in a month" }, { status: 409 });
        }

        // Validate and create products for the baskets (offer and demand)
        const validateAndCreateProducts = async (basket: Product[], useBusinessGuild = false): Promise<ValidatedBasketItem[]> => {
            const validatedBasket: ValidatedBasketItem[] = [];
            for (const product of basket) {
                const { productName, unitOfMeasurement, isRetail } = product.product;

                // Check if the required fields for the product are present
                if (!productName || !unitOfMeasurement || !guildID) {
                    throw new Error("Incomplete product information in basket");
                }

                try {
                    let GuildInDB: Guild | null;

                    // Use the appropriate guild based on the basket type
                    if (useBusinessGuild) {
                        // For offerBasket, use the guild associated with the business
                        GuildInDB = await GuildModel.findById(business.guild);
                        if (!GuildInDB) {
                            throw new Error("Guild associated with the business not found");
                        }
                    } else {
                        // For demandBasket, find the guild based on the provided guildID
                        GuildInDB = await GuildModel.findById(guildID)
                    }

                    let existingProduct = await ProductModel.findOne({
                        productName,
                        unitOfMeasurement,
                        guild: GuildInDB._id,
                    }) as ProductDocument | null;

                    // Create a new product if it doesn't exist
                    if (!existingProduct) {
                        existingProduct = await ProductModel.create({
                            productName,
                            unitOfMeasurement,
                            guild: GuildInDB._id,
                            isRetail,
                        }) as ProductDocument;
                    }

                    validatedBasket.push({
                        product: existingProduct._id,
                        amount: product.amount,
                    });
                } catch (error) {
                    console.error("Error while validating or creating product or guild:", error);
                    throw new Error("Error while validating or creating product or guild");
                }
            }

            return validatedBasket;
        };

        // Validate and create products for both offer and demand baskets
        const validatedOfferBasket = await validateAndCreateProducts(offerBasket, true);  // For offerBasket, use the business's guild
        const validatedDemandBasket = await validateAndCreateProducts(demandBasket);       // For demandBasket, use the provided guild 

        const newUnion = await UnionModel.create({
            unionName,
            slogan,
            deadline,
            createdBy: businessID,
            members: [{ member: businessID, offerBasket: validatedOfferBasket, demandBasket: validatedDemandBasket }],
        });

        return Response.json({ message: "Union created successfully", data: newUnion }, { status: 201 });

    } catch (error: any) {
        console.error("Server error:", error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
} 