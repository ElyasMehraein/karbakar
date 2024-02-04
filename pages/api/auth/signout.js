import { serialize } from "cookie";
const handler = () => {
    if (req.method !== "GET") {
        res.status(422).json({ message: 'request method must be "GET"' })
    }
    return res.setHeader('Set-Cookie', serialize('token', "", {
        path: "/",
        maxAge: 0
    })).status(200).json({ message: 'user logout successfully' })

}
export default handler