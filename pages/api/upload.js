import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Use /tmp directory for Vercel
  const uploadDir = '/tmp/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filter: ({ mimetype }) => mimetype === 'application/pdf'
  });

  try {
    const [fields, files] = await form.parse(req);
    const fileArray = Array.isArray(files.pdf_files) ? files.pdf_files : [files.pdf_files].filter(Boolean);
    
    const filePaths = fileArray.map(file => file.filepath);
    
    // Store file paths in response for client to handle
    return res.status(200).json({ 
      status: 'success', 
      files: fileArray.length,
      filePaths: filePaths
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}