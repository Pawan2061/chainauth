"use client";

import CursorTrailCanvas from "./ui/cursor-trail";
import Particles from "./ui/particles";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <CursorTrailCanvas
        color="#14213d"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </div>
  );
}
