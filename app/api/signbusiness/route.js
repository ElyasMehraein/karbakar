import BusinessModel from "@/models/Business"
import connectToDb from "@/configs/db"



export async function POST(req) {

    try {
        connectToDb()
        const body = await req.json()
        const { businessName } = body;

        //Validate Entrance 
        //uncomment after development
        // if (!phone.trim() || !SMSCode.trim()) {
        //     return Response.json({ message: "Entrance data is empty!" },{status:402})
        // }
        // console.log("Entrance data is not empty");


        //uncomment after development

        // if (!phoneFormatCheck(phone) || !SMSFormatCheck(SMSCode)) {
        //     return Response.json({ message: "Entrance data is not valid!" },{status:402})
        // }
        // console.log("phone number and smmcode format validate successfully");


        // const isOtpSMSValid = await SMSOtpvalidator(phone, SMSCode)
        // if (!isOtpSMSValid) {
        //     console.log(res.status);
        //     return Response.json({ message: "SMS Code is not valid" },{status:406})
        // }


        let business = await BusinessModel.findOne({ businessName })
        if (!business) {
            
            business = await BusinessModel.create({
                businessName: businessName,
                avatar: "",
                header: "",
                bio: "",
                explain: "",
                phone: "",
                email: "",
                personalPage: "",
                instagram: "",
                latitude: "",
                longitude: "",
                agentCode: "",
                workers: []

            })
            console.log("business created successfully", business);
            business = business
            return Response.json({ message: "business created successfully" }, { status: 201 })
        }

    } catch (err) {
        console.log("toye signbusiness api hastam", err);
        return Response.json({ message: "server error" }, { status: 500 })
    }
}