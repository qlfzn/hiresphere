import supabase from "./DBService";

async function createProject(projectData) {
    const {data, error} = supabase
        .from('projects')
        .insert(projectData);
    
    if (error) {
        throw new Error(error.message);
    }

    return data; 
};

export { createProject };
