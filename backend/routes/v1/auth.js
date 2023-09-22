import express from "express"
import authCont from "../../controllers/v1/authCont.js"

const authRouter = express.Router()

authRouter.post("/sign",authCont.sign)
authRouter.post("/login", authCont.login)
authRouter.get("/me", authCont.getMe)

export default authRouter
