import BusinessModel from "@/models/Business"
import connectToDB from "@/configs/db"
import { verifyToken } from "@/controllers/auth";
import UserModel from '@/models/User';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import GuildModel from "@/models/Guild";

export async function POST(req) {


    try {
        const body = await req.json()
        const { businessName, guildName, jobCategory } = body;
        if (!businessName.trim() || !guildName.trim() || !jobCategory.trim()) {
            return Response.json({ message: "Entrance data is empty!" }, { status: 400 })
        }
        const englishLetters = /^[A-Za-z\-\_\.]+$/;
        if (!businessName.match(englishLetters)) {
            return Response.json({ message: "Business name must only contain English letters!" }, { status: 406 })
        }

        if (businessName.length <= 3) {
            return Response.json({ message: "Business name must be more than 3 letters!" }, { status: 405 })
        }
        connectToDB()
        let business = await BusinessModel.findOne({ businessName })
        if (!business) {
            const token = cookies().get("token")?.value;
            const tokenPayLoad = verifyToken(token);

            if (!tokenPayLoad) {
                return redirect("/w");
            }
            connectToDB()
            const user = JSON.parse(JSON.stringify(await UserModel.findOne({ _id: tokenPayLoad.id }, "primeJob code businesses")))
            if (user.businesses.length >= 3) {
                return Response.json({ message: "You can be a member of a maximum of 3 businesses" }, { status: 409 })
            }
            let getGuildFromDB = await GuildModel.findOne({ guildName })
            let GuildInDB;
            if (getGuildFromDB) {
                GuildInDB = getGuildFromDB
            } else {
                const newGuild = await GuildModel.create({
                    guildName,
                    products: [],
                    jobCategory
                })
                GuildInDB = newGuild
            }
            business = await BusinessModel.create({
                businessName: businessName,
                businessBrand: "کسب و کار جدید",
                isAvatar: false,
                isHeader: false,
                bio: "",
                explain: "",
                phone: "",
                email: "",
                personalPage: "",
                instagram: "",
                mapDetail: "",
                agentCode: user.code,
                workers: [user._id],
                guild: GuildInDB._id,
                deliveredProducts: [],
                monthlyCommitment: []
            })
            business = business

            await UserModel.findByIdAndUpdate(user._id, { $push: { businesses: business._id } })

            if (user.primeJob !== '66164cc526e2d5fe01b561dc') {
                return Response.json({ message: "business created successfully" }, { status: 201 })
            }
            await UserModel.findByIdAndUpdate(user._id, { primeJob: business._id })

            return Response.json({ message: "business created successfully" }, { status: 201 })
        } else {
            return Response.json({ message: "business already exist" }, { status: 409 })

        }

    } catch (err) {
        console.error("errror", err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}