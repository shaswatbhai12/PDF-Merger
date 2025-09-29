from flask import Flask, render_template, request, redirect, url_for, send_file, session, jsonify
import os
from PyPDF2 import PdfMerger

app = Flask(__name__)
app.secret_key = 'your-secret-key'
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    # Clear any existing session data to start fresh
    session.pop('uploaded_files', None)
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    uploaded_files = request.files.getlist('pdf_files')
    file_paths = []
    
    for file in uploaded_files:
        if file and file.filename.endswith('.pdf'):
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)
            file_paths.append(file_path)
    
    session['uploaded_files'] = file_paths
    
    if request.headers.get('Content-Type', '').startswith('multipart/form-data'):
        return jsonify({'status': 'success', 'files': len(file_paths)})
    return redirect(url_for('index'))

@app.route('/merge', methods=['POST'])
def merge_pdfs():
    file_paths = session.get('uploaded_files', [])
    
    if not file_paths:
        return redirect(url_for('index'))
    
    merger = PdfMerger()
    
    for file_path in file_paths:
        if os.path.exists(file_path):
            merger.append(file_path)
    
    output_path = 'merged_output.pdf'
    merger.write(output_path)
    merger.close()
    
    # Clean up uploaded files
    for file_path in file_paths:
        if os.path.exists(file_path):
            os.remove(file_path)
    
    session.pop('uploaded_files', None)
    return redirect(url_for('download'))

@app.route('/reorder', methods=['POST'])
def reorder_files():
    new_order = request.json.get('order', [])
    current_files = session.get('uploaded_files', [])
    
    # Reorder files based on new indices
    reordered_files = [current_files[i] for i in new_order if i < len(current_files)]
    session['uploaded_files'] = reordered_files
    
    return jsonify({'status': 'success'})

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/download')
def download():
    return render_template('download.html')

@app.route('/download-file')
def download_file():
    file_path = 'merged_output.pdf'
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True, download_name='merged_document.pdf')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)