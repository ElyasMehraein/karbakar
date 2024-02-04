import { serialize } from "cookie";
const handler=()=>{
    if (req.method !== "GET") {
        res.status(422).json({ message: 'request method must be "GET"' })
    }
    return res.status(200).setHeader('Set-Cookie', serialize('token', "",{
     path:"/",
     maxAge: 60*60*24*7
    })).status(422).json({ message: 'user loggd oft successfullt'})

}
export default handler