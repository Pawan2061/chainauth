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
import { useConnection } from "@solana/wallet-adapter-react";

type AddPasswordProps = {
  programId: string;
  onSuccess: (newVault: {
    id: number;
    name: string;
    owner: string;
    password: string;
  }) => void;
  onClose: () => void;
};

export function AddPassword({
  programId,
  onSuccess,
  onClose,
}: AddPasswordProps) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const { connection } = useConnection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.solana) {
      alert("Please install Phantom wallet");
      return;
    }

    if (!key || !value) {
      alert("Please enter both key and password");
      return;
    }

    try {
      const wallet = window.solana;
      await wallet.connect();

      if (!wallet.publicKey) {
        alert("Please connect your wallet");
        return;
      }

      const newAccount = web3.Keypair.generate();

      const keyBuffer = Buffer.from(key);
      const valueBuffer = Buffer.from(value);
      const totalSpace = keyBuffer.length + valueBuffer.length + 100;

      const createInstruction = web3.SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: newAccount.publicKey,
        space: totalSpace,
        lamports: await connection.getMinimumBalanceForRentExemption(
          totalSpace
        ),
        programId: new web3.PublicKey(programId),
      });

      const instructionData = Buffer.concat([
        Buffer.from([0]),
        Buffer.from([keyBuffer.length]),
        keyBuffer,
        valueBuffer,
      ]);

      const storeInstruction = new web3.TransactionInstruction({
        keys: [
          {
            pubkey: newAccount.publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: wallet.publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: new web3.PublicKey(programId),
        data: instructionData,
      });

      const transaction = new web3.Transaction()
        .add(createInstruction)
        .add(storeInstruction);

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      transaction.sign(newAccount);
      const signed = await wallet.signTransaction(transaction);

      try {
        const signature = await connection.sendRawTransaction(
          signed.serialize()
        );
        await connection.confirmTransaction(signature);

        const newVault = {
          id: Date.now(),
          name: key,
          owner: wallet.publicKey.toBase58(),
          password: value,
        };

        onSuccess(newVault);
        setKey("");
        setValue("");
        onClose();
      } catch (txError: any) {
        console.error("Transaction failed:", txError);
        if (txError.logs) {
          console.error("Program logs:", txError.logs);
        }
        alert(`Failed to store password: ${txError.message}`);
      }
    } catch (err: any) {
      console.error("Error:", err);
      alert(`Failed to store password: ${err.message}`);
    }
  };

  return (
    <Card className="w-[350px]">
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
              <Label htmlFor="key">Name</Label>
              <Input
                id="key"
                placeholder="Enter name for this password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="value">Password</Label>
              <Input
                id="value"
                type="password"
                placeholder="Enter your password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="mt-6 w-full">
            Deploy Password
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
