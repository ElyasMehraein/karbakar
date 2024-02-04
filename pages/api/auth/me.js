import { verifyToken } from "@/controllers/auth";

async function handler(req, res) {
    if (req.method !== "GET") {
        return false
    }
    try {

        connectToDB()
        const { token } = req.cookies;
        const tokenPayLoad = verifyToken(token)
        if (!token || !tokenPayLoad) {
            return res.status(401).json({ message: "you are not logged in" })
        }
        const user = await UserModel.findOne(
            { _id: tokenPayLoad.id },
            "phoneHash"
        )
        return res.status(200).json({ data: user })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }

}
export default handler


console.log(user);

