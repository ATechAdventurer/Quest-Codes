import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://quest-codes.atechadventurer.dev",
  integrations: [
    tailwind(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
