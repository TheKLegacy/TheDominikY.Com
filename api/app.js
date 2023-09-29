const express = require('express');
const app = express();
const fs = require('fs');
const cheerio = require('cheerio');
const port = 3000;

// Middleware to set cache control headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Function to read and respond with an HTML file
function sendHtmlFile(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
}

// Define route for /v1/htmx/nav
app.get('/v1/htmx/nav', (req, res) => {
    const activeItem = req.query.activeItem;
    fs.readFile('components/nav.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (activeItem) {
            const $ = cheerio.load(data);

            const targetElement = $('a').filter(function () {
                return $(this).text().toLowerCase() === activeItem.toLowerCase();
            });

            let currentClass = targetElement.attr('class') || '';
            currentClass += ' active';
            targetElement.attr('class', currentClass);
            const modifiedData = $.html();
            res.send(modifiedData);
        } else {
            res.send(data);
        }
    });
});

// Define other routes
app.get('/v1/htmx/footer', (req, res) => {
    sendHtmlFile('components/footer.html', res);
});

app.get('/v1/htmx/home/content', (req, res) => {
    sendHtmlFile('components/home/content.html', res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
