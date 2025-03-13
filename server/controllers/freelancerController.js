const supabase = require('../config/supabaseClient');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

// Get freelancer profile
async function getFreelancerProfile(req, res) {
    const { id } = req.params;

    try {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (userError) throw userError;
        
        const { data: freelancer, error: freelancerError } = await supabase
            .from('freelancers')
            .select('*')
            .eq('id', id)
            .single();
        
        if (freelancerError && freelancerError.code !== 'PGRST116') {
            throw freelancerError;
        }
        
        const profile = {
            ...user,
            ...freelancer,
            profile_complete: Boolean(
                freelancer && 
                freelancer.first_name && 
                freelancer.last_name && 
                freelancer.title && 
                freelancer.bio && 
                freelancer.skills && 
                freelancer.skills.length > 0
            )
        };
        
        const { data: matches, error: matchesError } = await supabase
            .from('project_matches')
            .select('*, projects(*)')
            .eq('freelancer_id', id);
        
        if (!matchesError && matches) {
            profile.matches = matches;
        }
        
        return res.status(200).json(profile);
    } catch (error) {
        console.error('Error getting freelancer profile:', error);
        return res.status(500).json({ message: error.message });
    }
}

// Update freelancer profile
async function updateFreelancerProfile(req, res) {
    const { id } = req.params;
    const { 
        first_name, 
        last_name, 
        title, 
        bio, 
        hourly_rate, 
        skills, 
        experience_level,
        availability,
        location
    } = req.body;

    try {
        const { error: userError } = await supabase
            .from('users')
            .update(`name: ${first_name} ${last_name}`)
            .eq('id', id);
        
        if (userError) throw userError;
        
        const { data: existingFreelancer, error: checkError } = await supabase
            .from('freelancers')
            .select('id')
            .eq('id', id)
            .single();
        
        let freelancerError;
        
        if (!existingFreelancer) {
            const { error } = await supabase
                .from('freelancers')
                .insert({
                    id: id,
                    title,
                    bio,
                    hourly_rate,
                    skills,
                    experience_level,
                    availability,
                    location
                });
            
            freelancerError = error;
        } else {
            const { error } = await supabase
                .from('freelancers')
                .update({
                    title,
                    bio,
                    hourly_rate,
                    skills,
                    experience_level,
                    availability,
                    location
                })
                .eq('id', id);
            
            freelancerError = error;
        }
        
        if (freelancerError) throw freelancerError;
        
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating freelancer profile:', error);
        return res.status(500).json({ message: error.message });
    }
}

async function getResumeUrl(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('freelancers')
            .select('resume_url')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error getting resume URL:', error);
        return res.status(500).json({ message: error.message });
    }
}

async function uploadResume(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading resume:', err);
            return res.status(500).json({ message: err.message });
        }
        
        const { id } = req.params;
        const file = req.file;

        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required!' });
        }

        try {

            const { data, error } = await supabase.storage
                .from('freelancer-resume')
                .upload(`freelancer-${id}/${file.originalname}`, file.buffer, {
                    contentType: file.mimetype
                });
            
            if (error) throw error;
            
            // Update resume URL in freelancers table
            const { error: updateError } = await supabase
                .from('freelancers')
                .update({ resume_url: data.path })
                .eq('id', id);
            
            if (updateError) throw updateError;
            
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error uploading resume:', error);
            return res.status(500).json({ message: error.message });
        }
    });
}

module.exports = {
    getFreelancerProfile,
    updateFreelancerProfile,
    getResumeUrl,
    uploadResume
};