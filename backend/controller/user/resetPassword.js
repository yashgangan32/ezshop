const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function reset(req, res) {
    try {
        const { email, newPassword, confPassword } = req.body
        if (newPassword !== confPassword) {
            return res.status(400).json({ message: "Password Do Not Match" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        user.password = hashPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });



    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }

}
module.exports = reset