import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="flex items-center justify-center h-[200px] w-full">
      <GooeyText
        texts={["Onchain", "Auth", "Is", "Awesome"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold text-4xl text-white"
      />
    </div>
  );
}

export { GooeyTextDemo };
