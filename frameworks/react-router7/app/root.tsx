import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[var(--app-bg)] text-text antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
            {children}
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = 500;
  let title = "エラー";
  let message = "予期せぬエラーが発生しました。";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      title = "ページが見つかりません";
      message = "お探しのページは存在しないか、移動した可能性があります。";
    } else if (status === 500) {
      title = "サーバーエラー";
      message = "サーバーで問題が発生しました。しばらくしてからもう一度お試しください。";
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold text-accent/20 mb-2">{status}</div>
        <h1 className="text-2xl font-bold text-text mb-3">{title}</h1>
        <p className="text-muted mb-8 leading-relaxed">{message}</p>
        <a
          href="/orders"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-strong transition-colors font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          注文一覧へ戻る
        </a>
      </div>
    </div>
  );
}
