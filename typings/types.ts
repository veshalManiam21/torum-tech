import type { NextPage as NextPageOriginal } from "next";

export type NextPage<P = {}, IP = P> = NextPageOriginal<P, IP> & {
  layout?: React.FC;
};
