// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Brain } from "lucide-react";
// import { useAuth } from "@/components/layout/AuthProvider";

// const LoginPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { isAuthenticated, isAuthLoading, setIsAuthenticated } = useAuth();
//   const router = useRouter();

//   // If already logged in, redirect to /home
//   useEffect(() => {
//     if (!isAuthLoading && isAuthenticated) {
//       router.replace("/home");
//     }
//   }, [isAuthenticated, isAuthLoading, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Email and password are required!");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("http://20.92.226.217:8000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const currentTime = new Date().getTime().toString();

//         sessionStorage.setItem("authToken", data.token || data.access_token);
//         sessionStorage.setItem("loginTime", currentTime);
//         sessionStorage.setItem("userEmail", email);

//         window.dispatchEvent(new Event("storage")); // sync tabs
//         setIsAuthenticated(true);

//         router.replace("/home");
//       } else {
//         const errorData = await response.json();
//         setError(errorData.detail || "Login failed");
//       }
//     } catch {
//       setError("Error connecting to the server");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !isLoading) {
//       handleSubmit(e as any);
//     }
//   };

//   if (isAuthLoading || isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
//             <Brain className="w-8 h-8 text-white" />
//           </div>
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
//           <p className="text-gray-400">
//             {isAuthenticated ? "Redirecting..." : "Checking authentication..."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
//                 <Brain className="w-8 h-8 text-white" />
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
//               YaaraLabs
//             </h1>

//             <h2 className="text-xl font-semibold text-white mb-2">
//               Welcome Back
//             </h2>

//             <p className="text-gray-400">Sign in to your account</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg">
//               <p className="text-red-300 text-sm">{error}</p>
//             </div>
//           )}

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:bg-gray-750"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:bg-gray-750"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   Signing in...
//                 </>
//               ) : (
//                 <>
//                   Sign In
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-400">
//               Don't have an account yet?{" "}
//               <button className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
//                 Sign up
//               </button>
//             </p>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-500 text-sm">
//               © 2025 YaaraLabs • All rights reserved
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
