const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../services/DBService');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

const registerUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const {user, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) return res.status(500).json({ error: error.message });
        res.sendStatus(201).json(user);
    } catch (error) {
        res.status(500).json({error: error});
    }
    
};

const getUsers = async (req, res) => {
    try {
        console.log(supabase);
        const { data: {user}, error } = await supabase.auth.getUser();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { registerUser, getUsers };
