import User from '../models/User.js'

export const protect = async (req, res, next) => {

    const { userId } = req.auth();
    console.log("userId auth", userId)
    if (!userId) {
        res.json({ success: false, message: "Not Authorized" });
    } else {
        const user = await User.findById(userId);
        // const user = await User.findById(userId.toString());
        // console.log("auth user", user)
        console.log("FindOne Result:", user);
        req.user = user;
        next();
    }
}


