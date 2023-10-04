const fs = require('fs');
const he = require('he'); 
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

    static async constructStandardPage(page) {
        try {
            const data = await this.loadHtmlFile('components/baseSite.html');
            const template = Handlebars.compile(data);
    
            // Load additional HTML content from files and decode it
            const navHtml = await this.loadHtmlFile('components/nav.html');
            const contentHtml = await this.loadHtmlFile(`components/${page}/content.html`);
            const footerHtml = await this.loadHtmlFile('components/footer.html');
    
            const params = {
                nav: navHtml,
                content: contentHtml,
                footer: footerHtml
            };
    
            const html = template(params);
            return html;
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
}


module.exports = Html;