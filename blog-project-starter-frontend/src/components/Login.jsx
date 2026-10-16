import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, seterr] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate('/home')
        
      } 


    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login process

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        navigate("/Blogs");
      })
      .catch(() => {
        console.log("error in signing in");
        seterr(true);
      });
  };

  return (
  <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F5F0] px-4 py-8 text-[#111111] sm:px-6 sm:py-12">

    {/* Decorative background elements */}
    <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 border-[30px] border-[#D9F36A] opacity-60 sm:h-80 sm:w-80" />

    <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rotate-12 border-2 border-black sm:h-72 sm:w-72" />

    {/* LOGIN CARD */}
    <form
      onSubmit={handleLogin}
      className="relative z-10 w-full max-w-md border-2 border-black bg-white p-5 shadow-[6px_6px_0px_#111111] transition-shadow duration-300 hover:shadow-[8px_8px_0px_#111111] sm:p-8 md:p-10"
    >

      {/* BRAND */}
      <div className="mb-8 flex items-center justify-between gap-3 border-b-2 border-black pb-5">

        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Personal<span className="text-gray-400">.</span>
        </h1>

        <span className="border-2 border-black bg-[#D9F36A] px-3 py-2 text-[10px] font-black uppercase tracking-widest sm:text-xs">
          Welcome Back
        </span>

      </div>


      {/* HEADING */}
      <div className="mb-8">

        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-gray-500">
          Your account / 01
        </p>

        <h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
          Good to
          <br />
          have you
          <br />
          <span className="text-gray-400">back.</span>
        </h2>

        <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
          Sign in to continue your journey and explore the latest blogs.
        </p>

      </div>


      {/* EMAIL */}
      <div className="mb-5">

        <label
          htmlFor="login-email"
          className="mb-2 block text-xs font-black uppercase tracking-widest"
        >
          Email Address
        </label>

        <input
          id="login-email"
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
          htmlFor="login-password"
          className="mb-2 block text-xs font-black uppercase tracking-widest"
        >
          Password
        </label>

        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
        />

      </div>


      {/* ERROR MESSAGE */}
      {err && (
        <p
          role="alert"
          aria-live="polite"
          className="my-4 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
        >
          Error signing in. Please check your credentials and try again.
        </p>
      )}


      {/* REGISTER LINK */}
      <p className="my-6 text-sm text-gray-600">

        Don't have an account?

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="ml-1 font-black text-black underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-gray-500"
        >
          Register here ↗
        </button>

      </p>


      {/* LOGIN BUTTON */}
      <button
        type="submit"
        className="group flex w-full items-center justify-between border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:text-black hover:shadow-[5px_5px_0px_#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >

        <span>Sign In</span>

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
          01 / AUTH
        </span>

      </div>

    </form>

  </div>
);
}

export default Login;
