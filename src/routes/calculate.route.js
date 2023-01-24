const express = require("express");
const calculateRoute = express.Router();

calculateRoute.post("/", async (req, res) => {
    const { amount, year, rate } = req.body;
    const P = +amount
    console.log('P:', P)
    const i = +rate / 100;
    console.log('i:', i)
    const n = +year;
    console.log('n:', n)
    let TotalMaturityValue = (P * ((((1 + i) ** n) - 1) / i)).toFixed(0)
    // console.log('TotalMaturityValue:', TotalMaturityValue.toFixed(0));


    let TotalInvestmentAmount = (P * n).toFixed(0);
    console.log('TotalInvestmentAmount:', TotalInvestmentAmount)

    let TotalInterestGained = (TotalMaturityValue - TotalInvestmentAmount).toFixed(0)
    console.log('TotalInterestGained:', TotalInterestGained)
    return res.status(200).send({ TotalMaturityValue, TotalInvestmentAmount, TotalInterestGained })
})

module.exports = calculateRoute;