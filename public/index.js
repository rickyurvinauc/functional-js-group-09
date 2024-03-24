const markdownToHtml = (markdown) => {
    const lines = markdown.split('\n');

    const parseHeader = (line) => {
        const headerRegex = /^(#+)\s(.*)/;
        const match = line.match(headerRegex);
        if (match) {
            const level = match[1].length;
            const text = match[2];
            return `<h${level}>${text}</h${level}>`;
        }
        return line;
    };

    const parseParagraph = (line) => {
        const paragraphRegex = /^([a-zA-Z].*)/;
        ;
        const match = line.match(paragraphRegex);
        if (match) {
            return `<p>${line}</p>`;
        }
        return line;
    };

    const parseBold = (line) => {
        return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const parseItalic = (line) => {
        return line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    };

    const parseLink = (line) => {
        return line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    };

    const parseQuote = (line) => {
        return line.replace(/^\s*> (.*)/g, '<blockquote>$1</blockquote>');
    };

    const parseImage = (line) => {
        return line.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    }


//   const parseCode = (line) => {
//     if (line.match(/^```/)) {
//       return `<pre><code>${line.replace(/^```/, '').trim()}</code></pre>`;
//     }
//     return line;
//   };

//   const parseHorizontalRule = (line) => {
//     if (line.trim().match(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/)) {
//       return '<hr>';
//     }
//     return line;
//   };  

    const elementParsers = [
        parseHeader,
        parseParagraph,
        parseBold,
        parseItalic,
        parseLink,
        parseQuote,
        parseImage
    ];

    const parseLine = (line) => {
        return elementParsers.reduce((acc, parser) => {
            return parser(acc);
        }, line);
    };

    const htmlLines = lines.map(parseLine);
    return htmlLines.join('\n');
};

// Get the Transform button
const transformButton = document.querySelector('#transformButton');
const downloadButton = document.querySelector('#downloadFile');

// Get the file input
const fileUpload = document.querySelector('#fileUpload');

// Function to read the uploaded file and insert its content into the textarea
function uploadFile() {
    const file = fileUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (evt) {
            document.querySelector('.style-36').value = evt.target.result;
            // Call the transformMarkdownToHtml function after loading the file
            transformMarkdownToHtml();
        }
        reader.onerror = function (evt) {
            console.error('Error reading file');
        }
    }
}

// Function to transform the markdown content in the textarea to HTML
function transformMarkdownToHtml() {
    const markdownText = document.querySelector('.style-36').value;
    const htmlContent = markdownToHtml(markdownText);

    // Get the Preview div
    const previewDiv = document.querySelector('#home .style-54');

    // Insert the HTML content into the Preview div
    previewDiv.innerHTML = htmlContent;

    // Get the Raw-HTML div
    const rawHtmlDiv = document.querySelector('#about .style-56');

    // Insert the HTML content into the Raw-HTML div
    // Use the 'innerText' property to display the HTML tags as text
    rawHtmlDiv.innerText = htmlContent;
}

// Function to transform the markdown content in the textarea to HTML
function downloadMarkdownToHtml() {
    const markdownText = document.querySelector('.style-36').value;
    const htmlContent = markdownToHtml(markdownText);

    // Get the Preview div
    const previewDiv = document.querySelector('#home .style-54');

    // Insert the HTML content into the Preview div
    previewDiv.innerHTML = htmlContent;

    // Get the Raw-HTML div
    const rawHtmlDiv = document.querySelector('#about .style-56');

    // Insert the HTML content into the Raw-HTML div
    // Use the 'innerText' property to display the HTML tags as text
    rawHtmlDiv.innerText = htmlContent;

    // Create a new Blob with the HTML content
    const htmlBlob = new Blob([`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Generated HTML</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`], { type: 'text/html' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(htmlBlob);

    // Set the href attribute of the Download button to the URL
    downloadButton.href = url;

    // Set the download attribute of the Download button to specify the filename
    downloadButton.download = 'generated.html';
}
// Add the click event handler to the Transform button
transformButton.addEventListener('click', transformMarkdownToHtml);
downloadButton.addEventListener('click', downloadMarkdownToHtml);

// Add the change event handler to the file input
fileUpload.addEventListener('change', uploadFile);
