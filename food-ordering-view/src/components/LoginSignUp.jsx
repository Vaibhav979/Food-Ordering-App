import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (action === "Sign Up") {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          setSubmitting(false);
          return;
        }
        const res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });

        if (res.ok) {
          toast.success("Signup successful! Please log in.");
          setAction("Login");
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
        } else {
          const err = await res.json();
          toast.error(err.message || "Signup failed");
        }
      } else {
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("token", data.token);
          toast.success("Login successful! Redirecting...");
          setTimeout(() => (window.location.href = "/home"), 1500);
        } else {
          const err = await res.json();
          toast.error(err.message || "Invalid credentials");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-48 w-[600px] bg-white pb-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mt-8 w-full">
        <div className="text-purple-900 text-4xl font-bold">{action}</div>
        <div className="w-16 h-1.5 bg-purple-900 rounded-lg"></div>
      </div>

      {/* Inputs */}
      <form className="flex flex-col gap-6 mt-14" onSubmit={handleSubmit}>
        {action === "Sign Up" && (
          <div className="flex items-center mx-auto w-[480px] h-20 bg-gray-200 rounded-md">
            <img src={user_icon} alt="" className="mx-8" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="h-12 w-full bg-transparent outline-none text-gray-600 text-lg"
              required
            />
          </div>
        )}

        <div className="flex items-center mx-auto w-[480px] h-20 bg-gray-200 rounded-md">
          <img src={email_icon} alt="" className="mx-8" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="h-12 w-full bg-transparent outline-none text-gray-600 text-lg"
            required
          />
        </div>

        <div className="flex items-center mx-auto w-[480px] h-20 bg-gray-200 rounded-md">
          <img src={password_icon} alt="" className="mx-8" />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="h-12 w-full bg-transparent outline-none text-gray-600 text-lg"
            required
          />
        </div>

        {action === "Sign Up" && (
          <div className="flex items-center mx-auto w-[480px] h-20 bg-gray-200 rounded-md">
            <img src={password_icon} alt="" className="mx-8" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="h-12 w-full bg-transparent outline-none text-gray-600 text-lg"
              required
            />
          </div>
        )}

        {action === "Login" && (
          <div className="pl-16 mt-6 text-gray-500 text-lg">
            Lost Password?{" "}
            <span className="text-purple-700 cursor-pointer">Click Here!</span>
          </div>
        )}

        <button
          type="submit"
          className="mx-auto mt-6 w-56 h-14 flex justify-center items-center bg-purple-700 text-white rounded-full text-lg font-bold hover:bg-purple-800 disabled:bg-gray-300 disabled:text-gray-600"
          disabled={submitting}
        >
          {submitting ? "Processing..." : action}
        </button>
      </form>

      {/* Switch buttons */}
      <div className="flex gap-8 mx-auto mt-16">
        <div
          className={`flex justify-center items-center w-56 h-14 rounded-full text-lg font-bold cursor-pointer ${
            action === "Login"
              ? "bg-gray-200 text-gray-600"
              : "bg-purple-700 text-white"
          }`}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={`flex justify-center items-center w-56 h-14 rounded-full text-lg font-bold cursor-pointer ${
            action === "Sign Up"
              ? "bg-gray-200 text-gray-600"
              : "bg-purple-700 text-white"
          }`}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default LoginSignUp;
