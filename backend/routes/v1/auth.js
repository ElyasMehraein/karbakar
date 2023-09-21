import { Express } from "express";
import controller from "../../controllers/v1/authCont"
import { Router } from "express";

Router.post("/register",controller.register)
Router.post("/login",controller.login)
Router.get("/me",controller.getMe)

module.exports = Router
