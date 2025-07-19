"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGetDashboardQuery } from "@/redux/api/users";
import {
  useGenerateKHQRMutation,
  useGenerateTransactionIdMutation,
} from "@/redux/api/payment";
import { usePeachy } from "@/contexts/peachy";
import { SectionCards } from "@/components/applications/dashboard/section-cards";
import Loading from "@/components/loading/circle";
import { Meteors } from "@/components/ui/Animations/magic/meteors";
import { Gift, Loader2, PawPrint, Send, X } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UserBalancePieChart } from "@/components/applications/dashboard/user-balance-pie-chart";
import { TotalBalanceAreaChart } from "@/components/applications/dashboard/total-balance-area-chart";
import { FeatureUsageLineChart } from "@/components/applications/dashboard/feature-usage-line-chart";

const DashboardErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasError, setHasError] = useState(false);
  const t = useTranslations("dashboard");

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Uncaught error in DashboardPage:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px] px-4">
        <p className="text-sm text-center text-red-500">
          {t("error", {
            defaultMessage: "An error occurred while rendering the dashboard",
          })}
        </p>
      </div>
    );
  }
  return <>{children}</>;
};

export default function DashboardPage() {
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const { userInfoByDiscord } = usePeachy();
  const [amount, setAmount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [generateTransactionId] = useGenerateTransactionIdMutation();
  const [generateKHQR] = useGenerateKHQRMutation();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setAmount(0);
      setQrCode(null);
      setPaymentStatus(null);
      setErrorMessage(null);
      setQrLoading(false);
    } else {
      chatIconRef.current?.focus();
    }
  };

  const {
    data: dashboard,
    isLoading: DashboardLoading,
    isError: dashboardError,
  } = useGetDashboardQuery(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      qrLoading ||
      amount <= 0 ||
      !userInfoByDiscord?.email ||
      !userInfoByDiscord?.username
    ) {
      setErrorMessage(
        !userInfoByDiscord?.email || !userInfoByDiscord?.username
          ? t("dashboard.errors.missingUserData")
          : t("dashboard.errors.invalidAmount")
      );
      return;
    }

    setQrLoading(true);
    setErrorMessage(null);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const { transactionId } = await generateTransactionId({
        year,
        month,
      }).unwrap();
      const response = await generateKHQR({
        amount,
        transactionId,
        email: userInfoByDiscord.email,
        username: userInfoByDiscord.username,
      }).unwrap();
      setQrCode(response.qr);
    } catch (error: any) {
      console.error("Error generating QR code or transaction ID:", error);
      setErrorMessage(
        error?.data?.details || t("dashboard.errors.qrGenerationFailed")
      );
      setPaymentStatus("error");
    } finally {
      setQrLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      const overlay = document.querySelector("[data-radix-ui-portal]");
      if (overlay) {
        overlay.remove();
      }
    };
  }, []);

  if (DashboardLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px] px-4">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (dashboardError || !dashboard) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px] px-4">
        <p className="text-sm text-center text-red-500">
          {t("error", {
            defaultMessage: "An error occurred while loading the dashboard",
          })}
        </p>
      </div>
    );
  }

  return (
    <DashboardErrorBoundary>
      <div className="relative w-full px-2 overflow-hidden rounded-lg sm:px-4 md:px-6">
        <Meteors />
        <div className="@container/main flex flex-1 flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 py-4">
            <div className="px-2 sm:px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {t("dashboard.title")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.description")}
                </p>
              </div>
            </div>
            <SectionCards stats={dashboard} />
            <div className="px-2 sm:px-4 lg:px-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-medium sm:text-lg">
                    {t("dashboard.analytics_title")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.analytics_description")}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12">
                  <div className="col-span-1 md:col-span-12 lg:col-span-12">
                    <UserBalancePieChart />
                  </div>
                  <div className="col-span-1 md:col-span-12 lg:col-span-12">
                    <TotalBalanceAreaChart />
                  </div>
                  <div className="col-span-1 md:col-span-12 lg:col-span-12">
                    <FeatureUsageLineChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bottom-4 right-2 sm:right-4"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="p-2 rounded-full shadow-lg size-10 sm:size-12"
            >
              {!isChatOpen ? (
                <Gift className="size-5 sm:size-6" />
              ) : (
                <PawPrint className="size-5 sm:size-6" />
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-16 right-2 sm:right-4 z-50 w-[90%] max-w-[400px] sm:w-[400px] overflow-auto"
            >
              <Card>
                <CardHeader className="px-3 py-3 sm:px-4">
                  <CardTitle className="text-base font-bold sm:text-lg">
                    {t("dashboard.sponsorTitle")}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {qrCode
                      ? t("dashboard.scanQrPrompt")
                      : t("dashboard.enterAmountPrompt")}
                  </CardDescription>
                  <CardAction>
                    <Button
                      onClick={toggleChat}
                      size="icon"
                      className="size-7 sm:size-8"
                    >
                      <X className="size-4 sm:size-5" />
                      <span className="sr-only">{t("common.close")}</span>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-3 sm:px-4">
                  {errorMessage && (
                    <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
                  )}
                  {!qrCode ? (
                    <form
                      onSubmit={handleSubmit}
                      className="flex items-center w-full space-x-2"
                    >
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="amount" className="text-sm">
                          {t("dashboard.amountLabel")}
                        </Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          min="0"
                          step="0.01"
                          value={amount || ""}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="flex-1 text-sm"
                          placeholder={t("dashboard.amountPlaceholder")}
                          required
                        />
                      </div>
                      <div className="grid gap-2 mt-6">
                        <Button
                          className="size-8 sm:size-9"
                          disabled={
                            qrLoading ||
                            amount <= 0 ||
                            !userInfoByDiscord?.email ||
                            !userInfoByDiscord?.username
                          }
                          size="icon"
                          type="submit"
                        >
                          {qrLoading ? (
                            <Loader2 className="size-4 sm:size-5" />
                          ) : (
                            <Send className="size-4 sm:size-5" />
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <Image
                        src={qrCode}
                        alt={t("dashboard.qrCodeAlt")}
                        width={200}
                        height={200}
                        className="object-contain w-[180px] sm:w-[200px] h-[180px] sm:h-[200px]"
                      />
                      {(paymentStatus === "failed" ||
                        paymentStatus === "error") && (
                        <Button
                          onClick={() => {
                            setQrCode(null);
                            setPaymentStatus(null);
                            setErrorMessage(null);
                            setAmount(0);
                          }}
                          variant="outline"
                          className="text-sm"
                        >
                          {t("dashboard.tryAgain")}
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
                {paymentStatus === "confirmed" && (
                  <CardFooter className="px-3 sm:px-4">
                    <Button onClick={toggleChat} className="w-full text-sm">
                      {t("common.close")}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardErrorBoundary>
  );
}
