"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};
