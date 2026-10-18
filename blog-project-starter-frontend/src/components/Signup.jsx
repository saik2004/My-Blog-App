import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, trimmedEmail, password);

      // Navigate only after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please log in.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters long.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        default:
          setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F5F5F0] px-4 py-8 text-[#111111] sm:px-6 sm:py-12">
      {/* DECORATIVE SHAPES */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 border-[24px] border-[#D9F36A] opacity-60 sm:h-72 sm:w-72" />

      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rotate-12 border-2 border-black sm:h-72 sm:w-72" />

      {/* SIGNUP CARD */}
      <form
        onSubmit={handleSubmit}
        noValidate
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
            Create your account and join the community to explore and share
            ideas.
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
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={6}
            required
            aria-describedby="password-requirement"
            className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
          />

          {/* CLEAR PASSWORD REQUIREMENT */}
          <div
            id="password-requirement"
            className="mt-3 flex items-start gap-3 border-2 border-black bg-[#D9F36A] p-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-white text-sm font-black">
              !
            </span>

            <div>
              <p className="text-sm font-black uppercase tracking-wide">
                Password Requirement
              </p>

              <p className="mt-1 text-sm font-bold leading-6 text-black">
                Your password MUST contain at least 6 characters.
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-700">
                Passwords shorter than 6 characters will not be accepted.
              </p>
            </div>
          </div>
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password again"
            autoComplete="new-password"
            minLength={6}
            required
            className="w-full min-w-0 border-2 border-black bg-[#F5F5F0] px-4 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#D9F36A] focus:ring-offset-1"
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="mb-5 border-l-4 border-red-500 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600"
          >
            {error}
          </p>
        )}

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
          disabled={loading}
          className="group flex w-full items-center justify-between border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F36A] hover:text-black hover:shadow-[5px_5px_0px_#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow-none"
        >
          <span>{loading ? "Creating Account..." : "Create Account"}</span>

          <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
            {loading ? "..." : "→"}
          </span>
        </button>

        {/* FOOTER LABEL */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-black pt-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Personal Platform
          </span>

          <span className="text-xs font-black">02 / AUTH</span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
