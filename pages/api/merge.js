import { PDFDocument } from 'pdf-lib';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
    responseLimit: '25mb',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files' });
    }
    
    // Set timeout for large files
    const timeout = setTimeout(() => {
      res.status(408).json({ error: 'Processing timeout' });
    }, 120000); // 2 minutes
    
    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];
      const base64Data = fileData.split(',')[1];
      const pdfBytes = Buffer.from(base64Data, 'base64');
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const result = await mergedPdf.save();
    clearTimeout(timeout);
    
    res.status(200).json({ 
      status: 'success',
      pdfData: Buffer.from(result).toString('base64')
    });
  } catch (error) {
    res.status(500).json({ error: 'Merge failed' });
  }
}