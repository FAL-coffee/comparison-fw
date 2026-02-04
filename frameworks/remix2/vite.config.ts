import tailwindcss from "@tailwindcss/vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      ssr: true,
    }),
    tsconfigPaths(),
  ],
});

// ReactRouter v7 のように、ルートをコードで定義する場合の例
//
// export default defineConfig({
//   plugins: [
//     remix({
//       routes(defineRoutes) {
//         return defineRoutes((route) => {
//           route("/", "home/route.tsx", { index: true });
//           route("about", "about/route.tsx");
//           route("concerts", "concerts/layout.tsx", () => {
//             route("", "concerts/home.tsx", { index: true });
//             route("trending", "concerts/trending.tsx");
//             route(":city", "concerts/city.tsx");
//           });
//         });
//       },
//     }),
//   ],
// });
