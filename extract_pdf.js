const fs = require('fs');
const pdfLib = require('pdf-parse');

console.log('Type of pdfLib:', typeof pdfLib);
console.log('Keys of pdfLib:', Object.keys(pdfLib));

const files = [
    'Goals_Accomplishments.pdf',
    'Goals_Accomplishments (1).pdf',
    'Goals_Accomplishments (2).pdf'
];

async function readPDFs() {
    for (const file of files) {
        if (fs.existsSync(file)) {
            console.log(`\n--- Reading ${file} ---`);
            try {
                const dataBuffer = fs.readFileSync(file);
                // Try calling it directly or finding the default export
                let data;
                if (typeof pdfLib === 'function') {
                    data = await pdfLib(dataBuffer);
                } else if (typeof pdfLib.default === 'function') {
                    data = await pdfLib.default(dataBuffer);
                } else {
                    throw new Error('Could not find pdf function in export');
                }

                console.log('--- TEXT CONTENT START ---');
                console.log(data.text);
                console.log('--- TEXT CONTENT END ---');
            } catch (error) {
                console.error(`Error reading ${file}:`, error.message);
            }
        }
    }
}

readPDFs();
