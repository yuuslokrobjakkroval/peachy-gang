"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetCustomersQuery } from "@/redux/api/users";
import Loading from "@/components/loading/circle";
import ThemeChanger from "@/components/theme.switch";
import { config } from "@/utils/config";
import {
  AmazonLogo,
  MicrosoftLogo,
  NetflixLogo,
  SonyLogo,
  VerizonLogo,
} from "@/components/icons";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
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
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Container from "@/components/layouts/container";
import LanguageChanger from "@/components/language.switch";

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

const legal = ["Terms", "Privacy", "Legal"];

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const { data: customers, isLoading } = useGetCustomersQuery(null);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsMobileMenuOpen(false);
    } else {
      console.warn(`Section with id '${sectionId}' not found.`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navigation.forEach((item) => {
        const section = document.getElementById(item.sectionId);
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(item.sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="w-full">
          <nav className="container relative flex flex-wrap items-center justify-between p-6 mx-auto lg:justify-between xl:px-2">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center space-x-3 text-2xl font-ghibi-bold text-primary dark:text-foreground transition-transform hover:scale-105">
                <span>
                  <Image
                    className="w-10 mb-1"
                    src="/images/favicon.ico"
                    alt="Peachy Logo"
                    width={48}
                    height={48}
                  />
                </span>
                <span>PEACHY</span>
              </span>
            </Link>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle mobile menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle className="text-xl font-ghibi-bold text-foreground pl-4 mb-6">
                    {t("menu.title")}
                  </SheetTitle>
                  <ul className="flex flex-col gap-4 pl-4">
                    {navigation.map((menu, index) => (
                      <li key={index}>
                        <Button
                          onClick={() => scrollToSection(menu.sectionId)}
                          className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary"
                          aria-label={`Scroll to ${menu.name} section`}
                        >
                          {menu.name}
                        </Button>
                      </li>
                    ))}
                    <li>
                      <LanguageChanger />
                    </li>
                  </ul>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <ul className="flex items-center gap-4 list-none">
                {navigation.map((menu, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(menu.sectionId)}
                      className={`px-4 py-2 text-lg font-ghibi text-foreground rounded-md transition-colors hover:text-primary focus:text-primary dark:text-foreground dark:hover:text-primary ${
                        activeSection === menu.sectionId ? "text-primary" : ""
                      }`}
                      aria-label={`Scroll to ${menu.name} section`}
                    >
                      {menu.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <ThemeChanger />
                <LanguageChanger />
              </div>
            </div>
          </nav>
        </div>
      </Container>

      <Container className="flex flex-wrap">
        <motion.div
          className="w-full flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-ghibi-bold text-center text-primary animate-twinkle">
            {t("home.title")}
          </h1>
          <Image
            className="object-cover rounded-lg"
            src="/images/main.png"
            width={616}
            height={617}
            alt="Peach and Goma"
            priority
            sizes="(max-width: 768px) 100vw, 616px"
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
        <motion.div
          className="flex flex-col justify-center items-center rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-xl text-center text-foreground dark:text-foreground font-ghibi">
            {t("home.trusted_by")}{" "}
            <span className="text-primary font-ghibi-bold">
              +{customers ? customers.toLocaleString() : 0}
            </span>{" "}
            {t("home.customers")}
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10 md:justify-around">
            <div className="pt-2 text-muted-foreground dark:text-muted-foreground transform hover:scale-110 transition-transform">
              <AmazonLogo />
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground transform hover:scale-110 transition-transform">
              <VerizonLogo />
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground transform hover:scale-110 transition-transform">
              <MicrosoftLogo />
            </div>
            <div className="pt-1 text-muted-foreground dark:text-muted-foreground transform hover:scale-110 transition-transform">
              <NetflixLogo />
            </div>
            <div className="pt-2 text-muted-foreground dark:text-muted-foreground transform hover:scale-110 transition-transform">
              <SonyLogo />
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Call-to-Action Section */}
      <Container>
        <motion.div
          className="flex flex-col items-center py-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-ghibi-bold text-primary mb-4 text-center">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground font-ghibi max-w-2xl text-center mb-8">
            {t("cta.description")}
          </p>
          <a
            href="https://t.me/+Wn2SkWaTk6wyYTM1"
            className="bg-primary text-primary-foreground font-ghibi-bold px-8 py-4 rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105"
            aria-label={t("cta.join")}
          >
            {t("cta.join")}
          </a>
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

            <motion.section
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
              <a
                href="https://t.me/+Wn2SkWaTk6wyYTM1"
                className="inline-block bg-primary text-primary-foreground font-ghibi-bold py-2 px-4 rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105"
                aria-label={t("about.join_telegram")}
              >
                {t("about.join_telegram")}
              </a>
            </motion.section>

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
        <footer className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-border dark:border-border lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex flex-col w-full max-w-3xl mx-auto gap-3">
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-ghibi-bold text-primary dark:text-foreground"
              >
                <Image
                  className="w-8 mb-2"
                  src="/images/favicon.ico"
                  alt="Peachy Logo"
                  width={48}
                  height={48}
                  sizes="48px"
                />
                <span className="text-2xl font-ghibi-bold text-primary">
                  PEACHY
                </span>
              </Link>

              <h2 className="text-xl font-ghibi text-primary mb-4">
                {t("footer.tagline")}
              </h2>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Button
                  variant="ghost"
                  key={index}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary"
                  aria-label={`Scroll to ${item.name} section`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase()}`}
                  className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary"
                  aria-label={`View ${item} page`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-ghibi-bold text-foreground dark:text-foreground">
              {t("footer.follow_us")}
            </div>
            <div className="flex mt-5 space-x-5 text-muted-foreground dark:text-muted-foreground">
              <a href="https://facebook.com/" target="_blank" rel="noopener">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaFacebook size={24} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center space-x-2">
                      <span>Facebook</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaInstagram size={24} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center space-x-2">
                      <span>Instagram</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
              <a
                href="https://twitter.com/peachandgoma"
                target="_blank"
                rel="noopener"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaXTwitter size={24} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center space-x-2">
                      <span>X</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
              <a
                href="https://www.youtube.com/@peachandgoma"
                target="_blank"
                rel="noopener"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaYoutube size={24} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center space-x-2">
                      <span>YouTube</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </a>
            </div>
          </div>
        </footer>

        <div className="my-10 text-sm text-center text-muted-foreground font-ghibi dark:text-muted-foreground">
          {t("footer.copyright")} Made by{" "}
          <a
            href="https://discord.gg/kHVBQ5DAQd"
            target="_blank"
            rel="noopener"
            className="text-primary hover:underline"
          >
            PEACHY GANG
          </a>
        </div>
      </Container>
    </>
  );
}
