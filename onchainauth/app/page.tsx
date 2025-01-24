"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import BoxReveal from "@/components/ui/box-reveal";
import Background from "@/components/background";
import { getProvider } from "@/utils";
import { getCsrfToken, signIn } from "next-auth/react";
import bs58 from "bs58";
import { Signature } from "@/utils/signature";
import AnimatedCoolText from "@/components/ui/animated-cool-text";

export default function Home() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const onConnect = async () => {
    try {
      const provider = getProvider();
      console.log("inside connect");

      if (!provider) {
        window.open("https://phantom.app/", "_blank");
      }

      const resp = await provider.connect();
      console.log("Connect", resp.publicKey.toString());
      const csrf = await getCsrfToken();
      if (resp && csrf) {
        const noneUnit8 = Signature.create(csrf);
        const { signature } = await provider.signMessage(noneUnit8);
        const serializedSignature = bs58.encode(signature);
        const message = {
          host: window.location.host,
          publicKey: resp.publicKey.toString(),
          nonce: csrf,
        };

        const response = await signIn("credentials", {
          message: JSON.stringify(message),
          signature: serializedSignature,
          redirect: false,
        });
        localStorage.setItem("pubkey", message.publicKey);

        router.push("/vault");

        if (response?.error) {
          console.log("Error occured:", response.error);
          return;
        }
      } else {
        console.log("Could not connect to wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4">
        {!showCard ? (
          <div className="flex flex-col max-w-xl">
            <BoxReveal boxColor="#5046e6" duration={0.5}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h1 className="text-6xl font-bold tracking-tight">
                  Onchain Auth<span className="text-[#5046e6]">.</span>
                </h1>
              </motion.div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.5}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                <h2 className="mt-4 text-xl font-medium text-gray-200">
                  Vault for your passwords{" "}
                  <span className="text-[#5046e6] font-semibold">
                    Web3 vault
                  </span>
                </h2>
              </motion.div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.5}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-8 space-y-4"
              >
                <p className="text-lg leading-relaxed text-gray-300 ">
                  <span className="text-[#5046e6]">→</span>Protect your password
                  with your wallet public address{" "}
                  <span className="font-semibold text-[#5046e6]">
                    Metamask{" "}
                  </span>
                  <span className="font-semibold text-[#5046e6]">or </span>
                  any{" "}
                  <span className="font-semibold text-[#5046e6]">
                    other wallets
                  </span>
                  .
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  <span className="text-[#5046e6]">→</span> 100% open-source,
                  and fully customizable.
                </p>
              </motion.div>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.5}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="text-xl px-8 py-6 font-medium hover:bg-[#5046e6]/90 transition-colors"
                  onClick={() => setShowCard(true)}
                >
                  Get Started
                </Button>
              </motion.div>
            </BoxReveal>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-[350px] backdrop-blur-md bg-gray-800/30 border-gray-700">
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className="text-2xl text-white">Welcome</CardTitle>
                  <CardDescription className="text-gray-400">
                    Secure Web3 Password Manager
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-gray-300">
                    This is a web3 based auth application used to store your
                    passwords at a same place.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        console.log("cliked ");

                        onConnect();
                      }}
                      className="w-full"
                      variant="default"
                      size="lg"
                    >
                      Connect Wallet
                    </Button>
                    <Button
                      className="w-auto"
                      variant="outline"
                      size="lg"
                      onClick={() => setShowCard(false)}
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
