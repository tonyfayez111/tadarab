"use client";
import React, { useState } from "react";
import footerlogo from "@/public/images/footerlogo.png";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, remember });
    // You can add your authentication logic here
  };

  return (
    <div className="relative min-h-screen bg-[#191D25] flex flex-col items-center p-6">
      {/* Glow Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-10 w-[320px] h-[320px] rounded-full [background:#25D5AB1A] blur-3xl" />
        <div className="absolute -bottom-32 left-10 w-[280px] h-[280px] rounded-full [background:#29295122] blur-3xl" />
      </div>

      {/* Centered Logo at Top */}
      <div className="z-10 mt-8 mb-6">
        <img src={footerlogo.src} alt="logo" className="h-16 w-auto" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md z-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8" dir="rtl">
            <div className="text-white text-lg sm:text-xl font-extrabold text-center mb-6">
              تسجيل الدخول
            </div>

            <p className="text-[#B0B0BA] mb-6 text-sm sm:text-base text-center">
              أهلاً بك! الرجاء إدخال بيانات حسابك للمتابعة.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#B0B0BA] text-sm mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl bg-white/10 focus:bg-white/15 text-white placeholder:text-[#B0B0BA] border border-white/10 focus:border-[#25D5AB] outline-none px-4 py-3 transition"
                />
              </div>

              <div>
                <label className="block text-[#B0B0BA] text-sm mb-1">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/10 focus:bg-white/15 text-white placeholder:text-[#B0B0BA] border border-white/10 focus:border-[#25D5AB] outline-none px-4 py-3 pr-12 transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0BA] hover:text-white"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M3.28 2.22 21.78 20.72l-1.06 1.06-2.23-2.23A12.64 12.64 0 0 1 12 19c-7 0-10-7-10-7a17.33 17.33 0 0 1 4.27-5.38L2.22 3.28 3.28 2.22Zm6.7 6.7A5 5 0 0 0 7 12a5 5 0 0 0 7.72 4.12l-5.74-5.2ZM12 5c7 0 10 7 10 7a17.18 17.18 0 0 1-3.56 4.74l-1.43-1.43A12.66 12.66 0 0 0 22 12s-3-7-10-7c-1.08 0-2.08.16-3 .44l1.34 1.23C10.05 5.54 11 5 12 5Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[#B0B0BA] text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-[#292951] h-4 w-4 rounded"
                  />
                  تذكرني
                </label>
                <a href="#" className="text-sm text-[#25D5AB] hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#292951] hover:bg-[#24264a] text-white font-bold py-3 transition focus:outline-none focus:ring-2 focus:ring-[#25D5AB] focus:ring-offset-0"
              >
                دخول
              </button>

              <div className="flex items-center gap-3 text-[#B0B0BA]">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs">أو</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <p className="text-center text-[#B0B0BA] text-sm">
                ليس لديك حساب؟{" "}
                <a
                  href="#"
                  className="text-[#25D5AB] hover:underline font-bold"
                >
                  إنشاء حساب
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
