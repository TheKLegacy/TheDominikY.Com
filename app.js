const express = require("express");
const app = express();
const Html = require("./html");
const Blog = require("./blog");
const Projects = require("./projects");
const port = 3000;

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.get("/v1/htmx/footer", (req, res) => Html.sendHtmlFile("components/footer.html", res));

app.get("/", (req, res) => Html.constructStandardPage("home", res));

app.get("/projects", (req, res) => Html.constructStandardPage("projects", res));

app.get("/projects/content", (req, res) => {
    const { filter, sort, direction } = req.query;
    res.send(Projects.displayProjects(filter, sort, direction));
});

app.get("/about", (req, res) => Html.constructStandardPage("about", res));

app.get("/resume", (req, res) => Html.constructStandardPage("resume", res));

app.get("/blog", (req, res) => Html.constructStandardPage("blog", res));

app.get("/v1/htmx/blog/items", async (req, res) => {
    const { filter, sort } = req.query;
    res.send(await Blog.getCards(filter, sort));
});

app.get("/v1/htmx/blog/entry", async (req, res) =>
    Html.sendHtmlFile(`components/blog/entries/${req.query.id}.html`, res)
);

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
