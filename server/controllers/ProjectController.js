/* 
This controller handles the CRUD operations of projects published by clients 
*/


// Add project
async function addProject(req, res) {
    try {
        const projectData = req.body;
        const newProject = await ProjectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get projects list of a certain client

// Update project status

// Remove project