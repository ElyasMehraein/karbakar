import express from "express"
import authCont from "../../controllers/v1/authCont.js"


const authRouter = express.Router()

authRouter.post("/enteringPhone",authCont.phoneCheck)
authRouter.post("/enteringCode", authCont.SMSCodeCheck)
authRouter.get("/me", authCont.getMe)

export default authRouter
