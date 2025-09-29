import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.files = [];
    }
  }, []);

  return (
    <>
      <Head>
        <title>PDF Merger</title>
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
        <h1>PDF Merger</h1>
        
        <div className="upload-area" id="uploadArea">
          <div className="upload-content">
            <div className="upload-icon">📄</div>
            <p>Drag & drop PDF files here</p>
            <p className="upload-text">or <span className="browse-link">browse files</span></p>
          </div>
          <input type="file" id="fileInput" multiple accept=".pdf" hidden />
        </div>

        <div className="file-list" id="fileList"></div>
        
        <div className="upload-loader" id="uploadLoader" style={{display: 'none'}}>
          <div className="loader-spinner"></div>
          <p>Processing files...</p>
        </div>

        <button id="mergeBtn" style={{display: 'none'}}>Merge PDFs</button>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const uploadLoader = document.getElementById('uploadLoader');
const mergeBtn = document.getElementById('mergeBtn');
let files = [];

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Add click event to browse link
document.addEventListener('DOMContentLoaded', () => {
    const browseLink = document.querySelector('.browse-link');
    if (browseLink) {
        browseLink.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });
    }
});

function handleFiles(newFiles) {
    const pdfFiles = Array.from(newFiles).filter(f => f.type === 'application/pdf');
    files = [...files, ...pdfFiles];
    
    displayFiles();
    
    if (files.length > 0) {
        uploadLoader.style.display = 'block';
        setTimeout(() => {
            uploadLoader.style.display = 'none';
            mergeBtn.style.display = 'block';
        }, 500);
    }
}

function displayFiles() {
    fileList.innerHTML = files.map((f, i) => 
        \`<div class="file-item" draggable="true" data-index="\${i}">
            <span class="drag-handle">☰</span>
            <span class="file-name">\${f.name}</span>
            <span class="remove-btn" onclick="removeFile(\${i})">×</span>
        </div>\`
    ).join('');
    
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (this !== draggedElement) {
        const draggedIndex = parseInt(draggedElement.dataset.index);
        const targetIndex = parseInt(this.dataset.index);
        
        const draggedFile = files[draggedIndex];
        files.splice(draggedIndex, 1);
        files.splice(targetIndex, 0, draggedFile);
        
        displayFiles();
    }
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedElement = null;
}
mergeBtn.addEventListener('click', async () => {
    if (files.length === 0) return;
    
    mergeBtn.textContent = 'Merging...';
    mergeBtn.disabled = true;
    
    try {
        // Check file sizes first
        const totalSize = files.reduce((sum, file) => sum + file.size, 0);
        if (totalSize > 20000000) { // 20MB limit
            alert('Files are too large (over 20MB total). Please use smaller PDFs or try one at a time.');
            return;
        }
        
        if (totalSize > 10000000) { // 10MB warning
            if (!confirm('Large files detected. This may take 2-3 minutes. Continue?')) {
                return;
            }
        }
        
        const filePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });
        
        const base64Files = await Promise.all(filePromises);
        
        console.log('Sending', base64Files.length, 'files to merge');
        
        const response = await fetch('/api/merge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ files: base64Files })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error('Server error: ' + response.status);
        }
        
        const result = await response.json();
        console.log('Merge result:', result);
        
        if (result.status === 'success') {
            sessionStorage.setItem('mergedPDF', result.pdfData);
            window.location.href = '/download';
            console.log('Redirecting to download page');
        } else {
            throw new Error(result.error || 'Merge failed');
        }
    } catch (error) {
        console.error('Merge failed:', error);
        alert('Merge failed: ' + error.message);
    }
    
    mergeBtn.textContent = 'Merge PDFs';
    mergeBtn.disabled = false;
});

function removeFile(index) {
    files.splice(index, 1);
    displayFiles();
    
    if (files.length === 0) {
        mergeBtn.style.display = 'none';
    }
}
        `
      }} />
    </>
  );
}