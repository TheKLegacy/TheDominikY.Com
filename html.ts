const fs = require('fs');
const he = require('he'); 
const cheerio = require('cheerio');
import * as Handlebars from "handlebars";
import path from "path";

interface StandardPageParams {
    nav: string;
    content: string;
}

class Html {
    static async sendHtmlFile(filePath: string, res: import('express').Response): Promise<void> {
        const data: string = await this.loadHtmlFile(filePath, false);
        res.send(data);
    }

    static async constructStandardPage(page: string, res: import('express').Response): Promise<void> {
        try {
            const data: string = await this.loadHtmlFile('components/baseSite.html');
            const template: HandlebarsTemplateDelegate = Handlebars.compile(data);
    
            const navHtml: string = await this.loadHtmlFile('components/nav.html');
            const modifiedNavHtml: string = await this.modifyNavHtml(navHtml, page);
            const contentHtml: string = await this.loadHtmlFile(`components/${page}/content.html`);
    
            const params: StandardPageParams = {
                nav: modifiedNavHtml,
                content: contentHtml
            };
    
            const html: string = template(params);
    
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error constructing standard page:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    static async loadHtmlFile(filePath: string, shouldDecode: boolean = true): Promise<string> {
        try {
            // Resolve path relative to project root (one level up from dist folder)
            const absolutePath = path.resolve(__dirname, '..', filePath);
            let data: string = await fs.promises.readFile(absolutePath, 'utf8');
            data = shouldDecode ? he.decode(data) : data;
            return data;
        } catch (error) {
            console.error('Error reading HTML file:', error);
            throw error; 
        }
    }

    static async modifyNavHtml(navHtml: string, activeItem: string): Promise<string> {
        try {
            const $: cheerio.Root = cheerio.load(navHtml);
    
            const targetElement: cheerio.Cheerio = $('a').filter(function (this: cheerio.Element) {
                return $(this).text().toLowerCase().includes(activeItem.toLowerCase());
            });
    
            let currentClass: string = targetElement.attr('class') || '';
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