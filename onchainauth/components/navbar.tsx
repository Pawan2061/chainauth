import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { ShinyButton } from "./ui/shiny-button";

export default function Navbar() {
  return (
    <nav className="flex justify-between  p-5">
      <div>1</div>
      <div>
        <ShinyButton children="get in" />
      </div>
    </nav>
  );
}
