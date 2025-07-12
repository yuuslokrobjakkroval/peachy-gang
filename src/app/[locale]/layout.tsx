import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { Nunito, PT_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/provider/theme-provider";
import ReduxProvider from "@/components/provider/redux-provider";
import { PeachyProvider } from "@/contexts/peachy";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SettingsProvider } from "@/contexts/settingsContext";
import { getMode, getSettingsFromCookie } from "@/utils/serverHelpers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
        <link rel="icon" href="/images/favicon.ico" />
        {/*<link rel="apple-touch-icon" href="/apple-touch-icon.png" />*/}
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta
          name="google-site-verification"
          content="R2Yfe67ddlF9A6UTmMbSAz-t1zTWIs7PjVFYA4w3GMQ"
        />
        <meta name="robots" content="noindex" />
        <meta
          name="keywords"
          content="nextjs, react, typescript, tailwindcss, peachy gang"
        />
      </head>
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
        cz-shortcut-listen="true"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ReduxProvider>
                <PeachyProvider>
                  <div className="texture" />

                  {children}
                  <Toaster position="top-right" />
                  <Analytics />
                  <SpeedInsights />
                </PeachyProvider>
              </ReduxProvider>
            </ThemeProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
