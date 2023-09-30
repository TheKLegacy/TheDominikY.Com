const fs = require('fs').promises;

class Blog {
    static async getCards(filter) {
        try {
            const data = await fs.readFile('components/blog/blogEntries.json', 'utf8');
            const jsonData = JSON.parse(data);

            const filteredEntries = filter
                ? jsonData.filter(bmd => bmd.displayTitle.toLowerCase().includes(filter.toLowerCase()))
                : jsonData;

            let cards = "";

            filteredEntries.forEach(bmd => {
                cards += `
                <div class="card blog-card" hx-get="/api/v1/htmx/blog/entry?id=${bmd.id}" hx-target="#blog-container hx-swap="inner-html"">
                    <div class="card-body">
                        <h5 class="card-title">${bmd.date}</h5>
                        <p class="card-text">${bmd.displayTitle}</p>
                    </div>
                </div>
                `;
            });

            return cards;
        } catch (error) {
            console.error('Error reading or parsing JSON file:', error);
            return ""; //
        }
    }

    static async getEntry(id) {
        try {
            const content = await fs.readFile(`components/blog/entries/${id}.html`, 'utf8');
            return content;
        } catch (error) {
            console.error('Error reading the file:', error);
            return null; // You can return null or handle the error in another way, as needed
        }        
    }
}


module.exports = Blog;
