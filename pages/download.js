import Head from 'next/head';
import Link from 'next/link';

export default function Download() {
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
          <a href="/api/download-file" className="download-link">Download Merged PDF</a>
        </div>
        <Link href="/">← Start New Merge</Link>
      </div>
    </>
  );
}