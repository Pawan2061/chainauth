"use client";

import { SolanaWalletProvider } from "@/components/provider";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </SessionProvider>
  );
};
