import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import BusinessModel from "@/models/Business";
import { GET } from "@/app/api/auth/me/route";
import ReportModel from "@/models/Report";
import UnionModel from "@/models/Union";
import ProductModel from "@/models/Product";
import GuildModel from "@/models/Guild";

export async function POST(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const { unionName, slogan, deadline, offerBasket, demandBasket, businessID, jobCategory, guildID, guildName, } = body;

        const res = await GET(req);
        const user = await res.json();

        if (!user || !user.code) {
            return Response.json({ message: "Please log in first" }, { status: 401 });
        }

        const loggedUser = await UserModel.findOne({ code: user.code });
        if (!loggedUser) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        const business = await BusinessModel.findById(businessID).lean();
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

        const validateAndCreateProducts = async (basket) => {
            const validatedBasket = [];

            for (const product of basket) {
                const { productName, unitOfMeasurement, isRetail } = product.product;
                if (!productName || !unitOfMeasurement || (!guildID && (!guildName || !jobCategory))) {
                    throw new Error("Incomplete product information in basket");
                }

                try {
                    let GuildInDB = guildID
                        ? await GuildModel.findById(guildID)
                        : await GuildModel.findOne({ guildName });

                    // Create a new guild if it doesn't exist
                    if (!GuildInDB) {
                        const newGuild = await GuildModel.create({
                            guildName,
                            jobCategory,
                        });
                        GuildInDB = newGuild;
                    }

                    let existingProduct = await ProductModel.findOne({
                        productName,
                        guild: GuildInDB._id,
                    });

                    // Create a new product if it doesn't exist
                    if (!existingProduct) {
                        existingProduct = new ProductModel({
                            productName,
                            unitOfMeasurement,
                            guild: GuildInDB._id,
                            isRetail,
                        });
                        await existingProduct.save();
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

        const validatedOfferBasket = await validateAndCreateProducts(offerBasket);
        const validatedDemandBasket = await validateAndCreateProducts(demandBasket);

        const newUnion = new UnionModel({
            unionName,
            slogan,
            deadline,
            createdBy: businessID,
            members: [{ member: businessID, offerBasket: validatedOfferBasket, demandBasket: validatedDemandBasket }],
        });

        await newUnion.save();

        return Response.json({ message: "Union created successfully", data: newUnion }, { status: 201 });

    } catch (error) {
        console.error("Server error:", error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
