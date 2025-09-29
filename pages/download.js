import Head from 'next/head';
import Link from 'next/link';

export default function Download() {
  return (
    <>
      <Head>
        <title>PDF Merger - Download</title>
      </Head>
      
      <div className="container">
        <div className="success-message">
          <h2>PDF Merged Successfully!</h2>
          <p>Your merged PDF is ready for download.</p>
          <a href="/api/download-file" className="download-link">Download Merged PDF</a>
        </div>
        <Link href="/">← Merge Another PDF</Link>
      </div>
    </>
  );
}