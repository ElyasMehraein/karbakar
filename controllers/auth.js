import { verify } from "jsonwebtoken";

export function verifyToken(token) {
    try {

        const validationResult = verify(token, process.env.JWT_SECRET)
        console.log(JWT_SECRET);
        return validationResult
    } catch (err) {
        console.log("verifyToken error=> ", err);
        return false
    }
}
