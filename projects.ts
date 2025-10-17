interface Project {
    id: string;
    name: string;
    createDate: string;
    stopDate: string;
    lang: string[];
    image: string;
    description: string;
    link?: string;
    linkText?: string;
}

const projects: Project[] = [
    {
        id: "build-a-metagame",
        name: "Build A Metagame",
        createDate: "2015",
        stopDate: "2018",
        lang: ["HTML5", "CSS3", "JavaScript"],
        image: "assets/imgs/bamhub.jpg",
        description:
            "Build a metagame (BAM) is a Pokémon fakedex focused on creating a new competitive Pokémon metagame. We have our own forum and Pokédex and once was planned to be functioning on Pokémon Showdown. [THIS IS NOW DEFUNCT] To view the archived version",
        link: "/bam/index4.html",
        linkText: "click here",
    },
    {
        id: "html5-roguelike",
        name: "HTML5 Roguelike",
        createDate: "2013",
        stopDate: "2018",
        lang: ["HTML5", "CSS3", "JavaScript"],
        image: "assets/imgs/rouguepreview.png",
        description:
            "This is an HTML roguelike RPG that I made completely from scratch with free graphics.",
    },
    {
        id: "java-snake-game",
        name: "Java Snake Game",
        createDate: "2016",
        stopDate: "2016",
        lang: ["Java", "Eclipse"],
        image: "assets/imgs/snakejava.jpg",
        description:
            "Made in AP Computer Science with David Ruth and Charles Jacob. A simple Snake game that keeps track of the winner in a two player mode (Kinda like slither.io) or classic single player. This game also implements music in Java. Use arrow keys or WASD to move, 1 and 2 to change player modes and R to restart.",
    },
    {
        id: "rby2k20",
        name: "RBY2K20",
        createDate: "2020",
        stopDate: "2020",
        lang: ["JavaScript", "CSS3", "HTML5", "PHP"],
        image: "rby2k20/imgs/alphalogobig.png",
        description:
            "RBY2k20 is a Generation 1 competitive Pokémon community. The website developed by myself contains a Pokédex and simple CMS. To see it",
        link: "http://thedominiky.com/rby2k20/",
        linkText: "click here",
    },
    {
        id: "unity-roguelike",
        name: "Unity Roguelike",
        createDate: "2017",
        stopDate: "2018",
        lang: ["Unity", "C#"],
        image: "assets/imgs/unityrougue.PNG",
        description:
            "Roguelike game made in Unity and C# as a senior project in high school with my good friend Rishi Patel. The game had a combat system, leveling, shopping, and dungeoneering.",
    },
    {
        id: "multiplayer-ctf-paintball",
        name: "Multi-Player CTF Paintball",
        createDate: "2017",
        stopDate: "2017",
        lang: ["Unity", "C#"],
        image: "assets/imgs/unityctf.png",
        description:
            "A multiplayer Capture The Flag paintball game developed in Unity.",
    },
];

function generateProjectHTML(project: Project): string {
    let html = `
        <div class="project-item container" data-id="${
            project.id
        }" data-name="${project.name.toLowerCase()}" data-lang="${project.lang
        .join(" ")
        .toLowerCase()}" data-create="${project.createDate}" data-update="${
        project.stopDate
    }">
            <h3>${project.name}</h3>
            <img class="img-thumbnail rounded" src="${project.image}" alt="${
        project.name
    } screenshot">
            <p>
                ${project.description}
                ${
                    project.link
                        ? `<a href="${project.link}">${project.linkText}</a>`
                        : ""
                }
            </p>
            <span>Created: ${project.createDate}&nbsp;&nbsp;&nbsp; Updated: ${
        project.stopDate
    }</span>
            <div class="tech-tags">
                ${project.lang
                    .map(
                        (tech) =>
                            `<span class="badge badge-primary">${tech}</span>`
                    )
                    .join(" ")}
            </div>
        </div>
        <br>
    `;
    return html;
}

function displayProjects(searchFilter?: string, sort?: string, direction?: string): string {
    let filteredProjects: Project[] = [...projects];

    if (searchFilter) {
        filteredProjects = projects.filter((proj: Project) =>
            [proj.name, proj.description].some((field: string) =>
                field.toLowerCase().includes(searchFilter.toLowerCase())
            )
        );
    }

    const sortKey: keyof Project | null =
        sort === "alpha"
            ? "name"
            : sort === "date"
            ? "stopDate"
            : sort === "create"
            ? "createDate"
            : null;

    if (sortKey) {
        filteredProjects.sort((a: Project, b: Project) =>
            direction === "asc"
                ? String(a[sortKey]).localeCompare(String(b[sortKey]))
                : String(b[sortKey]).localeCompare(String(a[sortKey]))
        );
    }

    return filteredProjects.map(generateProjectHTML).join("");
}

export = { displayProjects };