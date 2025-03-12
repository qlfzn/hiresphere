const supabase = require('../config/supabaseClient');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Get freelancer profile
async function getFreelancerProfile(req, res) {
    const { id } = req.params;

    try {
        // Get basic user info
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (userError) throw userError;
        
        // Get freelancer specific info
        const { data: freelancer, error: freelancerError } = await supabase
            .from('freelancers')
            .select('*')
            .eq('id', id)
            .single();
        
        if (freelancerError && freelancerError.code !== 'PGRST116') {
            throw freelancerError;
        }
        
        // Combine data
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
        
        // Get project matches if available
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
        // Update users table
        const { error: userError } = await supabase
            .from('users')
            .update(`name: ${first_name} ${last_name}`)
            .eq('id', id);
        
        if (userError) throw userError;
        
        // Check if freelancer record exists
        const { data: existingFreelancer, error: checkError } = await supabase
            .from('freelancers')
            .select('id')
            .eq('id', id)
            .single();
        
        let freelancerError;
        
        if (!existingFreelancer) {
            // Create freelancer record
            const { error } = await supabase
                .from('freelancers')
                .insert({
                    id: id,
                    first_name,
                    last_name,
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
            // Update freelancer record
            const { error } = await supabase
                .from('freelancers')
                // .update({
                //     first_name,
                //     last_name,
                //     title,
                //     bio,
                //     hourly_rate,
                //     skills,
                //     experience_level,
                //     availability,
                //     location
                // })
                .update({
                    bio: bio,
                    skills: skills
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

module.exports = {
    getFreelancerProfile,
    updateFreelancerProfile
};