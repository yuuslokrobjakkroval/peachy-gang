"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGetDashboardQuery } from "@/redux/api/users";
import {
  useGenerateKHQRMutation,
  useGenerateTransactionIdMutation,
} from "@/redux/api/payment";
import { usePeachy } from "@/contexts/peachy";
import { SectionCards } from "@/components/applications/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/applications/dashboard/chart-area-interactive";
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

  const { data: stats, isLoading } = useGetDashboardQuery(null);

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

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative items-center justify-center w-full overflow-hidden rounded-lg">
      <Meteors />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4">
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("dashboard.title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.description")}
              </p>
            </div>
          </div>
          <SectionCards stats={stats} />
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">
                  {t("dashboard.analytics_title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.analytics_description")}
                </p>
              </div>
              {/* <ChartAreaInteractive users={users} /> */}
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
          className="fixed z-50 bottom-4 right-2"
        >
          <Button
            ref={chatIconRef}
            onClick={toggleChat}
            size="icon"
            className="p-2 rounded-full shadow-lg size-8"
          >
            {!isChatOpen ? (
              <Gift className="size-4" />
            ) : (
              <PawPrint className="size-4" />
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
            className="fixed bottom-15 right-4 z-50 w-[95%] md:w-[400px] overflow-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {t("dashboard.sponsorTitle")}
                </CardTitle>
                <CardDescription>
                  {qrCode
                    ? t("dashboard.scanQrPrompt")
                    : t("dashboard.enterAmountPrompt")}
                </CardDescription>
                <CardAction>
                  <Button onClick={toggleChat} size="icon" className="size-8">
                    <X className="size-4" />
                    <span className="sr-only">{t("common.close")}</span>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                {errorMessage && (
                  <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
                )}
                {!qrCode ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center w-full space-x-2"
                  >
                    <div className="grid flex-1 gap-3">
                      <Label htmlFor="amount">
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
                        className="flex-1"
                        placeholder={t("dashboard.amountPlaceholder")}
                        required
                      />
                    </div>
                    <div className="grid gap-3 mt-6">
                      <Button
                        className="size-9"
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
                          <Loader2 className="size-4" />
                        ) : (
                          <Send className="size-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={qrCode}
                      alt={t("dashboard.qrCodeAlt")}
                      width={256}
                      height={256}
                      className="object-contain"
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
                      >
                        {t("dashboard.tryAgain")}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
              {paymentStatus === "confirmed" && (
                <CardFooter>
                  <Button onClick={toggleChat} className="w-full">
                    {t("common.close")}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
