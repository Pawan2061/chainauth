import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { randomUUID } from "crypto";
type AddPasswordProps = {
  vaults: any[];
  addVault: (vault: {
    id: number;
    name: string;
    owner: string;
    password: string;
  }) => void;
};

export function AddPassword({ vaults, addVault }: AddPasswordProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!key || !value) {
      alert("Key and Password cannot be empty!");
      return;
    }
    // vaults.push({
    //   id: 24,
    //   name: key,
    //   password: value,
    // });

    const newVault = {
      id: 322,
      name: key,
      owner: "kiran",
      password: value,
    };
    addVault(newVault);

    console.log(vaults, "vaults are heere");
    setKey("");
    setValue("");

    console.log("Submitted:", { key, value });
    // Add your deployment logic here
  };

  return (
    <Card className="w-[350px] z-40">
      <CardHeader>
        <CardTitle>Add a new Password</CardTitle>
        <CardDescription>
          Deploy your new Password in solana chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                placeholder="Enter your key value"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                placeholder="Enter your Password value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Deploy
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="text-black"
          onClick={() => {
            setKey("");
            setValue("");
          }}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
