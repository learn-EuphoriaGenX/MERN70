import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

function Login() {

  let myRef = useRef()
  let navigate = useNavigate()

  function handleClick(e) {
    if (myRef.current && !myRef.current.contains(e.target)) {
      navigate("/")
    }
  }

  let [data, setData] = useState({
    email: "",
    password: ""
  })


  function handleSubmit(e) {
    e.preventDefault()

    if (!data.email || !data.password) {
      toast.error("Please fill all the fields")
      return
    }
    toast.success("Login successfully!")
    navigate("/")

    console.log(data)
  }

  return (
    <div onClick={handleClick} className="fixed  inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

      {/* Login Card */}
      <div ref={myRef} className="w-full max-w-md rounded-2xl bg-[#0E1113] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-white">
            Log In
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm 
              focus:outline-none focus:ring-0 text-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm 
              focus:outline-none focus:ring-0 text-orange-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold 
            text-white hover:bg-orange-600 transition"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-full bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px w-full bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-full border 
            border-gray-300 py-3 text-sm text-white hover:text-black font-medium hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-full border 
            border-gray-300 py-3 text-sm text-white hover:text-black font-medium hover:bg-gray-100 transition"
          >
            Continue with Apple
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-4">
            New to Thoughts?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
