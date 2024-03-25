const fs = require('fs');

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

  const parseList = (line) => {
    if (line.match(/^\s*\d+\.\s/)) {
      return `<ol><li>${line.replace(/^\s*\d+\.\s/, '')}</li></ol>`;
    } else if (line.match(/^\s*-\s/) || line.match(/^\s*\*\s/)) {
      return `<ul><li>${line.replace(/^\s*-\s/, '').replace(/^\s*\*\s/, '')}</li></ul>`;
    }
    return line;
  };
  
  const parseParagraph = (line) => {
    return parseList(line) || `<p>${line}</p>`;
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


  const parseCode = (line) => {
    if (line.match(/^\s*```/)) {
        inCodeBlock = !inCodeBlock; 
        return ''; 
    } else {
        return inCodeBlock ? `<pre><code>${line}</code></pre>` : line;
    }
  };

  let inCodeBlock = false; 


  const elementParsers = [
    parseHeader,
    parseParagraph,
    parseBold, 
    parseItalic,
    parseLink,
    parseQuote,
    parseImage,
    parseCode,
    parseList
  ];

  const parseLine = (line) => {
    return elementParsers.reduce((acc, parser) => {
      return parser(acc);
    }, line);
  };

  const htmlLines = lines.map(parseLine);
  return htmlLines.join('\n');
};

fs.readFile('test.md', 'utf8', (err, markdownText) => {
    if (err) {
      console.error('Error al leer el archivo test.md:', err);
      return;
    }
  
    const htmlContent = markdownToHtml(markdownText);
  
    fs.writeFile('output.html', htmlContent, (err) => {
      if (err) {
        console.error('Error al escribir el archivo output.html:', err);
        return;
      }
      console.log('El archivo output.html ha sido creado exitosamente.');
    });
  });