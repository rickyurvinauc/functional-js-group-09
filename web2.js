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

  const parseParagraph = (line) => {
    return `<p>${line}</p>`;
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