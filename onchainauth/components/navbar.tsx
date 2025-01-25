import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { ShinyButton } from "./ui/shiny-button";
import { DefaultDemo } from "./ui/text-demo";

export default function Navbar() {
  return (
    <nav className="flex justify-between  p-5">
      <DefaultDemo />{" "}
      {/* <div>
        <ShinyButton children="get in" />
      </div> */}
    </nav>
  );
}
