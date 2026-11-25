import fs from "node:fs";
import path from "node:path";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { gallery, instagramEmbedUrl, services, site } from "@/content/site";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches every page route instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const url of [
      "/",
      "/gallery",
      "/services",
      "/measurements",
      "/about",
      "/contact",
      "/enquiry",
    ]) {
      const matches = router.matchRoutes(url);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
});

describe("Instagram showcase content", () => {
  it("resolves every local image referenced in site.ts to an existing file in public/", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    const paths = [
      ...Object.values(site.images),
      ...gallery.map((g) => g.src),
      ...services.flatMap((s) => (s.image ? [s.image] : [])),
    ];

    for (const rel of paths) {
      if (rel.startsWith("/")) {
        const diskPath = path.join(publicDir, rel.slice(1));
        expect(fs.existsSync(diskPath), `Missing image asset: ${diskPath}`).toBe(true);
      }
    }
  });

  it("converts Instagram reel and post URLs to embed URLs and rejects profile URLs", () => {
    expect(
      instagramEmbedUrl("https://www.instagram.com/mohini_creation15/p/DUOGOXzk2_1/?hl=en"),
    ).toBe("https://www.instagram.com/p/DUOGOXzk2_1/embed/");
    expect(instagramEmbedUrl("https://www.instagram.com/reel/Cx123AbC_9/")).toBe(
      "https://www.instagram.com/reel/Cx123AbC_9/embed/",
    );
    expect(instagramEmbedUrl("https://www.instagram.com/mohini_creation15/?hl=en")).toBeNull();
  });
});
