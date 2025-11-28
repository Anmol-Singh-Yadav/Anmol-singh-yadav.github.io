const fs = require('fs');
const pdf = require('pdf-extraction');

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
                const data = await pdf(dataBuffer);
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
