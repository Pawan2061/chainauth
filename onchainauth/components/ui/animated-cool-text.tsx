import React from "react";
import { motion } from "framer-motion";

const Boat = () => (
  <motion.div
    className="absolute z-20"
    style={{
      left: "-100px",
      top: "50%",
      transformOrigin: "bottom center",
    }}
    animate={{
      x: ["0vw", "100vw"],
      rotate: [-3, 3, -3],
      y: [-5, 5, -5],
    }}
    transition={{
      x: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      },
      rotate: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
      y: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <div className="w-16 h-6 bg-slate-700 rounded-b-xl">
      {" "}
      {/* Boat base */}
      {/* Stick Figure */}
      <div className="absolute -top-8 left-2">
        {/* Head */}
        <div className="w-3 h-3 bg-slate-800 rounded-full" />
        {/* Body */}
        <div className="w-0.5 h-4 bg-slate-800 mx-auto" />
        {/* Left Arm (down) */}
        <div className="absolute top-3 left-1 w-0.5 h-2.5 bg-slate-800 rotate-12" />
        {/* Right Arm (saluting) */}
        <div className="absolute top-3 right-0.5 w-0.5 h-2.5 bg-slate-800 -rotate-45" />
        {/* Legs */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <div className="w-0.5 h-2.5 bg-slate-800 rotate-12 absolute left-0.5" />
          <div className="w-0.5 h-2.5 bg-slate-800 rotate-12 absolute right-0.5" />
        </div>
      </div>
    </div>
    <div className="w-1 h-12 bg-slate-800 absolute -top-12 left-7" />{" "}
    {/* Mast */}
    {/* Waving Indian Flag */}
    <motion.div
      className="w-8 h-10 absolute -top-11 left-8 origin-left overflow-hidden"
      animate={{
        rotate: [-2, 2, -2],
        skewX: [-2, 2, -2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Saffron stripe */}
      <div className="w-full h-[33.33%] bg-[#FF9933]" />

      {/* White stripe with Chakra */}
      <div className="w-full h-[33.33%] bg-white relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
          <div className="w-full h-full rounded-full border-[1.5px] border-[#000080] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[1px] h-full bg-[#000080]"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Green stripe */}
      <div className="w-full h-[33.33%] bg-[#138808]" />
    </motion.div>
  </motion.div>
);

const AnimatedCoolText = () => {
  return (
    <div className="h-64 w-full flex items-center justify-center bg-gradient-to-b from-cyan-100 via-blue-100 to-blue-200 overflow-hidden">
      <div className="relative w-full">
        {/* Caustics light effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="a"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="2"%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation="10" result="blur"%3E%3C/feGaussianBlur%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23a)"%3E%3C/rect%3E%3C/svg%3E")',
            animation: "caustics 10s linear infinite",
          }}
        />

        {/* Above water text */}
        <motion.h1
          className="text-8xl font-bold text-white relative z-10 text-center"
          animate={{
            y: [0, -8, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          OCEAN
        </motion.h1>

        <Boat />

        {/* Wave layers */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 w-full h-24"
            style={{
              background: `linear-gradient(180deg, 
                                rgba(56, 189, 248, ${0.1 - i * 0.02}) 0%,
                                rgba(3, 105, 161, ${0.3 - i * 0.05}) 50%,
                                rgba(1, 65, 255, ${0.4 - i * 0.08}) 100%)`,
            }}
            animate={{
              x: [-200 - i * 100, 200 + i * 100],
              y: [i * 4, -i * 4],
              skewX: [-2, 2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Underwater text */}
        <motion.h1
          className="text-8xl font-bold text-cyan-100/70 absolute top-1/2 w-full text-center"
          style={{
            filter: "url(#water)",
            clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
          }}
          animate={{
            y: [0, 5, 0],
            skewX: [-2, 2, -2],
            filter: ["blur(1px)", "blur(3px)", "blur(1px)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          OCEAN
        </motion.h1>

        {/* Floating bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-200/30"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: "60%",
            }}
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Water distortion filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="water">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.015"
                numOctaves="3"
                seed="2"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="15s"
                  values="0.01 0.015;0.015 0.02;0.01 0.015"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
          </defs>
        </svg>

        <style jsx>{`
          @keyframes caustics {
            from {
              transform: translateX(-50%) translateY(-50%) rotate(0deg);
            }
            to {
              transform: translateX(-50%) translateY(-50%) rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnimatedCoolText;
