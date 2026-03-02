import { useEffect, useState } from "react";
import { useUtil } from "../../../hooks/useUtil";

export interface TypeStep {
  text: string;
  pause?: boolean;
}

interface TypeParams {
  text: string;
  isTyping: boolean;
  step: number;
  stepEnd: boolean;
  delay: number;
}

interface TypeTextProps {
  typeSteps: TypeStep[];
  delay?: number;
  backspace?: boolean;
  humanLike?: boolean;
  infinite?: boolean;
  skipped?: boolean;
  setTyping?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TypeText({
  typeSteps,
  delay = 100,
  backspace = false,
  infinite = false,
  skipped = false,
  setTyping,
}: TypeTextProps) {
  const defaultParams: TypeParams = {
    text: "",
    isTyping: true,
    step: 0,
    stepEnd: false,
    delay,
  };
  const cursorChar = "|";
  const [params, setParams] = useState<TypeParams>(defaultParams);
  const [cursor, setCursor] = useState(true);
  const { pause } = useUtil();
  let timeoutId: number | undefined = undefined;

  function appendText(step: number, text: string) {
    if (!typeSteps[step] || skipped) return "";
    return text + typeSteps[step].text.slice(text.length, text.length + 1);
  }

  function backText(text: string) {
    if (!text || skipped) return "";
    return text.slice(0, -1);
  }

  function update(params: TypeParams) {
    const { delay } = params;
    timeoutId = setTimeout(() => {
      setParams({
        ...params,
      });
    }, delay);
  }

  function calcDelay(stepEnd?: boolean): number {
    const multiplier = backspace ? 40 : stepEnd ? 1500 : 100;
    return 32 + Math.round(Math.random() * multiplier);
  }

  function calcPauseDuration(text: string): number {
    if (!text) return 100;
    return text.length * 80;
  }

  function calcNextStep(stepEnd?: boolean): number {
    const { step } = params;
    const nextStep = stepEnd && backspace ? step : stepEnd ? step + 1 : step;
    return nextStep > typeSteps.length - 1 ? step : nextStep;
  }

  async function typeHandler() {
    const { text, step, stepEnd, isTyping } = params;
    const newText = appendText(step, text);
    const nextStepEnd = !stepEnd && typeSteps[step].text === newText;
    const nextStep = calcNextStep(nextStepEnd);
    const stillTyping = nextStepEnd && nextStep === step ? false : true;

    if (!newText.length || !isTyping) {
      return;
    }
    if (stepEnd && typeSteps[nextStep]?.pause) {
      const pauseDuration = calcPauseDuration(text);
      await pause(pauseDuration);
    }

    update({
      text: stepEnd ? "" : newText,
      isTyping: stillTyping,
      step: nextStepEnd ? nextStep : step,
      stepEnd: nextStepEnd,
      delay: calcDelay(stepEnd),
    });
  }

  // TODO: fix backspace mode
  function backspaceHandler() {
    const { text, isTyping, step } = params;
    const newText = backText(text);
    const stillTyping = newText.length ? isTyping : !isTyping;
    const nextStep = !newText.length ? step + 1 : step;

    update({
      ...params,
      text: newText,
      isTyping: stillTyping,
      step: nextStep,
      delay: calcDelay(),
    });
  }

  function start() {
    if (setTyping) {
      setTyping(true);
    }
    setCursor(true);
  }

  async function stop() {
    if (infinite) {
      await pause(2000);
      setParams(defaultParams);
      return;
    }
    if (setTyping) {
      setTyping(false);
    }
    setCursor(false);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    if (skipped && !infinite) {
      stop();
    }
  }, [skipped, infinite]);

  useEffect(() => {
    const { step, isTyping } = params;

    if (typeSteps.length - 1 === step && !isTyping) {
      stop();
      return;
    }
    if (isTyping) {
      typeHandler();
    } else if (backspace) {
      backspaceHandler();
    }
  }, [params]);

  // restart
  useEffect(() => {
    setParams(defaultParams);
  }, [typeSteps]);

  return (
    <>
      {params.text}
      {cursor && <span className="blinking">{cursorChar}</span>}
    </>
  );
}
