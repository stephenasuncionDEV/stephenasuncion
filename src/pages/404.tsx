import { NextSeo } from "next-seo";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { LivingCode } from "@/components/Portfolio/LivingCode";
import { SiteHeader } from "@/components/Portfolio/SiteHeader";

export default function NotFound() {
  return (
    <div className="portfolio">
      <NextSeo title="Page not found — Stephen Asuncion" noindex />
      <SiteHeader />
      <main id="main-content" className="not-found page-shell" tabIndex={-1}>
        <div className="not-found-copy">
          <span className="mono">404 / A SMALL DETOUR</span>
          <h1>
            A little
            <br />
            <em>off course.</em>
          </h1>
          <p>
            This page doesn’t exist. There’s still plenty
            <br />
            to explore back at the beginning.
          </p>
          <Link href="/" className="button-primary">
            Back to my portfolio <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="not-found-art">
          <LivingCode paused={true} motifKey={0} />
        </div>
      </main>
    </div>
  );
}
