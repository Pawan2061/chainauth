import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { useRouter } from "next/navigation";

function DefaultDemo() {
  const router = useRouter();
  return <AnimatedText text="Onchain Auth!" className="cursor-pointer" />;
}

function CustomStyleDemo() {
  return (
    <AnimatedText
      text="Namaste World!"
      textClassName="text-5xl font-bold mb-2"
      underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
      underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
      underlineDuration={1.5}
    />
  );
}

export { DefaultDemo, CustomStyleDemo };
