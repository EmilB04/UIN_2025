import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "nkgepv81",
  dataset: "production",
  apiVersion: "v2025-04-10",
  useCdn: true,
});

export const writeClient = createClient({
  projectId: "nkgepv81",
  dataset: "production",
  apiVersion: "v2025-04-10",
  useCdn: true,
  token:
    "skImtYvI9tGtx36gdm8ltTmidyf9RHOtrgu5Db4DpuS8nbiVfskIxHvwen7XC5e4mLsVTXEEwEJHHgdUTeKrgWJHTb3TG5XTMwmplp9qVGswu971Te6bICdPQo2EE3ptTs72Isttp5DeZXSSfTx8Z10GUntwCge9NZO1Be0HuqN9CWDjP2yx",
});