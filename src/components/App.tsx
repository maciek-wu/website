import { useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";
import { useUtil } from "../hooks/useUtil";
import { createCursor } from "../utils/common";
import About from "./About";
import AppView from "./AppView";
import Contact from "./Contact";
import Experience from "./Experience";
import Footer from "./Footer";
import Hero from "./Hero";
import Intro from "./Intro";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
import Skills from "./Skills";
import Spaceman from "./ui/effects/Spaceman";
import Loading from "./ui/Loading";

interface AppProps {
  loaded?: boolean;
}

export default function App({ loaded = false }: AppProps) {
  const { isMobile } = useUtil();
  const { loading } = useLoading();
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    if (!isMobile()) {
      createCursor();
    }
    console.clear();
    console.log(
      "%cMaciej Wasiak Website is %crunning%c. All issues will be logged in this console.",
      "color: inherit;",
      "color: #27cd8d; font-weight: bold;",
      "color: inherit;",
    );
  }, [intro]);

  if (!loaded && loading) {
    return <Loading />;
  }
  if (intro) {
    return <Intro close={() => setIntro(false)} />;
  }

  return (
    <AppView>
      <Navbar />
      <div className="sticky top-0 h-screen">
        <Hero />
      </div>
      <div className="sticky top-0 h-full bg-theme-dark">
        <Skills />
        <Newsletter />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </div>
      <Spaceman />
    </AppView>
  );
}
