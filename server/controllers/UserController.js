const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

async function syncUser(req, res) {
    const {id, name, role} = req.body;

    try {
        const {data: existingUser, error} = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (!existingUser) {
            const {data: newUser, error} = await supabase
                .from('users')
                .insert({id, name, role});
            
            if (error) {
                throw new Error(error.message);
            }

            if (role === 'Client') {
                const {error: clientError} = await supabase
                    .from('clients')
                    .insert({id: id});
                
                if (clientError) throw clientError;
            } else if (role === 'Freelancer') {
                const {error: freelancerError} = await supabase
                    .from('freelancers')
                    .insert({id: id});
                
                if (freelancerError) throw freelancerError;
            };

            return res.status(201).json({message: "User synced successfully", user: newUser});
        } else {
            return res.status(200).json({message: "User already exists", user: existingUser});
        }
    } catch (error) {
        console.error('Error syncing user:', error);
        return res.status(500).json({message: error.message});
    }
}

async function getUser(req, res) {
    const {id} = req.body;

    try {
        const {data: user, error} = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error || !user) return res.status(404).json('User not found');

        let roleData = null;

        if (user.role === 'Client') {
            const {data: clientData} = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', id)
                .single();
            roleData = clientData;
        } else if (user.role === 'Freelancer') {
            const {data: freelancerData} = await supabase
                .from('freelancers')
                .select('*')
                .eq('user_id', id)
                .single();
            roleData = freelancerData;
        }

        res.json({ ...user, roleData });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { 
    syncUser,
    getUser 
};