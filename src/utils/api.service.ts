import JWT, { SupportedAlgorithms } from "expo-jwt";
import {
  feedbackData,
  projectsData,
  skillsData,
  timelineItemsData,
} from "./data";
import {
  ApiError,
  ApiResponse,
  ApiResult,
  FeedbackItem,
  Project,
  Skill,
  SkillGroup,
  TimelineItemData,
  TimelineItemSort,
} from "./definitions";

type TypedHeaders = RequestInit["headers"] & PreparedHeaders;

type PreparedHeaders = Partial<{
  "Content-Type": string;
  Accept: string;
  Authorization: `Bearer ${string}`;
}>;

type HTTPMethod =
  | "CONNECT"
  | "HEAD"
  | "OPTIONS"
  | "GET"
  | "POST"
  | "PUT"
  | "UPDATE"
  | "DELETE";
type WithBody = Extract<HTTPMethod, "POST" | "PUT" | "UPDATE" | "DELETE">;
type NoBody = Exclude<HTTPMethod, WithBody>;
type MethodBodyCombination =
  | { method?: WithBody; body?: RequestInit["body"] }
  | { method?: NoBody; body?: undefined };
type TypedRequestInit = RequestInit &
  MethodBodyCombination & { headers?: TypedHeaders };

interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}

declare function fetch<ResponseType = any>(
  input: string | URL | globalThis.Request,
  init?: TypedRequestInit,
): Promise<TypedResponse<ResponseType>>;

const generateToken = async (url: string) => {
  const payload = {
    route: new URL(url).pathname,
    stoken: `${import.meta.env.VITE_APP_API_SECRET}`,
    ttoken: `${Date.now()}`,
  };
  const token = JWT.encode(
    {
      sub: JSON.stringify(payload),
      iss: "Coredata",
      exp: Math.floor(Date.now() / 1000) + 5 * 60,
    },
    `${import.meta.env.VITE_APP_API_SECRET}`,
    {
      alg: SupportedAlgorithms.HS256,
    },
  );

  return token;
};

const apiService = {
  async send(
    method: WithBody | NoBody,
    url: string,
    body?: string,
  ): Promise<ApiResult> {
    const token = await generateToken(url);
    const headers: TypedHeaders = {
      "Content-type": "application/json",
      "X-Coredata-Token": `${token}`,
    };

    const options = {
      method,
      mode: "cors",
      cache: "no-cache",
      headers,
      body,
    } as TypedRequestInit;

    try {
      const response = await fetch<ApiResponse>(url, options);

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        console.error(errorMessage);

        return {
          success: false,
          result: errorMessage,
        };
      }

      const result = response.status !== 204 ? await response.json() : null;

      return { success: true, result };
    } catch (error) {
      console.error("Api error:", error);
      return { success: false, result: `Api error: ${error}` };
    }
  },
};

const getErrorMessage = async (response: Response): Promise<string> => {
  const status = response.status;

  try {
    const result: ApiError = await response.json();
    let errorMessage = "";

    if (status === 401) {
      errorMessage = `Authentication error ${status}: ${
        result.message ?? "Credentials incorrect"
      }`;
    } else if (status === 403) {
      errorMessage = `Authorisation error ${status}: No permissions for the resource`;
    } else if (status === 502) {
      errorMessage = `Gateway error ${status}: Service unavailable`;
    } else {
      errorMessage = `Api error ${status}: Request incorrect`;
    }
    return errorMessage;
  } catch (error) {
    console.error("Api error message parse error:", error);
    return `Api error ${status}: Request incorrect`;
  }
};

const getSkills = async (): Promise<Skill[]> => {
  const skills: Skill[] = skillsData;
  return skills;
};

const filterSkills = (filter: string[], skills: Skill[]): Skill[] => {
  const filtered = skills.filter((s) => filter.includes(s.name));
  return filtered;
};

const sortSkills = (skills: Skill[]) => {
  const sorted = skills.sort((a, b) => {
    const progressA = a.progress ?? 0;
    const progressB = b.progress ?? 0;
    return progressB - progressA;
  });
  return sorted;
};

const groupSkills = (skills: Skill[]) => {
  const groups: SkillGroup[] = [];
  const grouped: Record<string, Skill[]> = {};

  for (const skill of skills) {
    const category = skill.category ?? "other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill);
    if (!groups.map((g) => g.name).includes(category)) {
      groups.push({ name: category, count: 1 });
    } else if (skill.progress) {
      groups.filter((g) => g.name === category)[0].count++;
    }
  }
  groups.sort((a, b) => b.count - a.count);
  return { groups, grouped };
};

const getProjects = async (): Promise<Project[]> => {
  const projects: Project[] = projectsData;
  return projects;
};

const getTimelineItems = async (
  sort?: TimelineItemSort,
): Promise<TimelineItemData[]> => {
  let items: TimelineItemData[] = timelineItemsData;

  if (sort && items.length) {
    items = items.sort((a, b) => {
      if (sort === "asc") {
        return a.fromTS - b.fromTS;
      }
      if (sort === "desc") {
        return b.fromTS - a.fromTS;
      }
      return 0;
    });
  }

  return items;
};

const getFeedbackItems = async () => {
  const feedbackItems: FeedbackItem[] = feedbackData;
  return feedbackItems;
};

const sendEmail = async (
  name: string,
  email: string,
  message: string,
): Promise<ApiResult> => {
  const url = `${import.meta.env.VITE_APP_API_URL}/email/send`;
  const body = JSON.stringify({
    recipient: `${import.meta.env.VITE_APP_API_RECIPIENT}`,
    subject: `Message from ${name} ${email} via website`,
    message: `Name: ${name}\nEmail: ${email}\nMessage:\n\n ${message}`,
  });

  return apiService.send("POST", url, body);
};

export {
  getSkills,
  sortSkills,
  filterSkills,
  groupSkills,
  getProjects,
  getTimelineItems,
  getFeedbackItems,
  sendEmail,
};
export type { ApiResult };
