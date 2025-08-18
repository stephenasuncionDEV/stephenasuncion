import type { GetServerSidePropsContext, NextApiRequest } from "next";

export const getServerIpAddress = ({
  req,
}: {
  req: NextApiRequest | GetServerSidePropsContext["req"];
}): string => {
  const ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"];
  if (!ip) return "";
  if (Array.isArray(ip)) return ip[0];
  return ip.split(/, /)[0];
};
