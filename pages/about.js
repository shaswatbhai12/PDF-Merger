import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About - PDF-Merger</title>
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

      <div className="about-page">
        <div className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">About PDF-Merger</h1>
            <p className="hero-subtitle">The ultimate tool for combining PDF files with ease</p>
          </div>
        </div>

        <div className="about-container">
          <div className="about-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Lightning Fast</h3>
              <p>Merge multiple PDFs in seconds with our optimized processing engine</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Drag & Drop</h3>
              <p>Simply drag your PDF files into the upload area for instant processing</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Reorder Files</h3>
              <p>Drag and drop to arrange your PDFs in the perfect order before merging</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Ready</h3>
              <p>Works seamlessly on desktop, tablet, and mobile devices</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Your files are processed locally and automatically deleted after merging</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Modern UI</h3>
              <p>Clean, intuitive interface with smooth animations and dark theme</p>
            </div>
          </div>

          <div className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Upload Files</h4>
                  <p>Drag PDF files onto the upload area or click to browse and select multiple files</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Arrange Order</h4>
                  <p>Drag files in the list to reorder them exactly how you want them merged</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Merge & Download</h4>
                  <p>Click the merge button and download your combined PDF file instantly</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Ready to merge your PDFs?</h2>
            <p>Start combining your PDF files in seconds</p>
            <Link href="/" className="cta-button">Start Merging</Link>
          </div>
        </div>
      </div>
    </>
  );
}