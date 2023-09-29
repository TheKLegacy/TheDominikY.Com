const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

// Define a route that returns a simple JSON response
app.get('/v1/htmx/nav', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Read the HTML file asynchronously
    fs.readFile('components/nav.html', 'utf8', (err, data) => {
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