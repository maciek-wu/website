import { FeedbackItem, Project, Skill, TimelineItemData } from "./definitions";

const getTS = (date: string): number => {
	const ts = date === "now" ? Date.now() : new Date(date).getTime();
	return ts;
};

const filter = (filter: string[], skills: Skill[]): Skill[] => {
	const filtered = skills.filter((s) => filter.includes(s.name));
	return filtered;
};

const skillsData: Skill[] = [
	{
		name: "JavaScript",
		url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
		progress: 100,
		category: "code",
	},
	{
		name: "TypeScript",
		url: "https://www.typescriptlang.org/",
		progress: 100,
		category: "code",
	},
	{
		name: "Node",
		url: "https://nodejs.org/",
		progress: 100,
		rank: 10,
		category: "frameworks",
	},
	{
		name: "NestJS",
		url: "https://nestjs.com/",
		progress: 100,
		rank: 10,
		category: "frameworks",
	},
	{
		name: "Express",
		url: "https://expressjs.com/",
		progress: 100,
		rank: 10,
		category: "frameworks",
	},
	{
		name: "React",
		url: "https://reactjs.org/",
		progress: 70,
		rank: 7,
		category: "code",
	},
	{
		name: "Angular",
		url: "https://angular.io/",
		progress: 60,
		rank: 7,
		category: "code",
	},
	{
		name: "Python",
		url: "https://www.python.org/",
		progress: 50,
		rank: 5,
		category: "code",
	},
	{
		name: "Docker",
		url: "https://www.docker.com/",
		progress: 60,
		rank: 7,
		category: "tools",
	},
	{
		name: ".NET",
		url: "https://dotnet.microsoft.com/",
		progress: 70,
		rank: 6,
		category: "code",
	},
	{
		name: "C#",
		url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
		progress: 70,
		rank: 6,
		category: "code",
	},
	{
		name: "MSSQL",
		url: "https://www.microsoft.com/en-us/sql-server",
		progress: 80,
		rank: 6,
		category: "databases",
	},
	{
		name: "PostgreSQL",
		url: "https://www.postgresql.org/",
		progress: 70,
		rank: 7,
		category: "databases",
	},
	{
		name: "Sqlite",
		url: "https://sqlite.org/",
		progress: 70,
		rank: 7,
		category: "databases",
	},
	{
		name: "NoSQL",
		url: "https://www.mongodb.com/nosql-explained",
		progress: 70,
		rank: 6,
		category: "databases",
	},
	{
		name: "Qdrant",
		url: "https://qdrant.tech/",
		progress: 60,
		rank: 6,
		category: "databases",
	},
	{
		name: "GraphQL",
		url: "https://graphql.org/",
		progress: 60,
		category: "code",
	},
	{
		name: "Redis",
		url: "https://redis.io/",
		progress: 70,
		category: "databases",
	},
	{ name: "GitHub", url: "https://github.com", progress: 80 },
	{
		name: "Google Cloud Platform",
		url: "https://cloud.google.com/",
		progress: 50,
		category: "tools",
	},
	{
		name: "Azure",
		url: "https://azure.microsoft.com/",
		progress: 70,
		category: "tools",
	},
	{
		name: "Azure DevOps",
		url: "https://azure.microsoft.com/en-us/services/devops/",
		progress: 70,
		category: "tools",
	},
	{
		name: "Azure ML Studio",
		url: "https://azure.microsoft.com/en-us/services/machine-learning/",
		category: "tools",
	},
	{
		name: "CI/CD",
		url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
		progress: 70,
	},
	{
		name: "OCR",
		url: "https://en.wikipedia.org/wiki/Optical_character_recognition",
		progress: 50,
		category: "ai",
	},
	{
		name: "ChatGPT",
		url: "https://openai.com/blog/chatgpt/",
		progress: 70,
		category: "ai",
	},
	{
		name: "Github Copilot",
		url: "https://github.com/copilot",
		progress: 70,
		category: "ai",
	},
	{
		name: "Claude Code",
		url: "https://claude.com/product/claude-code",
		progress: 60,
		category: "ai",
	},
	{
		name: "AI",
		url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
		progress: 70,
		category: "ai",
	},
	{
		name: "ML",
		url: "https://en.wikipedia.org/wiki/Machine_learning",
		progress: 60,
		category: "ai",
	},
	{
		name: "Perplexity",
		url: "https://www.perplexity.ai/",
		progress: 60,
		category: "ai",
	},
	{
		name: "Responsive Web Design",
		url: "https://www.w3schools.com/css/css_rwd_intro.asp",
		progress: 70,
	},
	{
		name: "Tailwind",
		url: "https://tailwindcss.com/",
		progress: 70,
		category: "frameworks",
	},
	{
		name: "Vite",
		url: "https://vitejs.dev/",
		progress: 70,
		category: "frameworks",
	},
	{
		name: "Webpack",
		url: "https://webpack.js.org/",
		progress: 60,
		category: "tools",
	},
	{
		name: "Git Flow",
		url: "https://nvie.com/posts/a-successful-git-branching-model/",
	},
	{ name: "Databricks", url: "https://www.databricks.com/" },
	{ name: "Agile", url: "https://www.agilealliance.org/agile101/" },
	{ name: "SCRUM", url: "https://www.scrum.org/resources/what-is-scrum" },
	{ name: "Kanban", url: "https://www.atlassian.com/agile/kanban" },
	{ name: "Jira", url: "https://www.atlassian.com/software/jira" },
	{
		name: "Confluence",
		url: "https://www.atlassian.com/software/confluence",
	},
	{ name: "Postman", url: "https://www.postman.com/" },
	{ name: "Swagger", url: "https://swagger.io/" },
	{ name: "Supabase", url: "https://supabase.com/", progress: 80 },
	{
		name: "n8n",
		url: "https://n8n.io/",
		progress: 70,
		category: "tools",
	},
];

const projectsData: Project[] = [
	{
		name: "AI Assistant",
		description:
			"AI-based application that supports decision-making and solving everyday problems. Contains chatbot for general questions, medbot for medical assistance, research module for advanced research",
		tags: ["Node", "NestJS", "Websockets", "Redis", "MQ", "AI"],
		imageUrl: "projects/project-aiassistant.webp",
		url: "https://assistant.coredata.pl",
	},
	{
		name: "WorkflowGPT",
		description:
			"Accelerate innovation by harnessing the power of ChatGPT to leverage your data and documents, discovering new ways of using this groundbreaking technology that work for your use cases. This groundbreaking Generative AI technology is accessible and usable straight out of the box, with various different workflows available on our experimental licence that allow you to experiment with the technology with some common use cases.",
		tags: [
			"Node",
			"NestJS",
			"Websockets",
			"Redis",
			"MQ",
			"AI",
			"OCR",
			"ML",
			"MSSQL",
		],
		imageUrl: "projects/project-workflowgpt.svg",
		url: "https://www.curvestone.io",
	},
	{
		name: "Teagle Systems",
		description:
			"Teagle Systems is an intelligent system to manage both mobile and stationary company resources and employees in the area. Yhis is a telematics tool that enables comprehensive management of car fleets, including driver driving style analysis and rewarding appropriate driving style, as well as vehicle maintenance management.",
		tags: ["Azure", ".NET", "Angular", "MSSQL", "ML"],
		imageUrl: "projects/project-teagle.webp",
	},
];

const timelineItemsData: TimelineItemData[] = [
	{
		title: "Software Engineer",
		subTitle: "Curvestone",
		fromTS: getTS("1 May 2021"),
		toTS: getTS("now"),
		dateSpan: "May 2021 - Present",
		description:
			"As an experienced Backend Developer, I am honored to work with a highly qualified team of specialists. I design and implement state-of-the-art systems and applications using Node, .NET, Azure, and AI technologies. In my daily work, I use, among others, NestJS and ABP Framework, MSSQL databasess and create integration with Databricks and ML services. Every day I expand my knowledge and improve my skills to develop safe solutions of the highest quality.",
		skills: filter(
			[
				"Azure",
				"Node",
				"NestJS",
				".NET",
				"React",
				"Angular",
				"AI",
				"ML",
				"OCR",
			],
			skillsData,
		),
	},
	{
		title: "Founder",
		subTitle: "Coredata",
		fromTS: getTS("1 Jan 2020"),
		toTS: getTS("now"),
		dateSpan: "Jan 2020 - Present",
		description:
			"At Coredata I focus on continuous development and I'm open to new opportunities. I deal with consulting and customer service in the field of IT solutions. I design and implement web applications using the latest technologies. I create tools for automating business processes using data-driven ML technology.",
		skills: filter(
			[
				"Google Cloud Platform",
				"Supabase",
				"Node",
				"NestJS",
				"React",
				"AI",
				"n8n",
			],
			skillsData,
		),
	},
	{
		title: "Software Developer",
		subTitle: "GEOTIK",
		fromTS: getTS("1 Dec 2016"),
		toTS: getTS("1 Apr 2021"),
		dateSpan: "Dec 2016 - Apr 2021",
		description:
			"At Geotik I was working on analyzing business requirements, implementing and maintaining telematic systems and web applications. I was developing driver-scoring application with design and integration of the MSSQL Database. I was maintaining internal systems to support processes in the company. I was also implementing process and workflow automation with n8n.io tool.",
		skills: filter(["Azure", ".NET", "Angular", "MSSQL", "n8n"], skillsData),
	},
	{
		title: "Software Developer",
		subTitle: "T-matic Systems",
		fromTS: getTS("1 Feb 2009"),
		toTS: getTS("1 Dec 2016"),
		dateSpan: "Feb 2009 - Dec 2016",
		description:
			"At T-matic I was designing and implementing intelligent systems to manage both mobile and stationary company resources and employees in the area. I was responsible for analyzing business requirements, designing web applications UI/UX, implementing complex telematic systems including smart-control systems.",
		skills: filter([".NET", "JavaScript", "MSSQL"], skillsData),
	},
];

const feedbackData: FeedbackItem[] = [
	{
		message:
			"I worked with Maciej for almost two years. During this time he showed himself to be a hard working and committed developer.  He was popular with the team and is a natural team player who is always happy to help out and take on whatever needs doing. His flexibility was a great help to us. He started working primarily in Node, but was able to upskill in .Net Core and help out successfully on other projects. His ability to keep pushing through even when deadlines are tight was greatly appreciated by the whole team.",
		name: "Nick Long",
		position: "Chief Technology Officer",
		company: "Curvestone",
		avatar: "avatars/avatar-nick.webp",
	},
	{
		message:
			"Maciej and I have worked together for about two years and on multiple projects. For me, the most difficult thing about working with Maciej has been spelling his name correctly on slack. He is a great teammate - always there to support and takes initiative when he sees someone needing help. Every project has difficult and stressful times, and having Maciej on the team made me feel like there is someone to rely on, no matter what. He is very responsive to change and is keen to lead the adoption of new processes and new learnings to make things better. Maciej doesn't complain - he will point out and communicate when there is a problem, and then put his energy into fixing it. Always calm and reliable, Maciej will be an asset to every team he joins!",
		name: "Veronika Yordanova",
		position: "Technical Project Manager",
		company: "Curvestone",
		avatar: "avatars/avatar-veronica.webp",
	},
	{
		message:
			"I highly recommend Maciej for any software development position. As Software Engineer, he consistently delivered high-quality work and demonstrated strong technical skills and problem-solving abilities. He was also a pleasure to work with, demonstrating a positive attitude and excellent communication skills. Maciej would make a valuable addition to any software development team.",
		name: "Marcin Polak",
		position: "Principal Software Architect",
		company: "Curvestone",
		avatar: "avatars/avatar-marcin.webp",
	},
];

export { skillsData, projectsData, timelineItemsData, feedbackData };
