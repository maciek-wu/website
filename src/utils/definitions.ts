export enum AppComponents {
	navbar = "navbar",
	hero = "hero",
	about = "about",
	skills = "skills",
	experience = "experience",
	projects = "projects",
	contact = "contact",
}

export interface ApiResponse {
	success: boolean;
	result: any;
	status: number;
}

export interface ApiResult {
	success: boolean;
	result: any;
}

export interface ApiError {
	message: string;
	statusCode: number;
}

export interface AnimationStep {
	action: "moveUp" | "moveDown" | "scaleUp" | "scaleDown";
	delay?: number;
}

export enum SkillEnum {
	JavaScript = "JavaScript",
	TypeScript = "TypeScript",
	Node = "Node",
	NestJS = "NestJS",
	Express = "Express",
	React = "React",
	Angular = "Angular",
	Docker = "Docker",
	NET = ".NET",
	MSSQL = "MSSQL",
	PostgreSQL = "PostgreSQL",
	Sqlite = "Sqlite",
	NoSQL = "NoSQL",
	Qdrant = "Qdrant",
	GraphQL = "GraphQL",
	Redis = "Redis",
	GitHub = "GitHub",
	GCP = "Google Cloud Platform",
	Azure = "Azure",
}

export type SkillCategory =
	| "code"
	| "databases"
	| "frameworks"
	| "libs"
	| "tools"
	| "ai"
	| "other";

export interface Skill {
	name: string;
	url?: string;
	progress?: number;
	rank?: number;
	category?: SkillCategory;
}

export interface SkillGroup {
	name: string;
	count: number;
	rank?: number;
}

export interface Project {
	name: string;
	description: string;
	tags: string[];
	imageUrl?: string;
	url?: string;
	ghUrl?: string;
}

export interface ProjectFilter {
	name: string;
	skills: Skill[];
}

export interface TimelineItemData {
	title: string;
	subTitle: string;
	description: string;
	fromTS: number;
	toTS: number;
	dateSpan: string;
	skills: Skill[];
}

export type TimelineItemSort = "asc" | "desc";

export interface FeedbackItem {
	message: string;
	name: string;
	position: string;
	company: string;
	avatar: string;
}
