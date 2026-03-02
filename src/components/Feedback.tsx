import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useUtil } from "../hooks/useUtil";
import { getFeedbackItems } from "../utils/api.service";
import { FeedbackItem } from "../utils/definitions";
import SubHeader from "./ui/SubHeader";

export default function Feedback() {
  const { isMobile } = useUtil();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  async function load() {
    const feedbackItems = await getFeedbackItems();
    setFeedback(feedbackItems);
  }

  function isEven(nr: number) {
    return nr % 2 === 0;
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full">
      <SubHeader message="Feedback" />
      <div className="flex flex-col justify-start items-start w-full">
        {feedback.length > 0 &&
          feedback.map((item, idx) => {
            return (
              <div
                className={`chat ${isEven(idx) ? "chat-start" : "chat-end"} ${isMobile() ? "w-full" : "w-10/12"} mb-10`}
                key={`feedback-item-${idx}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full shadow-xl shadow-black">
                    <img alt="" src={`img/${item.avatar}`} />
                  </div>
                </div>
                <div className="chat-bubble bg-slate-800 shadow-lg shadow-black">
                  <div className="text-sm text-slate-400 mb-4">
                    {item.message}
                  </div>
                  <div className="text-theme-blue">{item.name}</div>
                  <div className="text-sm text-slate-400">
                    <span className="text-slate-200">{item.position}</span> |{" "}
                    <span className="font-semibold text-theme-violet">
                      {item.company}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="">
        <Link
          className="group relative inline-block"
          to="https://www.linkedin.com/in/maciejwasiak/details/recommendations/"
          target="_blank"
        >
          See full list of recommendations
          <span
            className={`fi fi-sr-angle-small-right absolute mt-1 ml-1 transition transform duration-200 group-hover:translate-x-1`}
          ></span>
        </Link>
      </div>
    </div>
  );
}
