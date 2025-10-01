import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/provider/theme-provider";
import ReduxProvider from "@/components/provider/redux-provider";
import { PeachyProvider } from "@/contexts/peachy";
import { AuthProvider } from "@/contexts/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SettingsProvider } from "@/contexts/settingsContext";
import { getMode, getSettingsFromCookie } from "@/utils/serverHelpers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "PEACHY GANG",
  description:
    "PEACHY is an application inspired by Mitao Cat between Peach and Goma.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const mode = await getMode();
  const settingsCookie = await getSettingsFromCookie();

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <title>PEACHY GANG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/*<link rel="apple-touch-icon" href="/apple-touch-icon.png" />*/}
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta
          name="google-site-verification"
          content="Jlg3X3ZqWGdi3VwKI03Fa8SnVe3zfcZ2vq6QsrWdnjQ"
        />
        <meta name="robots" content="noindex" />
        <meta
          name="keywords"
          content="nextjs, react, typescript, tailwindcss, peachy gang"
        />
      </head>
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ReduxProvider>
                <AuthProvider>
                  <PeachyProvider>
                    <div className="texture" />
                    {children}
                    <Toaster position="top-center" />
                    <Analytics />
                    <SpeedInsights />
                  </PeachyProvider>
                </AuthProvider>
              </ReduxProvider>
            </ThemeProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
