const express = require('express');
const app = express();
const fs = require('fs');
const cheerio = require('cheerio');
const Html = require('./html');
const Blog = require('./blog');
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}); 

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

app.get('/v1/htmx/footer', (req, res) => {
    Html.sendHtmlFile('components/footer.html', res);
});

app.get('/v1/htmx/home/content', (req, res) => {
    Html.sendHtmlWithPushUrl('components/home/content.html', res, '/home');
});

app.get('/v1/htmx/projects/content', (req, res) => {
    Html.sendHtmlWithPushUrl('components/projects/content.html', res, '/projects');
});

app.get('/v1/htmx/about/content', (req, res) => {
    Html.sendHtmlWithPushUrl('components/about/content.html', res, '/about');
});

app.get('/v1/htmx/resume/content', (req, res) => {
    Html.sendHtmlWithPushUrl('components/resume/content.html', res, '/resume');
});

app.get('/v1/htmx/blog/content', (req, res) => {
    Html.sendHtmlWithPushUrl('components/blog/content.html', res, '/blog');
});

app.get('/v1/htmx/blog/items', async (req, res) => {
    const filter = req.query.filter;
    const sort = req.query.sort;
    res.send(await Blog.getCards(filter, sort))
});

app.get('/v1/htmx/blog/entry', async (req, res) => {
    const id = req.query.id;
    Html.sendHtmlFile(`components/blog/entries/${id}.html`,res);
});

app.get('/test', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(await Html.constructStandardPage("home"));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});