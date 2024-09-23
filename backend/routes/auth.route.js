import express from "express";
import { signup } from "../controllers/auth.controller";

const router = express.Router();

app.get("/api/v1/signup", (req, res) => {
    res.send("Signup route");
});

app.get("/api/v1/login", (req, res) => {
    res.send("Login route");
});

app.get("/api/v1/logout",(req, res) => {  // Changed this route to 'logout'
    res.send("Logout route");
});
