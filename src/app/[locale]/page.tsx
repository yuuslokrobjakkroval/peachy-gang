"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { config, ownerId, staffId } from "@/utils/config";
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
import {
  avatarUrl,
  expandableTabs,
  slugs,
  toCapitalCase,
  toNumber,
} from "@/utils/common";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "@/utils/email/constand";
import emailjs from "emailjs-com";
import { PeachyAnimatedBeam } from "@/components/ui/Animations/peachy-animated-beam";
import { AwardBadge } from "@/components/ui/award-badge";
import {
  useGetFetchUserByIdQuery,
  useGetTopCoinQuery,
} from "@/redux/api/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "@/components/ui/Animations/animate/avatar-group-mask";
import { Timeline } from "@/components/ui/timeline";
import moment from "moment";
import ImagePreview from "@/components/ui/Animations/spectrum/image-preview-dependecies";
import TextMorphAnimation from "@/components/ui/Animations/bundui/text-morph";
import { GitHubStarsButton } from "../../components/ui/Animations/animate/buttons/github-stars";

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

  const getParams = () => ({
    limit: 3,
  });

  const {
    data: { items: topUser = [], meta } = { items: [], meta: {} },
    isSuccess,
  } = useGetTopCoinQuery(getParams());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const userIds = useMemo(
    () => Array.from(new Set([...ownerId, ...staffId])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ownerId, staffId]
  );
  const { data: fetchUser } = useGetFetchUserByIdQuery(userIds);

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  const changelogTimeline = [
    {
      title: moment("2024-07-27T06:40:24Z").format("Do MMM YYYY"),
      content: (
        <div className="space-y-4">
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-sm">
            Built and launched Peachy, a community-driven platform for discord
          </p>
          <div className="grid grid-cols-2 gap-4">
            <ImagePreview
              src="https://pbs.twimg.com/media/GqLoDwhaUAAj7i5?format=jpg&name=4096x4096"
              alt="home page"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <ImagePreview
              src="https://pbs.twimg.com/media/GqLoa3QakAAaNb_?format=jpg&name=4096x4096"
              alt="dashboard"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <ImagePreview
              src="https://pbs.twimg.com/media/GqLoiW4bcAAiUP8?format=jpg&name=4096x4096"
              alt="feature"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <ImagePreview
              src="https://pbs.twimg.com/media/GqLoorbbkAAd0Cw?format=jpg&name=4096x4096"
              alt="configuration"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: moment("2024-09-28T06:40:24Z").format("Do MMM YYYY"),
      content: (
        <div className="space-y-4">
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            I cloned an open-source Discord bot dashboard from{" "}
            <a
              className="text-primary hover:underline"
              href="https://github.com/fuma-nama"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fuma Nama
            </a>
            . <br />
            The Front-End (
            <a
              className="text-primary hover:underline"
              href="https://github.com/fuma-nama/discord-bot-dashboard-next"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo here
            </a>
            ) uses Next.js (Pages Router) and Chakra UI v2 for a responsive UI.{" "}
            <br />
            The Back-End (
            <a
              className="text-primary hover:underline"
              href="https://github.com/fuma-nama/discord-dashboard-backend-next"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo here
            </a>
            ) handles API logic with Next.js.
          </p>
        </div>
      ),
    },
    {
      title: moment("2025-04-06T06:21:33Z").format("Do MMM YYYY"),
      content: (
        <div className="space-y-4">
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            I created my own dashboard using Next.js (App Router) and Shadcn UI
            with Ghibli for a responsive UI.
          </p>
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            The theme is sourced from{" "}
            <a
              className="text-primary hover:underline"
              href="https://matsu-theme.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matsu Theme
            </a>
            , created by{" "}
            <a
              className="text-primary hover:underline"
              href="https://x.com/matsugfx"
              target="_blank"
              rel="noopener noreferrer"
            >
              @matsugfx
            </a>
            —huge shout-out for an exceptional UI theme!
          </p>
          <p className="text-xs font-normal text-muted-foreground md:text-sm">
            Also inspired by amazing UI libraries:
          </p>
          <ul className="pl-5 space-y-2 text-xs list-disc md:text-sm text-muted-foreground">
            <li>
              <a
                className="text-primary hover:underline"
                href="https://magicui.design/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Magic UI
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://ui.aceternity.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aceternity UI
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://21st.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                21st.dev
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://github.com/arihantcodes/spectrum-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spectrum UI
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://github.com/arihantcodes/hexta-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hexta UI
              </a>
            </li>
            <li>
              <a
                className="text-primary hover:underline"
                href="https://github.com/arihantcodes/animate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animate
              </a>
            </li>
          </ul>
        </div>
      ),
    },
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
            label: <X className="w-4 h-4" />,
            onClick: () => toast.dismiss(toastId),
          },
        });
        reset();
      } else {
        const toastId = toast.error(t("contact.error"), {
          duration: 6000,
          position: "top-right",
          action: {
            label: <X className="w-4 h-4" />,
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
            label: <X className="w-4 h-4" />,
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
      {/* <SplashCursor /> */}
      <div className="flex flex-wrap items-center justify-center gap-4 my-2">
        <AwardBadge title="Golden Award" content="PEACHY in Your Area 🌸" />
      </div>
      <Container>
        <div className="relative w-full mt-3">
          {/* Navigation */}
          <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto transition-shadow duration-300 lg:p-6">
            {/* Logo */}
            <Link href="/">
              <span className="relative inline-block">
                {/* Badge positioned top-right */}
                <Badge className="absolute z-10 px-2 text-xs -top-5 -right-8">
                  BETA
                </Badge>
                <div
                  className={cn(
                    "inline-flex items-center space-x-2 sm:space-x-3 rounded-full px-2 sm:px-4 transition-all ease-in hover:cursor-pointer"
                  )}
                >
                  {/* Logo with text */}
                  <span className="flex items-center space-x-2 text-xl transition-transform sm:space-x-3 sm:text-2xl font-ghibi-bold text-primary dark:text-foreground hover:scale-105">
                    <Image
                      className="w-8 mb-1 sm:w-10"
                      src="/favicon.ico"
                      alt="Peachy Logo"
                      width={48}
                      height={48}
                    />
                    <span>PEACHY</span>
                  </span>
                </div>
              </span>
            </Link>
            <div className="flex flex-col w-auto gap-3 text-center sm:text-left">
              <GitHubStarsButton
                username="yuuslokrobjakkroval"
                repo="peachy-gang"
              />
            </div>
          </nav>

          {/* Expandable Tabs - Hidden on mobile, visible on larger screens */}
          <div
            style={styles}
            className={cn(
              "fixed left-1/2 z-50 mx-auto rounded-2xl bg-card hidden lg:block"
            )}
          >
            <ExpandableTabs
              className="shadow-md bg-card backdrop-blur-sm rounded-2xl"
              tabs={expandableTabs}
              isTheme={true}
              isLanguage={true}
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
            />
          </div>
        </div>
      </Container>

      {/* Hero Section */}
      <Container className="flex flex-wrap">
        <motion.div
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextMorphAnimation
            className="mb-6 text-4xl text-primary font-ghibi-bold sm:text-5xl lg:text-6xl"
            texts={[t("home.welcome"), t("home.to"), t("home.peachy_gang")]}
          />
          <div className="w-full max-w-md mb-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:mb-8">
            <Image
              className="object-cover w-full h-auto rounded-lg"
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
            className="px-6 py-3 text-sm transition-transform transform rounded-md bg-primary text-primary-foreground font-ghibi-bold sm:px-8 sm:py-4 sm:text-base hover:bg-primary/90 hover:scale-105"
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
          className="flex flex-col items-center gap-6 px-4 py-8 transition-shadow rounded-lg lg:flex-row lg:gap-12 sm:px-6 sm:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h3 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-4">
              {t("about.beginnings")}
            </h3>
            <p className="text-sm leading-relaxed sm:text-base text-muted-foreground font-ghibi">
              {t("about.beginnings_description")}
            </p>
          </div>
          <div className="flex justify-center w-full lg:w-1/2">
            <Image
              src={config.url || "/placeholder.svg"}
              alt="Peach and Goma Beginnings"
              width={200}
              height={200}
              className="w-32 h-32 transition-transform transform rounded-full hover:scale-105 sm:w-48 sm:h-48 lg:w-52 lg:h-52"
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 208px"
            />
          </div>
        </motion.section>

        <motion.section
          className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-4">
            {t("about.global_reach")}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-center sm:text-base text-muted-foreground font-ghibi lg:text-left">
            {t("about.global_reach_description")}
          </p>
        </motion.section>

        <motion.section
          className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-4">
            {t("about.mission")}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-center sm:text-base text-muted-foreground font-ghibi lg:text-left">
            {t("about.mission_description")}
          </p>
        </motion.section>
      </Container>

      <Container>
        <motion.section
          className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Animated Components */}
          <div className="flex flex-col ">
            {/* First Item: Text on Left, Animation on Right */}
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="flex flex-col items-center w-full text-center lg:w-1/2 lg:items-start lg:text-left">
                <section className="p-3">
                  <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-4">
                    {t("footer.features")}
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line sm:text-base text-muted-foreground font-ghibi">
                    {t("footer.features_description")}
                  </p>
                </section>
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[200px] sm:mt-[-100px]">
                <PeachyAnimatedBeam />
              </div>
            </div>

            {/* Second Item: Animation on Left, Text on Right */}
            <div className="flex flex-col items-center justify-between lg:flex-row-reverse">
              <div className="flex flex-col items-center w-full text-center lg:w-1/2 lg:items-end lg:text-right ">
                <section className="p-3">
                  <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-4">
                    {t("footer.techno_language")}
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line sm:text-base text-muted-foreground font-ghibi">
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
            className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col items-center justify-center gap-8">
              <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-ghibi-bold text-primary">
                {t("user.top_global")}
              </h2>
              {topUser?.map((user: any, index: number) => (
                <div key={index}>
                  <AwardBadge
                    place={user?.rank ?? index}
                    content={`${user?.discord?.displayName ?? user.username} - ${toNumber(user?.balance?.coin)} coins`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      )}

      {/* Timeline Section */}
      <Container>
        <motion.div
          className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center gap-8">
            <Timeline
              title="Changelog from my journey"
              description="I've been working on Peachy for the past 1 years. Here's a timeline of my journey."
              items={changelogTimeline}
            />
          </div>
        </motion.div>
      </Container>

      {/* FAQ Section */}
      <Container>
        <motion.section
          id="faq"
          className="px-4 mb-8 transition-shadow rounded-lg sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="mb-6 text-2xl text-center sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-8">
            {t("faq.title")}
          </h3>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm text-left font-ghibi-bold text-foreground sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground font-ghibi sm:text-base">
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
          className="px-4 mb-8 sm:mb-12 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <section className="p-4 text-center sm:p-6">
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-ghibi-bold text-primary sm:mb-6">
              {t("contact.title")}
            </h2>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed sm:text-base text-muted-foreground font-ghibi">
              {t("contact.description")}
            </p>
          </section>

          <Card className="max-w-2xl mx-auto transition-shadow rounded-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg font-ghibi-bold text-foreground sm:text-xl">
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
                      className="text-sm font-ghibi-bold text-foreground sm:text-base"
                    >
                      {t("contact.name")} *
                    </Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: t("contact.name_required"),
                      })}
                      placeholder={t("contact.name_placeholder")}
                      className="text-sm bg-input text-foreground font-ghibi sm:text-base"
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
                      className="text-sm font-ghibi-bold text-foreground sm:text-base"
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
                      className="text-sm bg-input text-foreground font-ghibi sm:text-base"
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
                      className="text-sm font-ghibi-bold text-foreground sm:text-base"
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
                      className="w-full py-2 text-sm rounded-md bg-primary text-primary-foreground font-ghibi-bold hover:bg-primary/90 sm:py-3 sm:text-base"
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
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background" />
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
                    className="px-2 text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl sm:px-4"
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
      <Container className="mb-30">
        <TooltipProvider>
          <footer className="relative grid max-w-screen-xl grid-cols-1 gap-6 px-4 pt-6 mx-auto mt-5 transition-all duration-500 sm:gap-8 sm:pt-8 sm:grid-cols-2 lg:grid-cols-5 bg-gradient-to-r sm:px-6">
            {/* Logo and Tagline */}
            <div className="relative justify-between lg:col-span-2">
              <div className="flex flex-col w-full max-w-3xl gap-3 mx-auto text-center sm:text-left">
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 text-xl transition-transform duration-300 transform sm:justify-start sm:text-2xl font-ghibi-bold text-primary dark:text-foreground hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Return to Peachy homepage"
                >
                  <Image
                    className="w-6 mb-2 sm:w-8 hover:animate-pulse"
                    src="/favicon.ico"
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
                <h2 className="mb-4 text-lg sm:text-xl font-ghibi text-muted-foreground">
                  {t("footer.tagline")}
                </h2>
              </div>
            </div>

            {/* Legal Links */}
            <div className="text-center sm:text-left">
              <div className="flex flex-col justify-center mt-4 space-y-2 sm:justify-start">
                {legal.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="py-2 text-sm transition-colors duration-300 rounded-md sm:text-base text-muted-foreground font-ghibi dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`View ${item.name} page`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="relative text-center sm:text-left lg:col-span-2">
              <div className="mb-4 text-base font-ghibi-bold text-primary sm:text-lg">
                {t("footer.follow_us")}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-3 sm:space-x-4 sm:justify-start">
                <a
                  href="https://www.facebook.com/peachyganggg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
        <div className="flex items-center justify-center my-32 text-xs text-center px-0-4 sm:my-8 sm:text-sm text-muted-foreground font-ghibi dark:text-muted-foreground">
          <h2 className="text-lg sm:text-xl font-ghibi text-muted-foreground">
            {fetchUser?.length > 0 && (
              <>
                Top Role
                <AvatarGroup
                  className="mt-3"
                  invertOverlap
                  align="start"
                  translate={50}
                  tooltipProps={{ side: "bottom", sideOffset: 12 }}
                >
                  {fetchUser?.map((user: any, index: number) => (
                    <Avatar key={index}>
                      <AvatarImage
                        src={avatarUrl(user)}
                        alt={toCapitalCase(user.username)}
                      />
                      <AvatarFallback>{user.global_name?.[0]}</AvatarFallback>
                      <AvatarGroupTooltip>
                        <p>{toCapitalCase(user.global_name)}</p>
                      </AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </>
            )}
          </h2>
        </div>

        {/* Copyright Section */}
        <div className="px-4 my-32 text-xs text-center sm:my-8 sm:text-sm text-muted-foreground font-ghibi dark:text-muted-foreground">
          © {new Date().getFullYear()} Made by{" "}
          <a
            href="https://discord.gg/peachyganggg"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary mb-30"
          >
            PEACHY GANG
          </a>
        </div>
      </Container>

      {/* Scroll-to-Top Button */}
      <div className="fixed z-50 bottom-4 right-4 sm:bottom-5 sm:right-5">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 transition-colors duration-300 rounded-full shadow-lg sm:p-3 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} className="sm:w-5 sm:h-5" />
        </Button>
      </div>
    </>
  );
}
