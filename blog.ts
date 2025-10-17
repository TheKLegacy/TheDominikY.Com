import { promises as fs } from 'fs';

interface BlogEntry {
    id: number;
    date: string;
    displayTitle: string;
}

class Blog {
    static async getCards(filter?: string, sort?: string): Promise<string> {
        try {
            const data = await fs.readFile('components/blog/blogEntries.json', 'utf8');
            const jsonData: BlogEntry[] = JSON.parse(data);
            let cards = "";

            const filteredEntries = filter
                ? jsonData.filter((bmd: BlogEntry) => bmd.displayTitle.toLowerCase().includes(filter.toLowerCase()))
                : jsonData;

            const sortedEntries = filteredEntries.sort((a: BlogEntry, b: BlogEntry) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sort === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
            });

            sortedEntries.forEach((bmd: BlogEntry) => {
                cards += `
                <div class="card blog-card" hx-get="/../v1/htmx/blog/entry?id=${bmd.id}" hx-target="#blog-container" hx-swap="inner-html">
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
            return "";
        }
    }
}

export = Blog;
