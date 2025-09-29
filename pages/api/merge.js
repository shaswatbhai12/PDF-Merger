import { PDFDocument } from 'pdf-lib';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filePaths } = req.body;
    
    if (!filePaths || !filePaths.length) {
      return res.status(400).json({ error: 'No files to merge' });
    }
    
    const mergedPdf = await PDFDocument.create();

    // Process files directly from request
    for (const fileData of filePaths) {
      try {
        const pdfBytes = Buffer.from(fileData, 'base64');
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      } catch (error) {
        console.error('Error processing PDF:', error);
      }
    }

    const pdfBytes = await mergedPdf.save();
    
    // Return PDF as base64 for download
    return res.status(200).json({ 
      status: 'success',
      pdfData: Buffer.from(pdfBytes).toString('base64')
    });
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Merge failed' });
  }
}