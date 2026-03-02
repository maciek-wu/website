import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useUtil } from "../hooks/useUtil";
import { getProjects } from "../utils/api.service";
import { Project } from "../utils/definitions";
import SubHeader from "./ui/SubHeader";

export default function Projects() {
  const { isMobile } = useUtil();
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  async function loadProjects() {
    const projects = await getProjects();
    setProjectsList(projects);
  }

  function change(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    const btn = event.currentTarget;
    const carousel = btn.parentElement!.parentElement!.parentElement!;
    const href = btn.getAttribute("href")!;
    const target = carousel.querySelector<HTMLDivElement>(href)!;
    const left = target.offsetLeft;
    carousel.scrollTo({ left: left });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full mt-16 text-left">
        <SubHeader message="Projects" />
      </div>
      <div
        className={`carousel carousel-center border border-gray-900 shadow-lg shadow-black rounded-lg py-10 bg-theme-dark`}
      >
        {projectsList.length > 0 &&
          projectsList.map((project, idx) => {
            const id = `project-${idx}`;
            const prevId = `project-${idx == 0 ? projectsList.length - 1 : idx - 1}`;
            const nextId = `project-${idx == projectsList.length - 1 ? 0 : idx + 1}`;

            return (
              <div
                id={id}
                className={`carousel-item relative w-full ${isMobile() ? "py-10" : "h-full my-auto"} aligh-center text-left`}
                key={idx}
              >
                <div
                  className={`grid ${isMobile() ? "grid-cols-1" : "grid-cols-2 gap-10"}`}
                >
                  <div className={`${isMobile() ? "ml-4" : "ml-40"}`}>
                    <div className="mb-4 text-xl text-theme-green text-semibold">
                      {project.name}
                    </div>
                    <div className="my-2 pr-10">{project.description}</div>
                    <div className="flex flex-wrap gap-2 my-4 text-xs">
                      {project.tags.map((tag) => (
                        <span
                          className="px-2 py-1 rounded text-theme-blue bg-gray-700 ease opacity-80 hover:text-white"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <div className="my-2">
                        <Link to={project.url} target="_blank">
                          {project.url}
                        </Link>
                      </div>
                    )}
                  </div>
                  {project.imageUrl && !isMobile() && (
                    <img
                      className="w-3/5 mr-40 my-auto"
                      src={`img/${project.imageUrl}`}
                      alt=""
                    />
                  )}
                </div>
                <div
                  className={`absolute left-5 right-5 ${isMobile() ? "top-0" : "top-1/2"} flex -translate-y-1/2 transform justify-between`}
                >
                  <a
                    className="btn rounded bg-slate-800 hover:bg-slate-700"
                    onClick={change}
                    href={`#${prevId}`}
                  >
                    ❮
                  </a>
                  <a
                    className="btn rounded bg-slate-800 hover:bg-slate-700"
                    onClick={change}
                    href={`#${nextId}`}
                  >
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
