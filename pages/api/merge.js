import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePaths = global.uploadedFiles || [];
    
    if (!filePaths.length) {
      return res.redirect('/');
    }
    
    const mergedPdf = await PDFDocument.create();

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        const pdfBytes = fs.readFileSync(filePath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
    }

    const pdfBytes = await mergedPdf.save();
    const outputPath = path.join(process.cwd(), 'merged_output.pdf');
    fs.writeFileSync(outputPath, pdfBytes);

    // Clean up uploaded files
    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Clear session
    global.uploadedFiles = [];

    return res.redirect('/download');
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Merge failed' });
  }
}