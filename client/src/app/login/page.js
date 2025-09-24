"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
// import axios from "axios";
import API from "@/lib/api";

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const [OtpForCheck, setOtpForCheck] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [hideForm, setHideForm] = useState(false);

  const [OTPNumber, setOTPNumber] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (OTPNumber == OtpForCheck) {
      if (!loginForm.email || !loginForm.password || !loginForm.phone) {
        toast.error("Please fill in all fields");
        return;
      }

      setIsLoading(true);

      dispatch(loginUser(loginForm))
        .unwrap()
        .then((res) => {
          toast.success("Login Successful");

          const role = res?.user?.role?.toLowerCase();

          if (role === "admin") {
            router.push("/admin");
          } else if (role === "user") {
            router.push("/user");
          } else {
            toast.warn("Unknown role, redirecting to home");
            router.push("/");
          }
        })
        .catch((err) => {
          toast.error(err || "Login failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.warn("Wrong OTP Please Fill the Currect OTP ?");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const generateOTP = async (e) => {
    e.preventDefault();
    setHideForm(true);
    const res = await API.post("/getOTP", loginForm);
    if (res?.data?.status) {
      toast.success("OTP send to you number please check your sms.");
      setOTPNumber(res?.data?.Data);
    }
    // console.log(res);
  };

  const resendOTP = async () => {
    const res = await API.post("/getOTP/resend", {
      phone: loginForm.phone,
      OTPNumber,
    });
    if (res?.data?.status) {
      toast.success("OTP resend to you number again please check your sms.");
      setOTPNumber(res?.data?.Data);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {!hideForm ? (
              <form onSubmit={generateOTP}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter Phone Number"
                      value={loginForm.phone}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              <div>
                <div>
                  <input
                    onChange={(e) => setOtpForCheck(e.target.value)}
                    type="text"
                    placeholder="Enter OTP here"
                    className="border rounded p-2 mb-2"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleLogin}
                    className="bg-green-700 text-white p-2"
                  >
                    Confirm OTP
                  </button>
                  <button
                    onClick={resendOTP}
                    className="bg-blue-700 text-white p-2"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="px-8 py-4 bg-gray-50 text-center">
            <p className="text-gray-600 text-sm">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
