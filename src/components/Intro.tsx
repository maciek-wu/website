import { useEffect, useState } from "react";
import audioTheme from "../assets/audio/theme.mp3";
import imgEarth from "../assets/img/earth.webp";
import { useUtil } from "../hooks/useUtil";
import { AnimationStep } from "../utils/definitions";
import IntroTopbar from "./IntroTopbar";
import BlackOut from "./ui/effects/BlackOut";
import SpaceBackground from "./ui/effects/SpaceBackground";
import Spaceman from "./ui/effects/Spaceman";
import TransformImage from "./ui/effects/TransformImage";
import TypeText, { TypeStep } from "./ui/effects/TypeText";
import Title from "./ui/Title";
import UnderlineLink from "./ui/UnderlineLink";

interface IntroProps {
  close: () => void;
}

export default function Intro({ close }: IntroProps) {
  const { pause, player } = useUtil();
  const [typeSteps, setTypeSteps] = useState<TypeStep[]>([
    { text: "Space", pause: true },
    { text: "The final frontier.", pause: true },
    {
      text: "We stand today on the edge of a new frontier.",
      pause: true,
    },
    {
      text: "Beyond that frontier are uncharted areas of opportunities.",
      pause: true,
    },
    { text: "AI Automation" },
    { text: "Autonomous agents" },
    { text: "Gen AI workflows" },
    { text: "AI medical diagnosis" },
    { text: "Improving decision-making" },
    { text: "Want to know more?" },
  ]);
  const [typeDelay, setTypeDelay] = useState(500);
  const [typing, setTyping] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const [closing, setClosing] = useState(false);
  const [blackOutActive, setBlackOutActive] = useState(false);
  const [imageTransformSteps, setImageTransformSteps] = useState<
    AnimationStep[]
  >([
    {
      action: "moveUp",
      delay: 3000,
    },
  ]);
  const [spacemenSteps, setSpacemenSteps] = useState<AnimationStep[]>([
    { action: "moveDown", delay: 1000 },
  ]);

  async function handleClose() {
    if (typing || skipped) {
      return;
    }
    setClosing(true);
    setImageTransformSteps([
      {
        action: "scaleUp",
        delay: 1000,
      },
    ]);
    setSpacemenSteps([{ action: "moveUp" }]);
    setTypeDelay(0);
    setTypeSteps([{ text: "Excellent! Get ready!" }]);
    await pause(2000);
    await handleSkip();
  }

  async function handleSkip() {
    setSkipped(true);
    blackOut();
    player.volumeDown();
    await pause(1000);
    return close();
  }

  function blackOut() {
    setBlackOutActive(true);
  }

  async function playAudio() {
    player.load(audioTheme);
    await pause(1000);
    player.play(0.1);
  }

  useEffect(() => {
    playAudio();

    return () => {
      player.pause();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <IntroTopbar skip={() => handleSkip()} />
      <SpaceBackground />
      <TransformImage src={imgEarth} steps={imageTransformSteps} />
      <div className="relative md:absolute top-60 md:left-60 z-10 w-4/6 md:w-1/2 mx-auto">
        <Title>
          <TypeText
            typeSteps={typeSteps}
            delay={typeDelay}
            skipped={skipped}
            setTyping={setTyping}
          />
        </Title>
        {!typing && !skipped && !closing && (
          <UnderlineLink
            label="Let's start!"
            onClick={handleClose}
            fadeIn={true}
          />
        )}
      </div>
      <div className="-ml-1">
        <BlackOut active={blackOutActive} mode="out" />
      </div>
      <Spaceman position={["top-20", "right-40"]} steps={spacemenSteps} />
    </div>
  );
}
