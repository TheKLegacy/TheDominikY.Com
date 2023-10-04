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

    static sendHtmlWithPushUrl(filePath, res, path) {
        res.setHeader('HX-Push-Url', path);
        this.sendHtmlFile(filePath, res);
    }
}


module.exports = Html;