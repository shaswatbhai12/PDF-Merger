# PDF Merger

A sleek web application for merging multiple PDF files into a single document. Built with Flask and featuring a modern dark interface.

## Features

- **Drag & Drop Interface** - Simply drag PDF files into the upload area
- **File Reordering** - Drag files to reorder them before merging
- **Real-time Preview** - See your file list update instantly
- **Modern UI** - Clean black and white design with smooth animations
- **Mobile Responsive** - Works perfectly on desktop and mobile devices
- **Fast Processing** - Quick PDF merging with PyPDF2

## Getting Started

### Prerequisites

- Python 3.7 or higher
- pip package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Running the Application

Start the Flask development server:

```bash
python app.py
```

Open your browser and go to `http://localhost:5000`

## How to Use

1. **Upload Files**: Drag PDF files onto the upload area or click to browse
2. **Reorder**: Drag files in the list to change their order
3. **Merge**: Click the "Merge PDFs" button to combine your files
4. **Download**: Your merged PDF will be ready for download

## Project Structure

```
pdf-merger/
├── app.py              # Main Flask application
├── templates/          # HTML templates
│   ├── base.html      # Base template
│   ├── index.html     # Main page
│   ├── download.html  # Download page
│   └── about.html     # About page
├── static/            # Static files
│   └── style.css      # Stylesheet
├── uploads/           # Temporary file storage
└── requirements.txt   # Python dependencies
```

## Technologies Used

- **Backend**: Flask (Python web framework)
- **PDF Processing**: PyPDF2 for merging PDF files
- **Frontend**: Vanilla JavaScript with modern CSS
- **Styling**: Custom CSS with Inter font family

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.