import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import favicon from "/favicon.ico";

import heroEye from "@/assets/hero-eye.png";

import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";


// Marquee text
const logos = ["CHINMAY", "JAVA", "SPRING BOOT", "FULL STACK"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const text = "CHINMAY";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  // Hide welcome screen after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  // Control page scrolling
  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // CHINMAY typing animation
  useEffect(() => {
    setDisplayed("");

    let i = 0;

    function type() {
      setDisplayed(text.slice(0, i + 1));

      i++;

      if (i < text.length) {
        setTimeout(type, 200);
      }
    }

    type();
  }, []);

  return (
    <Routes>

      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-black text-white overflow-x-hidden">

            {/* Welcome Animation */}
            <AnimatePresence>
              {showWelcome && <WelcomeScreen />}
            </AnimatePresence>


            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-black/20 border-b border-white/10">

              {/* Logo / Name */}
              <div className="flex items-center gap-3">

                <img
                  src={favicon}
                  alt="Chinmay Pawar Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />

                <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/70 uppercase font-medium">
                  CHINMAY · DEVELOPER
                </span>

              </div>


              {/* Desktop Navigation */}
              <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest text-white/70 uppercase">

                <li
                  onClick={() =>
                    document.getElementById("Home")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Home
                </li>


                <li
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  About
                </li>


                <li
                  onClick={() =>
                    document.getElementById("showcase")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Projects
                </li>


                <li
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact
                </li>

              </ul>


              {/* Desktop Clock */}
              <div className="hidden md:block text-[10px] tracking-[0.3em] text-white/70 uppercase">
                {time}
              </div>


              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden text-white z-50"
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>

            </nav>


            {/* MOBILE MENU */}
            {mobileMenu && (
              <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-white uppercase tracking-[0.3em] text-sm md:hidden">

                <div className="absolute top-30 text-center">

                  <p className="text-[10px] text-white/40 tracking-[0.3em] mb-2">
                    TIME
                  </p>

                  <h2 className="text-2xl tracking-widest font-semibold">
                    {time}
                  </h2>

                </div>


                <button
                  onClick={() => {
                    document.getElementById("Home")?.scrollIntoView({
                      behavior: "smooth",
                    });

                    setMobileMenu(false);
                  }}
                  className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                >
                  Home
                </button>


                <button
                  onClick={() => {
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                    });

                    setMobileMenu(false);
                  }}
                  className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                >
                  About
                </button>


                <button
                  onClick={() => {
                    document.getElementById("showcase")?.scrollIntoView({
                      behavior: "smooth",
                    });

                    setMobileMenu(false);
                  }}
                  className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                >
                  Projects
                </button>


                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    });

                    setMobileMenu(false);
                  }}
                  className="relative after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                >
                  Contact
                </button>

              </div>
            )}


            {/* HERO SECTION */}
            <section
              id="Home"
              className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black"
            >

              {/* Hero Image */}
              <div className="absolute inset-0 flex items-center justify-center">

                <img
                  src={heroEye}
                  alt="Chinmay Pawar"
                  className="h-[90%] w-[90%] object-contain object-center"
                />

              </div>


              <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">

                {/* Main Name */}
                <h1
                  onClick={() =>
                    setColorMode((prev) => (prev + 1) % colors.length)
                  }
                  className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[22vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
                >
                  {displayed || "\u00A0"}
                </h1>


                {/* Right Hero Heading */}
                <p
                  className="md:absolute md:top-28 md:right-12
                  mt-4 md:mt-0
                  text-right
                  text-3xl md:text-4xl lg:text-5xl
                  leading-[1.05]
                  max-w-md
                  font-[Poppins] font-bold
                  tracking-wide
                  text-transparent bg-clip-text
                  bg-[length:200%_auto]
                  bg-gradient-to-r
                  from-white via-white/60 to-white
                  animate-[shine_4s_linear_infinite]"
                >
                  Building
                  <br />
                  Scalable
                  <br />
                  Digital
                  <br />
                  Experiences.
                </p>


                {/* Bottom Content */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">

                  {/* Description */}
                  <p
                    className="relative text-sm sm:text-base lg:text-xl
                    leading-relaxed max-w-md
                    font-[Poppins] font-medium
                    tracking-wide
                    text-transparent bg-clip-text
                    bg-[length:200%_auto]
                    bg-gradient-to-r
                    from-white via-white/60 to-white
                    animate-[shine_4s_linear_infinite]"
                  >
                    Java & Full Stack Developer building{" "}
                    <br />

                    <em className="not-italic text-white">
                      scalable applications and modern web experiences.
                    </em>
                  </p>


                  {/* Resume / GitHub button - temporary */}
                  <a
                    href="https://github.com/Chinmay1-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                      GITHUB
                      <ArrowUpRight size={16} />
                    </button>
                  </a>

                </div>

              </div>

            </section>


            {/* MARQUEE */}
            <div className="bg-black border-t border-white/10 py-5 overflow-hidden">

              <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">

                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <span
                    key={i}
                    className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium"
                  >
                    {logo}
                  </span>
                ))}

              </div>

            </div>


            {/* Marquee Animation */}
            <style>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }

                100% {
                  transform: translateX(-33.333%);
                }
              }

              .animate-marquee {
                animation: marquee 10s linear infinite;
              }
            `}</style>


            {/* ABOUT */}
            <section id="about">
              <FrontendDeveloperSection />
            </section>


            {/* PROJECTS */}
            <section id="showcase">
              <Showcase />
            </section>


            {/* CONTACT */}
            <section id="contact">
              <ContactSection />
            </section>

          </div>
        }
      />


      {/* ABOUT ROUTE */}
      <Route path="/about" element={<About />} />

    </Routes>
  );
}