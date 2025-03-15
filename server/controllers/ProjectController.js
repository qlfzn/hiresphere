const supabase = require("../config/supabaseClient");

async function createProject (req, res, next) {
    try {
      const { projectSubmit, user_id } = req.body;

      const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id) // TEMPORARY: Still getting from query
      .single();

      if (userError) {
          return res.status(404).json({
              success: false,
              message: 'User not found'
          });
      }
      
      // Get client_id from the clients table based on the user_id
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('id', userData.id)
        .single();
      
      if (clientError) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found',
          error: clientError.message
        });
      }
      
      // Add client_id to the project data
      const projectData = {
        ...projectSubmit,
        client_id: clientData.id,
        created_at: new Date()
      };

      
      // Insert the project into the database
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();
        
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Failed to create project',
          error: error.message
        });
      }
      
      return res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data
      });
    } catch (error) {
      next(error);
    }
};
  
async function getProjects(req, res, next) {
    try {
        const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', req.query.user_id) // TEMPORARY: Still getting from query
        .single();

        if (userError) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Get client_id from the clients table
        const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('id', userData.id)
        .single();
        
        if (clientError) {
        return res.status(404).json({
            success: false,
            message: 'Client profile not found',
            error: clientError.message
        });
        }
        
        // Filter for active/inactive projects if specified
        let query = supabase
        .from('projects')
        .select(`
            id,
            title,
            description,
            working_mode,
            location,
            is_active,
            due_date,
            clients (company)

        `)
        .eq('client_id', clientData.id);
        
        if (req.query.is_active !== undefined) {
            query = query.eq('is_active', req.query.is_active === 'true');
        }
        
        // Add sorting
        query = query.order('created_at', { ascending: false });
        
        const { data, error } = await query;

        
        if (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to retrieve projects',
            error: error.message
        });
        }
        
        return res.status(200).json({
        success: true,
        count: data.length,
        data
        });
    } catch (error) {
        next(error);
    }
};
  
async function getProjectById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.query.id;
      
      // Get client_id from the clients table
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('id', userId)
        .single();
      
      if (clientError) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found',
          error: clientError.message
        });
      }
      
      // Get the project
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('client_id', clientData.id)
        .single();
      
      if (error) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
          error: error.message
        });
      }
      
      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
};
  
  // Update a project
async function updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const userId = req.user.id;
      
      // Get client_id from the clients table
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (clientError) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found',
          error: clientError.message
        });
      }
      
      // Update the project
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date()
        })
        .eq('id', id)
        .eq('client_id', clientData.id)
        .select()
        .single();
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update project',
          error: error.message
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data
      });
    } catch (error) {
      next(error);
    }
};
  
async function deleteProject(req, res, next) {
      try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Get client_id from the clients table
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (clientError) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found',
          error: clientError.message
        });
      }
      
      // Delete the project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('client_id', clientData.id);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Failed to delete project',
          error: error.message
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  // Find matches for a project using external AI service
  async function findMatches(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Get client_id from the clients table
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (clientError) {
        return res.status(404).json({
          success: false,
          message: 'Client profile not found',
          error: clientError.message
        });
      }
      
      // Get the project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('client_id', clientData.id)
        .single();
      
      if (projectError) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
          error: projectError.message
        });
      }
      
      // Call the external AI matching service
      // Replace with your actual AI service endpoint
      const aiServiceUrl = process.env.AI_MATCHING_SERVICE_URL;
      
      try {
        const aiResponse = await axios.post(aiServiceUrl, {
          projectId: id,
          projectDetails: project
        });
        
        // Store the matches in the database
        const matches = aiResponse.data.matches.map(match => ({
          project_id: id,
          freelancer_id: match.freelancerId,
          match_score: match.score,
          matched_at: new Date()
        }));
        
        // Insert matches into database
        const { error: matchError } = await supabase
          .from('project_matches')
          .insert(matches);
        
        if (matchError) {
          return res.status(400).json({
            success: false,
            message: 'Failed to save matches',
            error: matchError.message
          });
        }
        
        return res.status(200).json({
          success: true,
          message: 'Matches found successfully',
          data: aiResponse.data
        });
      } catch (aiError) {
        return res.status(500).json({
          success: false,
          message: 'AI matching service error',
          error: aiError.message
        });
      }
    } catch (error) {
      next(error);
    }
}

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    findMatches
};