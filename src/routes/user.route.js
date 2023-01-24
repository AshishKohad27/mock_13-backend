const express = require("express");
const userRoute = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

userRoute.get("/", async (req, res) => {
    const user = await userModel.find();
    return res.status(200).send({ message: "Users", desc: "", data: user });
});
userRoute.post("/getprofile", async (req, res) => {
    const { token } = req.body;
    console.log("token:", token);
    try {
        if (!token) {
            return res.status(401).send({
                data: [],
                message: "Unauthorized Person",
                flag: false,
                desc: "",
            });
        } else if (token) {
            const verification = jwt.decode(token, "SECRET_user");
            console.log("verification:", verification);
            return res
                .status(200)
                .send({ message: "usered Users", desc: "", user: verification });
        }
    } catch (error) {
        console.log("error:", error);
        return res.status(403).send({
            data: [],
            message: "Error Occur",
            flag: false,
            desc: error.message,
        });
    }
});

userRoute.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const userCheck = await userModel.find({ email });
    // console.log('userCheck:', userCheck)
    const hash = await argon2.hash(password);
    // console.log('hash:', hash);
    try {
        if (userCheck.length !== 0) {
            return res
                .status(201)
                .send({
                    message: "User with this email id already have an account",
                    desc: "",
                    user: userCheck,
                });
        }
        if (email.includes("@masaischool.com")) {
            let user = new userModel({ name, email, password: hash, role: "admin" });
            await user.save();
            return res
                .status(200)
                .send({ message: "Admin Signup SuccessFully", desc: "", user });
        } else {
            let user = new userModel({ name, email, password: hash });
            await user.save();
            return res
                .status(200)
                .send({ message: "User Signup SuccessFully", desc: "", user });
        }
    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message, user: [] });
    }
});

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userFind = await userModel.findOne({ email });
    // console.log('userFind:', userFind);
    try {
        if (userFind && (await argon2.verify(userFind.password, password))) {
            let token = jwt.sign(
                {
                    id: userFind._id,
                    name: userFind.name,
                    email: userFind.email,
                    role: userFind.role,
                },
                "SECRET_user",
                { expiresIn: "4 days" }
            );
            return res
                .status(200)
                .send({
                    message: "Login SuccessFully",
                    desc: "",
                    token,
                });
        } else {
            return res
                .status(404)
                .send({ message: "Wrong Credential", desc: "", user: [] });
        }
    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message, user: [] });
    }
});

userRoute.post("/verify", async (req, res) => {
    const { token } = req.body;
    if (token === undefined) {
        console.log('token from verify:', token);
        return res.send("Unauthorized");
    }
    try {
        const verification = jwt.verify(token, "SECRET_user");
        console.log('verification:', verification)
        if (verification) {
            return res.status(200).send(verification);
        }
    } catch (e) {
        console.log('e:', e.message);
        return res.status(403).send({ message: "Invalid Token", desc: e.message, user: [] });
    }
});

module.exports = userRoute;
