const fs = require('fs');
const he = require('he'); 
const cheerio = require('cheerio');
const Handlebars = require("handlebars");

class Html {
    static sendHtmlFile(filePath, res) {
        data = this.loadHtmlFile(filePath);
        res.send(data);
    }

    static sendHtmlWithPushUrl(filePath, res, path) {
        res.setHeader('HX-Push-Url', path);
        this.sendHtmlFile(filePath, res);
    }

    static async constructStandardPage(page, res) {
        try {
            const data = await this.loadHtmlFile('components/baseSite.html');
            const template = Handlebars.compile(data);
    
            const navHtml = await this.loadHtmlFile('components/nav.html');
            const modifiedNavHtml = await this.modifyNavHtml(navHtml, page); // Pass page as activeItem
            const contentHtml = await this.loadHtmlFile(`components/${page}/content.html`);
            const footerHtml = await this.loadHtmlFile('components/footer.html');
    
            const params = {
                nav: modifiedNavHtml,
                content: contentHtml,
                footer: footerHtml
            };
    
            const html = template(params);
    
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error constructing standard page:', error);
            throw error;
        }
    }    
    
    static async loadHtmlFile(path) {
        try {
            const data = await fs.promises.readFile(path, 'utf8');
            return he.decode(data);
        } catch (error) {
            console.error('Error reading HTML file:', error);
            throw error; 
        }
    }

    static async modifyNavHtml(navHtml, activeItem) {
        try {
            const $ = cheerio.load(navHtml);
    
            const targetElement = $('a').filter(function () {
                return $(this).text().toLowerCase().includes(activeItem.toLowerCase());
            });
    
            let currentClass = targetElement.attr('class') || '';
            currentClass += ' active';
            targetElement.attr('class', currentClass);
    
            return $.html();
        } catch (error) {
            console.error('Error modifying nav HTML:', error);
            throw error;
        }
    }
}

module.exports = Html;