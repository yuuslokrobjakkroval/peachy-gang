"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { config } from "@/utils/config";
import { FaFacebook, FaYoutube, FaArrowUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ArrowRightCircle, Book, Home, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Container from "@/components/layouts/container";
import { ExpandableTabs, TabItem } from "@/components/ui/expandable-tabs";
import { styles } from "@/styles";
import { AnimatedShinyText } from "@/components/animations/AnimatedShinyText";
import { Badge } from "@/components/ui/badge";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const navigation = [
  { name: "About Us", href: "about", sectionId: "about" },
  { name: "FAQ", href: "faq", sectionId: "faq" },
  { name: "Contact", href: "contact", sectionId: "contact" },
];

const legal = [
  { name: "Terms and Condition", href: "terms", icon: null },
  { name: "Privacy Policy", href: "privacy", icon: null },
  { name: "Legal", href: "legal", icon: null },
];

export default function Peachy() {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs: TabItem[] = [
    { title: "PEACHY", icon: Home },
    { type: "separator" },
    { title: "About Us", icon: Book },
    // { title: "FAQ", icon: MessageCircleQuestion },
    // { title: "Contact", icon: Contact },
  ];

  const faqItems = [
    {
      question: t("faq.who_created"),
      answer: t("faq.who_created_answer"),
    },
    {
      question: t("faq.where_from"),
      answer: t("faq.where_from_answer"),
    },
    {
      question: t("faq.who_are"),
      answer: t("faq.who_are_answer"),
    },
    {
      question: t("faq.get_stickers"),
      answer: (
        <>
          {t("faq.get_stickers_answer")}{" "}
          <a
            href="https://t.me/+9DqGFiLAe6k1MjBl"
            className="text-primary hover:underline"
            aria-label="Official Telegram channel"
          >
            {t("faq.telegram_channel")}
          </a>
          !
        </>
      ),
    },
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const toastId = toast.success(t("contact.success"), {
          duration: 4000,
          position: "top-right",
          action: {
            label: <X className="h-4 w-4" />,
            onClick: () => toast.dismiss(toastId),
          },
        });
        reset();
      } else {
        const toastId = toast.error(t("contact.error"), {
          duration: 6000,
          position: "top-right",
          action: {
            label: <X className="h-4 w-4" />,
            onClick: () => toast.dismiss(toastId),
          },
        });
      }
    } catch (error) {
      const toastId = toast.error(
        `${t("contact.error")}: ${error instanceof Error ? error.message : t("error.unknown")}`,
        {
          duration: 6000,
          position: "top-right",
          action: {
            label: <X className="h-4 w-4" />,
            onClick: () => toast.dismiss(toastId),
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Section with id '${sectionId}' not found.`);
    }
  };

  return (
    <>
      <Container>
        <div className="w-full relative">
          <nav className="container relative flex flex-wrap items-center justify-between p-6 mx-auto lg:justify-between xl:px-2 transition-shadow duration-300">
            {/* Logo */}
            <Link href="/">
              <span className="relative inline-block">
                {/* Badge positioned top-right */}
                <Badge className="absolute -top-5 -right-8 text-xs px-2 z-10">
                  BETA
                </Badge>
                <div
                  className={cn(
                    "inline-flex items-center space-x-3 rounded-full border px-4 py-2 transition-all ease-in hover:cursor-pointer"
                  )}
                >
                  {/* Logo with text */}
                  <span className="flex items-center space-x-3 text-2xl font-ghibi-bold text-primary dark:text-foreground transition-transform hover:scale-105">
                    <Image
                      className="w-10 mb-1"
                      src="/images/favicon.ico"
                      alt="Peachy Logo"
                      width={48}
                      height={48}
                    />
                    <span>PEACHY</span>
                  </span>
                </div>
              </span>
            </Link>
          </nav>

          {/* ExpandableTabs for Mobile - Bottom Centered */}
          <div
            style={styles}
            className={cn("fixed left-1/2 z-50 mx-auto rounded-2xl bg-card")}
          >
            <ExpandableTabs
              tabs={tabs}
              onChange={(index: number) => {
                if (!!index) {
                  const sectionId = navigation.find(
                    (item) => item.name === tabs[index].title
                  )?.sectionId;
                  if (sectionId) {
                    scrollToSection(sectionId);
                  } else if (tabs[index].title === "Peachy") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }
              }}
              className="bg-card backdrop-blur-sm rounded-2xl shadow-md"
            />
          </div>
        </div>
      </Container>

      <Container className="flex flex-wrap">
        <motion.div
          className="w-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-ghibi-bold text-center text-primary animate-twinkle">
            {t("home.title")}
          </h1>
          <Image
            className="object-cover rounded-lg"
            src="/images/main.png"
            width={512}
            height={512}
            alt="Peach and Goma"
            priority
            sizes="(max-width: 768px) 100vw, 512px"
          />
          <Button
            onClick={() => router.push("/login")}
            className="bg-primary text-primary-foreground font-ghibi-bold px-6 py-3 rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105"
            aria-label={t("home.get_started")}
          >
            {t("home.get_started")}
          </Button>
        </motion.div>
      </Container>

      <Container>
        <div className="relative flex min-h-screen w-full flex-col items-center md:p-10">
          <div className="texture" />
          <div className="w-full max-w-3xl z-10">
            <motion.section
              id="about"
              className="flex flex-col md:flex-row items-center mb-12 rounded-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-ghibi-bold text-foreground mb-3">
                  {t("about.beginnings")}
                </h3>
                <p className="text-muted-foreground font-ghibi">
                  {t("about.beginnings_description")}
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center mt-3">
                <Image
                  src={config.url}
                  alt="Peach and Goma Beginnings"
                  width={200}
                  height={200}
                  className="rounded-full transform hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </motion.section>

            {/* <motion.section
              className="rounded-lg mb-12 transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-ghibi-bold text-foreground mb-3">
                {t("about.global_reach")}
              </h3>
              <p className="text-muted-foreground mb-6 font-ghibi">
                {t("about.global_reach_description")}
              </p>
            </motion.section> */}

            <motion.section
              className="rounded-lg mb-12 transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-ghibi-bold text-foreground mb-3">
                {t("about.mission")}
              </h3>
              <p className="text-muted-foreground mb-4 font-ghibi">
                {t("about.mission_description")}
              </p>
            </motion.section>

            <motion.section
              id="faq"
              className="rounded-lg mb-12 transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-ghibi-bold text-primary mb-6 text-center">
                {t("faq.title")}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-ghibi-bold text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-ghibi">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>

            <motion.section
              id="contact"
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <section className="p-6 text-center">
                <h2 className="text-3xl font-ghibi-bold text-primary mb-4">
                  {t("contact.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto font-ghibi">
                  {t("contact.description")}
                </p>
              </section>

              <Card className="rounded-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-ghibi-bold text-foreground">
                    {t("contact.form_title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label
                          htmlFor="name"
                          className="font-ghibi-bold text-foreground"
                        >
                          {t("contact.name")} *
                        </Label>
                        <Input
                          id="name"
                          {...register("name", {
                            required: t("contact.name_required"),
                          })}
                          placeholder={t("contact.name_placeholder")}
                          className="bg-input text-foreground font-ghibi"
                          aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="email"
                          className="font-ghibi-bold text-foreground"
                        >
                          {t("contact.email")} *
                        </Label>
                        <Input
                          id="email"
                          {...register("email", {
                            required: t("contact.email_required"),
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: t("contact.email_invalid"),
                            },
                          })}
                          type="email"
                          placeholder={t("contact.email_placeholder")}
                          className="bg-input text-foreground font-ghibi"
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="message"
                          className="font-ghibi-bold text-foreground"
                        >
                          {t("contact.message")}
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder={t("contact.message_placeholder")}
                          className="bg-input text-foreground font-ghibi"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground font-ghibi-bold rounded-md hover:bg-primary/90"
                          aria-label={t("contact.submit")}
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? t("contact.sending")
                            : t("contact.submit")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </Container>

      <Container>
        <div className="relative w-full overflow-hidden bg-background">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              duration: 20,
            }}
          >
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center mx-4">
                <span
                  className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
                  style={{
                    WebkitTextStroke: "1px #a3a85e", // tailwind gray-400
                  }}
                >
                  Peach & Goma
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      <Container>
        <footer className="relative grid max-w-screen-xl grid-cols-1 gap-8 pt-8 mx-auto mt-5 sm:grid-cols-2 lg:grid-cols-5 bg-gradient-to-r transition-all duration-500">
          {/* Logo and Tagline */}
          <div className="relative lg:col-span-2">
            <div className="flex flex-col w-full max-w-3xl mx-auto gap-3 text-center sm:text-left">
              <Link
                href="/"
                className="flex items-center justify-center sm:justify-start space-x-2 text-2xl font-ghibi-bold text-primary dark:text-foreground transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Return to Peachy homepage"
              >
                <Image
                  className="w-8 mb-2 hover:animate-pulse"
                  src="/images/favicon.ico"
                  alt="Peachy Logo"
                  width={48}
                  height={48}
                  sizes="48px"
                  loading="lazy"
                />
                <span className="text-2xl font-ghibi-bold text-primary drop-shadow-md">
                  PEACHY
                </span>
              </Link>
              <h2 className="text-xl font-ghibi text-muted-foreground mb-4">
                {t("footer.tagline")}
              </h2>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <div className="flex flex-col mt-4 space-x-4 justify-center sm:justify-start">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`View ${item.name} page`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="relative text-center sm:text-left">
            <div className="font-ghibi-bold text-primary text-lg">
              {t("footer.follow_us")}
            </div>
            <div className="flex mt-4 space-x-4 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/peachyganggg"
                target="_blank"
                rel="noopener"
                className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                aria-label="Follow Peachy on Facebook"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaFacebook size={24} />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg">
                    <div className="flex items-center">
                      <span>Facebook</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
              <a
                href="https://www.youtube.com/@peachyganggg"
                target="_blank"
                rel="noopener"
                className="bf-ctransform hover:scale-110 hover:rotate-12 transition-all duration-300"
                aria-label="Follow Peachy on YouTube"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaYoutube size={24} />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg">
                    <div className="flex items-center">
                      <span>YouTube</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          {/* <div className="relative lg:col-span-2">
            <div className="font-ghibi-bold text-foreground dark:text-foreground text-lg text-center sm:text-left">
              {t("footer.newsletter")}
            </div>
            <form className="mt-4 flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md border border-border dark:border-border bg-white dark:bg-gray-800 text-foreground dark:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Subscribe
              </button>
            </form>
          </div> */}

          {/* Scroll-to-Top Button */}
          <div className="fixed bottom-5 right-5 z-50">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-3 bg-primary rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={20} />
            </Button>
          </div>
        </footer>

        {/* Copyright Section */}
        <div className="my-10 text-sm text-center text-muted-foreground font-ghibi dark:text-muted-foreground">
          © {new Date().getFullYear()} Made by{" "}
          <a
            href="https://discord.gg/peachyganggg"
            target="_blank"
            rel="noopener"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          >
            PEACHY GANG
          </a>
        </div>
      </Container>
    </>
  );
}
