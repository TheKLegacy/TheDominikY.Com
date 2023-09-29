const express = require('express');
const app = express();
const fs = require('fs');
const cheerio = require('cheerio'); // Import the cheerio library
const port = 3000;

// Define a route that returns a simple JSON response
app.get('/v1/htmx/nav', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const activeItem = req.query.activeItem;

    // Read the HTML file asynchronously
    fs.readFile('components/nav.html', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

        if(activeItem) {
            const $ = cheerio.load(data);

            const targetElement = $('a').filter(function() {
                return $(this).text().toLowerCase() === activeItem.toLowerCase();
            });

            let currentClass = targetElement.attr('class') || '';
            currentClass += ' active';
            targetElement.attr('class', currentClass);
            const modifiedData = $.html();
            res.send(modifiedData);
            return;
        }
        res.send(data);
    });
});

app.get('/v1/htmx/footer', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Read the HTML file asynchronously
    fs.readFile('components/footer.html', 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Internal Server Error');
        return;
        }
        
        // Send the HTML content as the response
        res.send(data);
    });
}); 
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});