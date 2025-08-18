import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import NextImage from "next/image";
import NextLink from "next/link";

import IconImage from "@/assets/images/icon.png";

const Error: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8 p-8">
      <NextSeo title="404" noindex={true} nofollow={true} />
      <NextLink href="/">
        <NextImage src={IconImage} alt="Icon" width={250} height={250} />
      </NextLink>
      <p className="text-center text-xl font-normal">
        Cannot find the page you are looking for.
      </p>
    </div>
  );
};

export default Error;
