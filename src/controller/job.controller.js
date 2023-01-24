const jobModel = require("../model/job.model");

const getJob = async () => {
    try {
        let job = await jobModel.find();
        return {
            data: job,
            flag: true,
            message: "All Jobs Profile",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error Occurs",
            desc: e.message,
        };
    }
};

const postJob = async ({ companyName, position, contract, location }) => {
    try {
        let job = new jobModel({
            companyName,
            position,
            contract,
            location,
        });
        await job.save();
        return {
            data: job,
            flag: true,
            message: "job Created Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const deleteJob = async ({ id }) => {
    try {
        await jobModel.findByIdAndDelete({ _id: id });
        let job = await jobModel.find();
        return {
            data: job,
            flag: true,
            message: "job delete Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const patchJob = async ({ id, companyName, position, contract, location }) => {

    try {
        await jobModel.findByIdAndUpdate(
            { _id: id },
            {
                companyName,
                position,
                contract,
                location,
            }
        );
        let job = await jobModel.find();
        return {
            data: job,
            flag: true,
            message: "job update Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

module.exports = { getJob, postJob, deleteJob, patchJob };
