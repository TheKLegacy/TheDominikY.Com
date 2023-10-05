const fs = require('fs');
const he = require('he'); 
const cheerio = require('cheerio');
const Handlebars = require("handlebars");

class Html {
    static async sendHtmlFile(filePath, res) {
        const data = await this.loadHtmlFile(filePath, false);
        res.send(data);
    }

    static async constructStandardPage(page, res) {
        try {
            const data = await this.loadHtmlFile('components/baseSite.html');
            const template = Handlebars.compile(data);
    
            const navHtml = await this.loadHtmlFile('components/nav.html');
            const modifiedNavHtml = await this.modifyNavHtml(navHtml, page);
            const contentHtml = await this.loadHtmlFile(`components/${page}/content.html`);
    
            const params = {
                nav: modifiedNavHtml,
                content: contentHtml
            };
    
            const html = template(params);
    
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error constructing standard page:', error);
            throw error;
        }
    }    
    
    static async loadHtmlFile(path, shouldDecode = true) {
        try {
            let data = await fs.promises.readFile(path, 'utf8');
            data = shouldDecode? he.decode(data) : data;
            return data
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