const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 5000;

require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// API to Handle File Upload and Store Data in Supabase
app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(fileBuffer);
        const extractedText = data.text;

        console.log("Extracted Text:", extractedText);  // Debugging

        // Insert into Supabase Database
        const { data: project, error } = await supabase
            .from('projects')
            .insert([
                {
                    title: req.file.originalname, // Using PDF filename as project title
                    description: extractedText, // Extracted text goes here
                    budget: 1000,  // Default budget (adjust as needed)
                    client_id: "550e8400-e29b-41d4-a716-446655440000",  // Replace with actual client ID
                }
            ]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return res.status(500).json({ error: "Failed to save project to database" });
        }

        res.json({
            message: "File uploaded and project saved to database",
            filename: req.file.filename,
            extractedText
        });

    } catch (error) {
        console.error("PDF Processing Error:", error);
        res.status(500).json({ error: "Error processing the PDF" });
    }
});
'commennt'
// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
