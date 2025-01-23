// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { randomUUID } from "crypto";
// type AddPasswordProps = {
//   vaults: any[];
//   addVault: (vault: {
//     id: number;
//     name: string;
//     owner: string;
//     password: string;
//   }) => void;
// };

// export function AddPassword({ vaults, addVault }: AddPasswordProps) {
//   const [key, setKey] = useState("");
//   const [value, setValue] = useState("");

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     if (!key || !value) {
//       alert("Key and Password cannot be empty!");
//       return;
//     }
//     // vaults.push({
//     //   id: 24,
//     //   name: key,
//     //   password: value,
//     // });

//     const newVault = {
//       id: 322,
//       name: key,
//       owner: "kiran",
//       password: value,
//     };
//     addVault(newVault);

//     console.log(vaults, "vaults are heere");
//     setKey("");
//     setValue("");

//     console.log("Submitted:", { key, value });
//     // Add your deployment logic here
//   };

//   return (
//     <Card className="w-[350px] z-40">
//       <CardHeader>
//         <CardTitle>Add a new Password</CardTitle>
//         <CardDescription>
//           Deploy your new Password in solana chain.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="key">Key</Label>
//               <Input
//                 id="key"
//                 placeholder="Enter your key value"
//                 value={key}
//                 onChange={(e) => setKey(e.target.value)}
//               />
//               <Label htmlFor="value">Value</Label>
//               <Input
//                 id="value"
//                 placeholder="Enter your Password value"
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//               />
//             </div>
//           </div>
//           <Button type="submit" className="mt-4 w-full">
//             Deploy
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button
//           type="button"
//           variant="outline"
//           className="text-black"
//           onClick={() => {
//             setKey("");
//             setValue("");
//           }}
//         >
//           Cancel
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

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
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type AddPasswordProps = {
  vaults: any[];
  addVault: (vault: {
    id: number;
    name: string;
    owner: string;
    password: string;
  }) => void;
  programId: string; // Add programId as a prop
};

export function AddPassword({ vaults, addVault, programId }: AddPasswordProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const { connection } = useConnection();
  const wallet = window.solana;
  // const wallet = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.solana || !window.solana.isPhantom) {
      alert("Phantom wallet not installed!");
      return;
    }

    if (!key || !value) {
      alert("Key and Password cannot be empty!");
      return;
    }

    console.log(wallet, "wallet");

    try {
      await window.solana.connect();

      if (!wallet.publicKey) {
        alert("Please connect your wallet first!");
        return;
      }

      console.log(wallet, "wallet");

      console.log(wallet.publicKey, "pub key");

      const instruction = new web3.TransactionInstruction({
        keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: true }],
        programId: new web3.PublicKey(programId),
        data: Buffer.concat([
          Buffer.from([0]),
          Buffer.from(key.padEnd(32, "\0").slice(0, 32)),
          Buffer.from(value),
        ]),
      });

      const transaction = new web3.Transaction().add(instruction);
      console.log(transaction, "trans here");
      console.log(connection, "conn  here");

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      const newVault = {
        id: Date.now(),
        name: key,
        owner: wallet.publicKey.toBase58(),
        password: value,
      };

      addVault(newVault);

      // Reset form
      setKey("");
      setValue("");

      alert("Password successfully deployed to Solana!");
    } catch (err) {
      console.error(err);
      alert("Failed to deploy password");
    }
  };

  return (
    <Card className="w-[350px] z-40">
      <CardHeader>
        <CardTitle>Add a new Password</CardTitle>
        <CardDescription>
          Deploy your new Password on Solana chain.
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
