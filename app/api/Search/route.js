import dbConnect from "@/configs/db"
import User from "@/models/User"
export async function GET(req, res) {
    console.log(req.query)
    const limit = 10;
    await dbConnect();

    try {
        const { searchTerm } = req.body
        console.log("searchTerm", searchTerm);
        //     const users = await User.find()
        //         .sort({ _id: 1 })
        //         .limit(limit)
        //         .skip(skip);
        //     const total = await User.countDocuments();

        return Response.json({ message: 'sms sent' }, { status: 200 })
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
    }
}
