import { useEffect, useState } from "react";
import { useUi } from "../hooks/useUi";
import { useUtil } from "../hooks/useUtil";
import { AppComponents } from "../utils/definitions";
import Button from "./ui/Button";
import BlackOut from "./ui/effects/BlackOut";
import TypeText from "./ui/effects/TypeText";
import Section from "./ui/Section";
import Title from "./ui/Title";

export default function Hero() {
  const { isMobile, throttle } = useUtil();
  const { scrollTo } = useUi();
  const [showMouseIcon, setShowMouseIcon] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "scrollend",
      throttle(() => setShowMouseIcon(false), 100),
    );

    return () => {
      window.removeEventListener(
        "scrollend",
        throttle(() => setShowMouseIcon(false), 100),
      );
    };
  }, []);

  return (
    <>
      <BlackOut active={true} mode="in" />
      <Section
        id={AppComponents.hero}
        bgImage="bg-hero bg-cover bg-bottom h-screen"
      >
        <div className="relative flex w-full h-full text-center">
          <div className="container flex flex-col my-auto md:my-auto items-start text-left">
            <Title>
              <div className="text-theme-blue">&#60;</div>
              <div>Hi, I'm</div>
              <div className="animate-text inline-block bg-linear-to-br text-transparent from-teal-500 via-theme-sky to-indigo-700 bg-clip-text shadow-none">
                Maciej Wasiak
              </div>
              <div className="">
                <TypeText
                  typeSteps={[
                    { text: "Software Engineer", pause: true },
                    { text: "Backend Developer", pause: true },
                    { text: "Database Architect", pause: true },
                    { text: "AI Engineer", pause: true },
                    { text: "Founder", pause: true },
                    { text: "Graphic Designer", pause: true },
                    { text: "MTB cyclist", pause: true },
                    { text: "Cinema lover", pause: true },
                    { text: "Skier", pause: true },
                    { text: "Are you still reading this?", pause: true },
                    { text: "Let's create something great!", pause: true },
                  ]}
                  delay={1000}
                  infinite={true}
                />
              </div>
              <div className="text-theme-blue">&#47;&#62;</div>
            </Title>
            <p className="md:w-8/12 mt-4 text-lg text-slate-300 leading-relaxed">
              I have been designing and implementing web applications and
              systems for over <b>20 years</b>. Every day I expand my knowledge
              and improve my skills to develop safe solutions of the highest
              quality.
            </p>
            <div className="relative flex w-50 h-12 mt-12">
              <div className="relative inline-flex">
                <Button
                  label="Find out more"
                  icon="fi fi-sr-arrow-down"
                  onClick={() => scrollTo(AppComponents.skills)}
                />
              </div>
            </div>
          </div>
          <div
            className={`absolute hidden xl:flex flex-row top-80 right-96 mx-auto text-left transition-opacity duration-300 ease-in-out`}
          >
            <div className="relative flex justify-center align-middle w-6 h-6">
              <span className="absolute flex h-full w-full animate-ping rounded-full bg-theme-blue opacity-75"></span>
              <span className="relative flex w-3 h-3 mt-1.5 rounded-full bg-theme-blue"></span>
            </div>
            <div className="ml-2 hover:text-white transition-colors duration-300 ease-in-out">
              Warsaw HQ
            </div>
          </div>
          {!isMobile() && (
            <div
              className={`absolute flex flex-col items-center bottom-10 left-[50%] w-32 -ml-2 mx-auto text-center transition-opacity duration-300 ease-in-out ${showMouseIcon ? "opacity-100" : "opacity-0"}`}
            >
              <i className="fi fi-sr-mouse size-6 text-xl text-theme-green/70 animate-bounce"></i>
              <p className="mt-2 text-xs text-theme-green/60">scroll down</p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
