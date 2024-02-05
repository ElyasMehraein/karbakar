import { serialize } from "cookie";
const handler=(req, res)=>{
    if (req.method !== "GET") {
        res.status(422).json({ message: 'request method must be "GET"' })
    }
    return res.setHeader('Set-Cookie', serialize('token', "",{
     path:"/",
     maxAge: 0
    })).status(200).json({ message: 'user logged successfullt'})

}
export default handler