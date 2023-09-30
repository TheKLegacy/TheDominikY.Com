const fs = require('fs');

class Html {
    static sendHtmlFile(filePath, res) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(data);
        });
    }
}

module.exports = Html;