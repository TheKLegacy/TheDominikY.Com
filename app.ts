import express, { Request, Response, NextFunction } from "express";

const Html = require("./html");
const Blog = require("./blog");
const Projects = require("./projects");

const app = express();
const port: number = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.get("/v1/htmx/footer", (req: Request, res: Response) => Html.sendHtmlFile("components/footer.html", res));

app.get("/", (req: Request, res: Response) => Html.constructStandardPage("home", res));

app.get("/projects", (req: Request, res: Response) => Html.constructStandardPage("projects", res));

app.get("/projects/content", (req: Request, res: Response) => {
    const { filter, sort, direction } = req.query;
    res.send(Projects.displayProjects(filter as string, sort as string, direction as string));
});

app.get("/about", (req: Request, res: Response) => Html.constructStandardPage("about", res));

app.get("/resume", (req: Request, res: Response) => Html.constructStandardPage("resume", res));

app.get("/blog", (req: Request, res: Response) => Html.constructStandardPage("blog", res));

app.get("/v1/htmx/blog/items", async (req: Request, res: Response) => {
    const { filter, sort } = req.query;
    res.send(await Blog.getCards(filter as string, sort as string));
});

app.get("/v1/htmx/blog/entry", async (req: Request, res: Response) =>
    Html.sendHtmlFile(`components/blog/entries/${req.query.id}.html`, res)
);

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
