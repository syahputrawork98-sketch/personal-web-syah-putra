const fs = require('fs');

const path = 'C:\\Users\\Artdarkman\\.gemini\\antigravity-ide\\brain\\d5008adf-cee7-4fc0-9c0c-25addd9f2a72\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(path)) {
  console.log('Transcript file does not exist');
  process.exit(1);
}

const lines = fs.readFileSync(path, 'utf8').split('\n');
console.log(`Read ${lines.length} lines from log`);

const allMatches = [];
lines.forEach((line, index) => {
  if (!line.trim()) return;
  // Search for typical certificate keywords, filenames or GDrive IDs in logs
  const matches = line.match(/[a-zA-Z0-9_-]{10,}\.(pdf|png|jpg|jpeg)/gi) || [];
  const textMatches = line.match(/(Sertifikat|Ijazah|Kompetensi|Dokumen|BBPVP|BNSP|ITENAS)[^"<>]*?/gi) || [];
  
  if (matches.length > 0 || textMatches.length > 0) {
    allMatches.push({
      lineNum: index + 1,
      files: matches,
      texts: textMatches.slice(0, 5)
    });
  }
});

console.log(JSON.stringify(allMatches.slice(-20), null, 2));
