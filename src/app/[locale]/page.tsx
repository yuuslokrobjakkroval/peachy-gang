"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { config } from "@/utils/config";
import { FaArrowUp } from "react-icons/fa";
import {
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaXTwitter,
  FaPatreon,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
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
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Container from "@/components/layouts/container";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { styles } from "@/styles";
import { Badge } from "@/components/ui/badge";
import { IconCloud } from "@/components/ui/Animations/magic/icon-cloud";
import { expandableTabs, slugs, toNumber } from "@/utils/common";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "@/utils/email/constand";
import emailjs from "emailjs-com";
import { PeachyAnimatedBeam } from "@/components/ui/Animations/PeachyAnimatedBeam";
import { SplashCursor } from "@/components/ui/Effect/SplashCursor";
import { HeroPill } from "@/components/ui/hero-pill";
import { AwardBadge } from "@/components/ui/award-badge";
import { useGetTopUsersQuery } from "@/redux/api/users";
import Loading from "@/components/loading/circle";

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
  const {
    data: { items: topUser = [], meta } = { items: [], meta: {} },
    isSuccess,
  } = useGetTopUsersQuery(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

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
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      if (result.status === 200) {
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
      <SplashCursor />
      <div className="flex flex-wrap items-center justify-center gap-4 my-2">
        <AwardBadge type="golden-kitty" content="PEACHY in Your Area 🌸" />
      </div>
      <Container>
        <div className="w-full relative mt-3">
          {/* Navigation */}
          <nav className="container relative flex flex-wrap items-center justify-between p-4 lg:p-6 mx-auto transition-shadow duration-300">
            {/* Logo */}
            <Link href="/">
              <span className="relative inline-block">
                {/* Badge positioned top-right */}
                <Badge className="absolute -top-5 -right-8 text-xs px-2 z-10">
                  BETA
                </Badge>
                <div
                  className={cn(
                    "inline-flex items-center space-x-2 sm:space-x-3 rounded-full px-2 sm:px-4 transition-all ease-in hover:cursor-pointer"
                  )}
                >
                  {/* Logo with text */}
                  <span className="flex items-center space-x-2 sm:space-x-3 text-xl sm:text-2xl font-ghibi-bold text-primary dark:text-foreground transition-transform hover:scale-105">
                    <Image
                      className="w-8 sm:w-10 mb-1"
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

          {/* Expandable Tabs - Hidden on mobile, visible on larger screens */}
          <div
            style={styles}
            className={cn(
              "fixed left-1/2 z-50 mx-auto rounded-2xl bg-card hidden lg:block"
            )}
          >
            <ExpandableTabs
              tabs={expandableTabs}
              onChange={(index: number) => {
                if (!!index) {
                  const sectionId = navigation.find(
                    (item) => item.name === expandableTabs[index].title
                  )?.sectionId;
                  if (sectionId) {
                    scrollToSection(sectionId);
                  } else if (expandableTabs[index].title === "Peachy") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }
              }}
              className="bg-card backdrop-blur-sm rounded-2xl shadow-md"
            />
          </div>
        </div>
      </Container>

      {/* Hero Section */}
      <Container className="flex flex-wrap">
        <motion.div
          className="w-full flex flex-col justify-center items-center px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-ghibi-bold text-center text-primary animate-twinkle mb-6 sm:mb-8">
            {t("home.title")}
          </h1>
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-6 sm:mb-8">
            <Image
              className="object-cover rounded-lg w-full h-auto"
              src="/images/main.png"
              width={512}
              height={512}
              alt="Peach and Goma"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 512px"
            />
          </div>
          <Button
            onClick={() => router.push("/login")}
            className="bg-primary text-primary-foreground font-ghibi-bold px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105"
            aria-label={t("home.get_started")}
          >
            {t("home.get_started")}
          </Button>
        </motion.div>
      </Container>

      {/* About Section */}
      <Container>
        <motion.section
          id="about"
          className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 rounded-lg transition-shadow px-4 sm:px-6 py-8 sm:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-3 sm:mb-4">
              {t("about.beginnings")}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground font-ghibi leading-relaxed">
              {t("about.beginnings_description")}
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={config.url || "/placeholder.svg"}
              alt="Peach and Goma Beginnings"
              width={200}
              height={200}
              className="rounded-full transform hover:scale-105 transition-transform w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52"
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 208px"
            />
          </div>
        </motion.section>

        <motion.section
          className="rounded-lg mb-8 sm:mb-12 transition-shadow px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-3 sm:mb-4">
            {t("about.global_reach")}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 font-ghibi leading-relaxed text-center lg:text-left">
            {t("about.global_reach_description")}
          </p>
        </motion.section>

        <motion.section
          className="rounded-lg mb-8 sm:mb-12 transition-shadow px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-3 sm:mb-4">
            {t("about.mission")}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 font-ghibi leading-relaxed text-center lg:text-left">
            {t("about.mission_description")}
          </p>
        </motion.section>
      </Container>

      <Container>
        <motion.section
          className="rounded-lg mb-8 sm:mb-12 transition-shadow px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Animated Components */}
          <div className="flex flex-col ">
            {/* First Item: Text on Left, Animation on Right */}
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <section className="p-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-3 sm:mb-4">
                    {t("footer.features")}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground font-ghibi whitespace-pre-line leading-relaxed">
                    {t("footer.features_description")}
                  </p>
                </section>
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[200px] sm:mt-[-100px]">
                <PeachyAnimatedBeam />
              </div>
            </div>

            {/* Second Item: Animation on Left, Text on Right */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right   ">
                <section className="p-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-3 sm:mb-4">
                    {t("footer.techno_language")}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground font-ghibi whitespace-pre-line leading-relaxed">
                    {t("footer.techno_language_description")}
                  </p>
                </section>
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[200px] sm:mt-[-100px]">
                <IconCloud images={images} />
              </div>
            </div>
          </div>
        </motion.section>
      </Container>

      {isSuccess && (
        <Container>
          <motion.div
            className="rounded-lg mb-8 sm:mb-12 transition-shadow px-4 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col justify-center items-center gap-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary text-center">
                {t("user.top_global")}
              </h2>
              {topUser?.map((user: any, index: number) => (
                <div key={index}>
                  <AwardBadge
                    type="user-coin-top-one"
                    place={user?.rank ?? index}
                    content={`${user?.discord?.displayName ?? user.username} - ${toNumber(user?.balance?.coin)} coins`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      )}

      {/* FAQ Section */}
      <Container>
        <motion.section
          id="faq"
          className="rounded-lg mb-8 sm:mb-12 transition-shadow px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-6 sm:mb-8 text-center">
            {t("faq.title")}
          </h3>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-ghibi-bold text-foreground text-left text-sm sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-ghibi text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>
      </Container>

      {/* Contact Section */}
      <Container>
        <motion.section
          id="contact"
          className="mb-8 sm:mb-12 px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <section className="p-4 sm:p-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary mb-4 sm:mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-ghibi leading-relaxed">
              {t("contact.description")}
            </p>
          </section>

          <Card className="rounded-lg transition-shadow max-w-2xl mx-auto">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="font-ghibi-bold text-foreground text-lg sm:text-xl">
                {t("contact.form_title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="grid gap-2 sm:gap-3">
                    <Label
                      htmlFor="name"
                      className="font-ghibi-bold text-foreground text-sm sm:text-base"
                    >
                      {t("contact.name")} *
                    </Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: t("contact.name_required"),
                      })}
                      placeholder={t("contact.name_placeholder")}
                      className="bg-input text-foreground font-ghibi text-sm sm:text-base"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-xs sm:text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:gap-3">
                    <Label
                      htmlFor="email"
                      className="font-ghibi-bold text-foreground text-sm sm:text-base"
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
                      className="bg-input text-foreground font-ghibi text-sm sm:text-base"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:gap-3">
                    <Label
                      htmlFor="message"
                      className="font-ghibi-bold text-foreground text-sm sm:text-base"
                    >
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder={t("contact.message_placeholder")}
                      className="bg-input text-foreground font-ghibi text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-ghibi-bold rounded-md hover:bg-primary/90 py-2 sm:py-3 text-sm sm:text-base"
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
      </Container>

      {/* Scrolling Text Banner */}
      <Container>
        <div className="flex items-center px-4 sm:px-6">
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
                <div key={index} className="flex items-center mx-2 sm:mx-4">
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent px-2 sm:px-4"
                    style={{
                      WebkitTextStroke: "1px #a3a85e",
                    }}
                  >
                    Peach & Goma
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Container>
        <TooltipProvider>
          <footer className="relative grid max-w-screen-xl grid-cols-1 gap-6 sm:gap-8 pt-6 sm:pt-8 mx-auto mt-5 sm:grid-cols-2 lg:grid-cols-5 bg-gradient-to-r transition-all duration-500 px-4 sm:px-6">
            {/* Logo and Tagline */}
            <div className="relative lg:col-span-2">
              <div className="flex flex-col w-full max-w-3xl mx-auto gap-3 text-center sm:text-left">
                <Link
                  href="/"
                  className="flex items-center justify-center sm:justify-start space-x-2 text-xl sm:text-2xl font-ghibi-bold text-primary dark:text-foreground transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Return to Peachy homepage"
                >
                  <Image
                    className="w-6 sm:w-8 mb-2 hover:animate-pulse"
                    src="/images/favicon.ico"
                    alt="Peachy Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                    loading="lazy"
                  />
                  <span className="text-xl sm:text-2xl font-ghibi-bold text-primary drop-shadow-md">
                    PEACHY
                  </span>
                </Link>
                <h2 className="text-lg sm:text-xl font-ghibi text-muted-foreground mb-4">
                  {t("footer.tagline")}
                </h2>
              </div>
            </div>

            {/* Legal Links */}
            <div className="text-center sm:text-left">
              <div className="flex flex-col mt-4 space-y-2 justify-center sm:justify-start">
                {legal.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="py-2 text-sm sm:text-base text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`View ${item.name} page`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="relative text-center sm:text-left lg:col-span-2">
              <div className="font-ghibi-bold text-primary text-base sm:text-lg mb-4">
                {t("footer.follow_us")}
              </div>
              <div className="flex mt-4 space-x-3 sm:space-x-4 justify-center sm:justify-start flex-wrap gap-2">
                <a
                  href="https://www.facebook.com/peachyganggg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  aria-label="Follow Peachy on Facebook"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaFacebook size={20} className="sm:w-6 sm:h-6" />
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
                  rel="noreferrer noopener"
                  className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  aria-label="Follow Peachy on YouTube"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaYoutube size={20} className="sm:w-6 sm:h-6" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg">
                      <div className="flex items-center">
                        <span>YouTube</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </a>
                <a
                  href="https://discord.gg/peachyganggg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  aria-label="Follow Peachy on Discord"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaDiscord size={20} className="sm:w-6 sm:h-6" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg">
                      <div className="flex items-center">
                        <span>Discord</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </a>
                <a
                  href="https://x.com/peachyganggg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  aria-label="Follow Peachy on X"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaXTwitter size={20} className="sm:w-6 sm:h-6" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg">
                      <div className="flex items-center">
                        <span>X</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </a>
                <a
                  href="https://www.patreon.com/c/peachyganggg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  aria-label="Follow Peachy on Patreon"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaPatreon size={20} className="sm:w-6 sm:h-6" />
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg">
                      <div className="flex items-center">
                        <span>Patreon</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </a>
              </div>
            </div>
          </footer>
        </TooltipProvider>

        {/* Copyright Section */}
        <div className="my-8 sm:my-12 text-xs sm:text-sm text-center text-muted-foreground font-ghibi dark:text-muted-foreground px-4">
          © {new Date().getFullYear()} Made by{" "}
          <a
            href="https://discord.gg/peachyganggg"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          >
            PEACHY GANG
          </a>
        </div>
      </Container>

      {/* Scroll-to-Top Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 sm:p-3 bg-primary rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} className="sm:w-5 sm:h-5" />
        </Button>
      </div>
    </>
  );
}
