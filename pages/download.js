import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Download() {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const storedPDF = sessionStorage.getItem('mergedPDF');
    if (storedPDF) {
      setPdfData(storedPDF);
    }
  }, []);

  const downloadPDF = () => {
    if (pdfData) {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + pdfData;
      link.download = 'merged_document.pdf';
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>Download - PDF-Merger</title>
      </Head>
      
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-brand">PDF-Merger</Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="success-message">
          <h2>PDF Merged Successfully!</h2>
          <p>Your merged PDF is ready for download.</p>
          {pdfData ? (
            <button onClick={downloadPDF} className="download-link">
              Download Merged PDF
            </button>
          ) : (
            <p>No PDF data found. Please go back and merge your files again.</p>
          )}
        </div>
        <Link href="/">← Start New Merge</Link>
      </div>
    </>
  );
}