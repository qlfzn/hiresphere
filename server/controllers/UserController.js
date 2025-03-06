const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require()

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

const registerUser = async (req, res) => {
    const {email, password} = req.body;
    const {data, error} = await supa
}