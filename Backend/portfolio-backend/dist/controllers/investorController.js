import { fetchInvestorData, loginUser, logoutUser, calculateNAV } from "../models/investorModel.js";
import { signJWT } from "../utility/authManager.js";
export const login = (request, response) => {
    const { email, password } = request.body;
    console.log(`Passed email : ${email} ${password}`);
    const user = loginUser(email, password);
    console.log(`User data ${JSON.stringify(user)}`);
    const token = signJWT({
        email: user.email,
        role: user.role
    });
    return response.json({
        token: token
    });
};
export const logout = (request, response) => {
    const { email, token } = request.body;
    const result = logoutUser(email, token);
    response.send(200);
};
export const getInvestor = async (request, response) => {
    const { mobile } = request.params;
    //add validation
    // await migrateAssets();
    const investorProfile = await fetchInvestorData(mobile.toString());
    console.log(`Date time : ${Date.now()}`);
    //console.log(`Investor Profile ${JSON.stringify(investorProfile)}`);
    if (investorProfile != undefined) {
        return response.json({
            "data": investorProfile
        });
    }
    else {
        return response.status(404).json({
            error: "Investor not found",
        });
    }
};
export const checkInvestorExists = (request, response) => { };
export const investorHoldings = (request, response) => { };
export const calculateNav = (request, response) => {
    const { mobile } = request.params;
    const nav = calculateNAV(mobile.toString());
    return response.send(200).json({
        'nav': nav
    });
};
