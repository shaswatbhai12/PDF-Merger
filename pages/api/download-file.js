import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'merged_output.pdf');

    if (!fs.existsSync(filePath)) {
        return res.redirect('/');
    }

    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="merged_document.pdf"');
    res.send(fileBuffer);
}