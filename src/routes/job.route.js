const express = require("express");
const jobRoute = express.Router();
const jwt = require("jsonwebtoken");
const { getJob, postJob, patchJob, deleteJob } = require("../controller/job.controller");

const authMiddleWare = async (req, res, next) => {
    // const { token } = req.body;
    const token = req.headers['authorization'];
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
            if (verification.role === "admin") {
                next();
            }
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
};



jobRoute.get("/", async (req, res) => {
    // res.send("Get Job")
    const { data, flag, message, desc } = await getJob();
    if (flag) {
        return res.status(201).send({ data, message, desc });
    } else {
        return res.status(401).send({ data, message, desc });
    }
});

jobRoute.post("/", authMiddleWare, async (req, res) => {
    const {
        companyName,
        position,
        contract,
        location,
    } = req.body;

    const { data, flag, message, desc } = await postJob({
        companyName,
        position,
        contract,
        location,
    });
    if (flag) {
        return res.status(201).send({ data, message, desc });
    } else {
        return res.status(401).send({ data, message, desc });
    }
});

jobRoute.delete("/:id", authMiddleWare, async (req, res) => {
    const id = req.params;
    const { data, flag, message, desc } = await deleteJob(id);
    if (flag) {
        return res.status(201).send({ data, message, desc });
    } else {
        return res.status(401).send({ data, message, desc });
    }
});

jobRoute.patch("/", authMiddleWare, async (req, res) => {
    const {
        id,
        companyName,
        position,
        contract,
        location,
    } = req.body;
    const { data, flag, message, desc } = await patchJob({
        id,
        companyName,
        position,
        contract,
        location,
    });
    if (flag) {
        return res.status(201).send({ data, message, desc });
    } else {
        return res.status(401).send({ data, message, desc });
    }
});

module.exports = jobRoute;