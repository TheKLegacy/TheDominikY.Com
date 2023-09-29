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

    console.log(activeItem);

    // Read the HTML file asynchronously
    fs.readFile('components/nav.html', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

    // Load the HTML content into a cheerio object
    const $ = cheerio.load(data);

    // Find the element based on its inner HTML (e.g., "Content goes here")
    const targetElement = $('a').filter(function() {
        return $(this).text().toLowerCase() === activeItem.toLowerCase();
    });

    console.log(`a:contains("${activeItem}")`)
    console.log(targetElement.html());

    // Modify the class attribute of the found element
    // Get the current class attribute value
    let currentClass = targetElement.attr('class') || '';

    // Append a new class name to the existing class (e.g., "new-class")
    currentClass += ' active';

    // Update the class attribute of the element with the new value
    targetElement.attr('class', currentClass);

    // Get the updated HTML content
    const modifiedData = $.html();

    // Send the HTML content as the response
    res.send(modifiedData);
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