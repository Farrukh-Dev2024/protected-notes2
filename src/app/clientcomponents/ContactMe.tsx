'use client'
import * as React from 'react';
import Image from 'next/image';
import AuthorPic from "@/assets/author3.png"
import { frame, motion } from 'motion/react';
import "@/app/extraanimations.css";


const ContactMe: React.FunctionComponent = () => {
  const techlist: string[] = [
    "ReactJs", "NextJs", "TailWindCss", "TypeScript", "ModernTheming", "Prisma",
    "ShadCN", "BcryptJs", "Motion", "AuthJs", "Zod", "Web-Push"
  ];

  return (
    <>
      <motion.div className="w-full overflow-x-hidden px-4 flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <h1 className="text-4xl font-bold mb-20 text-center">Contact Me</h1>

        <div className="flex flex-col md:flex-row flex-wrap items-start justify-evenly w-full">
          {/* Image Block */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            className="mb-10 bg-[url('/bg.png')] bg-cover bg-center rounded-xl shadow-lg shadow-black/50 dark:shadow-white/50 transition-all duration-500 ease-in-out"
          >
            <Image src={AuthorPic} alt="Author" className="rounded-xl w-64 h-70" />
          </motion.div>

          {/* Text Block */}
          <div className="space-y-6 w-full max-w-md">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-bold break-words bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg animate-rainbow">
                Farrukh Aleem
                <span className="text-black dark:text-white animate-blink"> | </span>
              </p>
              <div className="mt-1 h-[4px] w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-600 rounded-full animate-rainbow"></div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-bold break-words bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg animate-rainbow">
                Email:
                    <span className="block extraanimated bounce-in text-black dark:text-white p-2 break-words max-w-full">
                        <a href="mailto:farrukhaleem.dev2024@gmail.com" className="hover:underline break-words">
                        farrukhaleem.dev2024@gmail.com
                        </a>
                    </span>

              </p>
              <div className="mt-1 h-[4px] w-full bg-gradient-to-r from-green-400 via-blue-400 to-indigo-500 rounded-full animate-rainbow"></div>
            </motion.div>

            {/* What I Can Do For You */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-xl font-semibold mt-6 mb-2 underline underline-offset-4">
                What I Can Do For You:
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-lg font-medium">
                <li className="hover:translate-x-2 transition-transform duration-300 bg-gradient-to-r from-red-400 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow animate-rainbow">
                  Build modern, responsive websites using React and Next.js
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow animate-rainbow">
                  Create full-stack web apps with backend support (Node.js, Prisma)
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow animate-rainbow">
                  Integrate APIs, databases, auth systems, and elegant UI with Tailwind & Shadcn
                </li>
              </ol>
              <p className="mt-4 text-xs flex flex-wrap">
                {techlist.map((tech, index) => (
                  <span key={index} className="bg-amber-200 border rounded-lg m-1 px-2 py-0.5 text-xs">
                    {tech}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-rainbow {
          animation: rainbow 6s linear infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </>
  );
};

export default ContactMe;
