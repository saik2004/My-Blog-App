import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook from React Router for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        navigate('/login')
      })
      .catch(() => {
        console.log("failed to create account");
      });
    // Simulate user registration process
    console.log("User registered:", { email, password });
    // After registration, redirect to the login page
    navigate("/login"); // Replace '/login' with your login page route
  };

  return (
  <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F5F5F0] px-4 py-8 text-[#111111] sm:px-6 sm:py-12">

    {/* DECORATIVE SHAPES */}
    <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 border-[24px] border-[#D9F36A] opacity-60 sm:h-72 sm:w-72" />

    <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rotate-12 border-2 border-black sm:h-72 sm:w-72" />


    {/* SIGNUP CARD */}
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-md border-2 border-black bg-white p-5 shadow-[6px_6px_0px_#111111] transition-shadow duration-300 hover:shadow-[8px_8px_0px_#111111] sm:p-8 md:p-10"
    >

      {/* BRAND */}
      <div className="mb-7 flex items-center justify-between gap-3 border-b-2 border-black pb-5">

        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Personal<span className="text-gray-400">.</span>
        </h1>

        <span className="border-2 border-black bg-[#D9F36A] px-3 py-2 text-[10px] font-black uppercase tracking-widest sm:text-xs">
          Join Us
        </span>

      </div>


      {/* HEADING */}
      <div className="mb-7">

        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-gray-500">
          Create your account / 02
        </p>

        <h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
          Your story
          <br />
          starts
          <br />
          <span className="text-gray-400">here.</span>
        </h2>

        <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
          Create your account and join the community to explore and share ideas.
        </p>

      </div>


      {/* EMAIL */}
      <div className="mb-5">

        <label
          htmlFor="signup-email"
          className="mb-2 block text-xs font-black uppercase tracking-widest"
        >
          Email Address
        </label>

        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
        />

      </div>


      {/* PASSWORD */}
      <div className="mb-5">

        <label
          htmlFor="signup-password"
          className="mb-2 block text-xs font-black uppercase tracking-widest"
        >
          Password
        </label>

        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          autoComplete="new-password"
          required
          className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
        />

      </div>


      {/* CONFIRM PASSWORD */}
      <div className="mb-5">

        <label
          htmlFor="signup-confirm-password"
          className="mb-2 block text-xs font-black uppercase tracking-widest"
        >
          Confirm Password
        </label>

        <input
          id="signup-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter your password again"
          autoComplete="new-password"
          required
          className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
        />

        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="mt-3 border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
          >
            {error}
          </p>
        )}

      </div>


      {/* LOGIN LINK */}
      <p className="my-6 text-sm text-gray-600">

        Already have an account?

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="ml-1 font-black text-black underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-gray-500"
        >
          Login here ↗
        </button>

      </p>


      {/* REGISTER BUTTON */}
      <button
        type="submit"
        className="group flex w-full items-center justify-between border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:text-black hover:shadow-[5px_5px_0px_#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >

        <span>Create Account</span>

        <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>

      </button>


      {/* FOOTER LABEL */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-black pt-5">

        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Personal Platform
        </span>

        <span className="text-xs font-black">
          02 / AUTH
        </span>

      </div>

    </form>

  </div>
);
}

export default Signup;
