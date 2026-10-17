import React, { useState } from "react";

import { useEffect } from "react";

import DB from "../assets/data-server.png";
import REACTICON from "../assets/physics.png";
import NODE from "../assets/node-js.png";
import BlogImage from "../assets/blogImage.png";
import myimages from "../assets/my-image.png";
import auth from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";

// TECHNOLOGIES
const technologies = [
  {
    name: "React",
    icon: REACTICON,
    type: "image",
  },
  {
    name: "Node.js",
    icon: NODE,
    type: "image",
  },
  {
    name: "Express",
    symbol: "Ex",
    type: "text",
  },
  {
    name: "MongoDB",
    icon: DB,
    type: "image",
  },
  {
    name: "Firebase",
    symbol: "Fb",
    type: "text",
  },
  {
    name: "Payment Integrations",
    symbol: "₹",
    type: "text",
  },
];

// PROJECTS
// Add your project images and live links here.

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "Add your project description here.",
    image: null,
    technologies: ["React", "Tailwind CSS"],
    liveLink: "",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Add your project description here.",
    image: null,
    technologies: ["Node.js", "Express", "MongoDB"],
    liveLink: "",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Add your project description here.",
    image: null,
    technologies: ["React", "Firebase"],
    liveLink: "",
  },
];

function Home() {
  const navigate = useNavigate();
  const [readblog,setreadblog] = useState(false)

  useEffect(() => {
    try {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log("logged in");
          setreadblog(true)
        } else {
          setreadblog(false)
          console.log("logged out");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-[#111111]">
      {/* HERO SECTION */}

      <section className="w-full px-4 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* HERO CONTENT */}

          <div className="w-full min-w-0 md:w-[55%]">
            <div className="mb-6 inline-flex max-w-full items-center gap-3 border-2 border-black px-3 py-2 sm:px-4">
              <span className="h-3 w-3 shrink-0 bg-green-500"></span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]">
                Available for opportunities
              </span>
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-gray-500 sm:text-base sm:tracking-widest">
              Hello, welcome to my space.
            </p>

            <h2 className="text-[clamp(2.75rem,8vw,6.25rem)] font-black leading-[0.95] tracking-[-0.04em]">
              Hy! I Am
            </h2>

            <h2 className="mt-3 text-[clamp(2.75rem,8vw,6.25rem)] font-black leading-[0.95] tracking-[-0.04em]">
              <span className="underline decoration-4 underline-offset-8">
                Sai
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8">
              I can create stunning website for your company, Do check my works.
              I won't disappoint you.{" "}
            </p>
            <a
              href="https://portfolio-seven-alpha-20.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 md:ml-3 lg:ml-3 inline-flex items-center gap-3 border-2 border-black bg-white px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3  text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:shadow-[4px_4px_0px_#111111]"
            >
              <span>Explore My Portfolio</span>
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
              <button className="group inline-flex items-center border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F5F0] hover:text-black hover:shadow-[5px_5px_0px_#111111] sm:px-7">
                Hire Me
              </button>

              <span className="text-sm font-semibold text-gray-500">
                Develop. Deliver.
              </span>
            </div>
          </div>

          {/* HERO IMAGE */}

          <div className="relative mt-2 w-full max-w-md self-center md:mt-0 md:w-[40%] md:max-w-none md:self-auto">
            <div className="absolute -right-2 -top-2 h-full w-full border-2 border-black sm:-right-4 sm:-top-4"></div>

            <div className="relative border-2 border-black bg-white p-2 sm:p-3">
              <img
                src={myimages}
                className="block aspect-[4/3] w-full object-cover sm:aspect-[3/4]"
                alt="Blog Profile"
              />

              <div className="mt-3 flex items-center justify-between gap-2 border-t-2 border-black pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs">
                  Personal Showcase
                </span>

                <span className="shrink-0 text-sm font-black sm:text-xl">
                  01 / 04
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 flex h-12 w-12 items-center justify-center border-2 border-black bg-[#D9F36A] text-2xl font-black sm:-bottom-5 sm:-left-5 sm:h-16 sm:w-16 sm:text-3xl">
              +
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}

      <section className="w-full border-y-2 border-black bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] sm:tracking-[0.25em]">
              Technologies I work with
            </p>

            <span className="text-[10px] font-semibold text-gray-400 sm:text-xs">
              MY TECH STACK — 06
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="group flex min-h-24 min-w-0 flex-col items-center justify-center gap-3 border-2 border-transparent px-2 py-4 transition-all duration-200 hover:border-black hover:bg-[#F5F5F0] hover:shadow-[3px_3px_0px_#111111] sm:min-h-28"
              >
                {tech.type === "image" ? (
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center border-2 border-black bg-[#D9F36A] text-lg font-black sm:h-11 sm:w-11">
                    {tech.symbol}
                  </div>
                )}

                <span className="text-center text-[10px] font-bold uppercase tracking-wide sm:text-xs">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="w-full px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
            {/* SERVICES INTRO */}

            <div className="min-w-0">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-gray-500 sm:tracking-[0.25em]">
                01 — What I do
              </p>

              <h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                My Awesome
                <br />
                <span className="text-gray-400">Services.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                Turning ideas into functional, responsive web applications with
                modern frontend and backend technologies.
              </p>

              <button className="group mt-7 inline-flex items-center border-2 border-black px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-white sm:mt-8 sm:px-7">
                Download CV
                <span className="ml-3 inline-block transition-transform duration-200 group-hover:translate-y-1">
                  ↓
                </span>
              </button>
            </div>

            {/* SERVICE CARDS */}

            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5">
              {/* Frontend Card */}
              <div className="group min-w-0 border-2 border-black bg-[#D9F36A] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] sm:p-6">
                <span className="text-[10px] font-black uppercase tracking-widest sm:text-xs">
                  01 / Frontend
                </span>

                <div className="my-7 text-4xl font-black sm:my-8 sm:text-5xl">
                  UI<span className="text-black/40">/</span>UX
                </div>

                <div className="border-t-2 border-black pt-4">
                  <h3 className="text-sm font-black sm:text-base">
                    Web Interfaces
                  </h3>

                  <p className="mt-2 text-xs leading-6 sm:text-sm">
                    Responsive interfaces built with React and Tailwind CSS.
                  </p>
                </div>
              </div>

              {/* Backend Card */}
              <div className="group min-w-0 border-2 border-black bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:shadow-[6px_6px_0px_#111111] sm:mt-8 sm:p-6">
                <span className="text-[10px] font-black uppercase tracking-widest sm:text-xs">
                  02 / Backend
                </span>

                <div className="my-7 text-4xl font-black sm:my-8 sm:text-5xl">
                  API<span className="text-gray-300">.</span>
                </div>

                <div className="border-t-2 border-black pt-4">
                  <h3 className="text-sm font-black sm:text-base">
                    Full-Stack Apps
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-600 sm:text-sm">
                    Backend APIs, authentication, databases and integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}

      <section className="w-full border-y-2 border-black bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500 sm:tracking-[0.25em]">
                02 — Selected work
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Checkout My Live
                <br />
                <span className="text-gray-400">Projects Here.</span>
              </h2>
            </div>

            <span className="text-xs font-bold uppercase tracking-widest sm:text-sm">
              {String(projects.length).padStart(2, "0")} Projects ↘
            </span>
          </div>

          {/* PROJECT CARDS */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group flex min-w-0 flex-col border-2 border-black bg-[#F5F5F0] transition-all duration-300 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#111111] sm:hover:-translate-y-2 sm:hover:shadow-[7px_7px_0px_#111111]"
              >
                {/* CARD HEADER */}

                <div className="flex items-center justify-between gap-3 border-b-2 border-black px-4 py-3">
                  <span className="text-[10px] font-black uppercase tracking-widest sm:text-xs">
                    Featured Project
                  </span>

                  <span className="text-sm font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* PROJECT IMAGE */}

                <div className="overflow-hidden p-3">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full border border-black object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-[#ECECE5]">
                      <span className="text-5xl font-black text-gray-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-xs">
                        Project Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* PROJECT DETAILS */}

                <div className="flex flex-1 flex-col px-4 pb-5 sm:px-5">
                  <h3 className="break-words text-lg font-black tracking-tight sm:text-xl">
                    {project.title}
                  </h3>

                  <p className="mt-3 break-words text-sm leading-6 text-gray-600">
                    {project.description}
                  </p>

                  {/* TECHNOLOGY TAGS */}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="max-w-full break-words border border-black px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* LIVE PROJECT LINK */}

                  <div className="mt-6 border-t-2 border-black pt-4">
                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wider transition-colors hover:text-gray-500 sm:text-sm"
                      >
                        <span>View Live Project</span>

                        <span className="text-xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wider text-gray-400 sm:text-sm">
                        <span>Coming Soon</span>

                        <span className="text-xl">↗</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}

      <section className="w-full px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 md:flex-row md:justify-between md:gap-12 lg:gap-16">
          {/* BLOG IMAGE */}

          <div className="relative w-full max-w-md md:w-[42%]">
            <div className="absolute -bottom-3 -left-3 h-full w-full border-2 border-black sm:-bottom-4 sm:-left-4"></div>

            <div className="relative border-2 border-black bg-white p-2 sm:p-3">
              <img
                src={BlogImage}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover sm:aspect-[3/4]"
                alt="Blog Profile"
              />

              <div className="mt-3 flex items-center justify-between gap-2 border-t-2 border-black pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs">
                  Ideas into words
                </span>

                <span className="text-xl font-black">✳</span>
              </div>
            </div>
          </div>

          {/* BLOG INTRO */}

          <div className="w-full min-w-0 md:w-[52%]">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-gray-500 sm:tracking-[0.25em]">
              03 — Thoughts & ideas
            </p>

            <h2 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              I Like to
              <br />
              Write<span className="text-gray-400">.</span>
            </h2>

            <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Blogs about tech<span className="text-gray-400">.</span>
            </h3>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              You can know better about me by reading my blogs here. I share my
              expertise here.
            </p>
            {readblog?<button
              className="group mt-7 inline-flex items-center border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F5F0] hover:text-black hover:shadow-[5px_5px_0px_#111111] sm:mt-8 sm:px-7"
              onClick={() => navigate("/blogs")}
            >
              Read My Blogs
              <span className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>:<button
              className="group mt-7 inline-flex items-center border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F5F0] hover:text-black hover:shadow-[5px_5px_0px_#111111] sm:mt-8 sm:px-7"
              onClick={() => navigate("/login")}
            >
               Login to Read My Blogs
              <span className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
