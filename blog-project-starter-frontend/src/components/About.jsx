import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";
function About() {
  const navigate = useNavigate();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/saik2004",
      icon: "⌘",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dev.sai_/",
      icon: "↗",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/2004saikumar/",
      icon: "in",
    },
    {
      name: "Portfolio",
      href: "https://portfolio-seven-alpha-20.vercel.app/",
      icon: "↗",
    },
  ];

  return (
    <>
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-[#111111]">
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        {/* Section Label */}
        <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
          01 — A little about me
        </p>

        {/* About Heading */}
        <h1 className="mb-8 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          About <span className="text-[#8BAA24]">Me.</span>
        </h1>

        {/* Introduction */}
        <div className="max-w-3xl border-l-4 border-black pl-5 sm:pl-8">
          <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
            I'm <span className="font-black text-black">Sai Kumar</span>, an
            aspiring full-stack developer who enjoys turning ideas into
            functional web applications. I build applications with React, JavaScript,
            Node.js, Express, and MongoDB, while continuously improving my
            skills through hands-on projects.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
            I believe the best way to learn development is to build real things,
            solve problems, and understand why the code works — not just make it
            work.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-16 border-t-2 border-black pt-8 sm:mt-20 sm:pt-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
            02 — Let's connect
          </p>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Get In Touch<span className="text-[#8BAA24]">.</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
            Interested in collaborating, discussing a project, or connecting
            about a development opportunity? Find me here.
          </p>

          {/* Social Links */}
          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 border-2 border-black bg-white px-4 py-3 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:shadow-[4px_4px_0px_#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-5 sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center text-sm font-black"
                >
                  {link.icon}
                </span>

                <span>{link.name}</span>

                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Availability Note */}
          <div className="mt-12 flex flex-col gap-3 border-2 border-black bg-[#F5F5F0] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="text-lg font-black sm:text-xl">
                Have something in mind?
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Let's discuss your idea and explore how I can help.
              </p>
            </div>

            <a
              href="mailto:YOUR_EMAIL@example.com?subject=Project%20Inquiry"
              onClick={() => {
                navigate("/contactform");
              }}
              className="inline-flex w-fit shrink-0 items-center gap-3 border-2 border-black bg-[#D9F36A] px-4 py-3 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#111111]"
            >
              Hire Me <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}

export default About;
