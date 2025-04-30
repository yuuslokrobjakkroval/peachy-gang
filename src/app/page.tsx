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
import { FaFacebook, FaInstagram } from "react-icons/fa6";
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

type FormData = {
  name: string;
  email: string;
  message: string;
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container p-3 mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}
const navigation = [
  { name: "About Us", href: "about", sectionId: "about" },
  { name: "FAQ", href: "faq", sectionId: "faq" },
  { name: "Contact", href: "contact", sectionId: "contact" },
];

const legal = ["Terms", "Privacy", "Legal"];

const faqItems = [
  {
    question: "Who created Peach and Goma?",
    answer: "That would be me, Bu Jue Xiao Xiao!",
  },
  {
    question: "Where did they come from?",
    answer: "They were born from my imagination in China in 2017.",
  },
  {
    question: "Who are Peach and Goma?",
    answer: "A lovable cat couple—Peach (white) and Goma (gray)—madly in love!",
  },
  {
    question: "How can I get their stickers?",
    answer: (
      <>
        Check out 20+ FREE sticker packs on our{" "}
        <a
          href="https://t.me/+9DqGFiLAe6k1MjBl"
          className="text-primary hover:underline"
        >
          official Telegram channel
        </a>
        !
      </>
    ),
  },
];

export default function Home() {
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
        const toastId = toast.success("Message sent successfully!", {
          duration: 4000,
          position: "top-right",
          action: {
            label: <X className="h-4 w-4" />,
            onClick: () => toast.dismiss(toastId),
          },
        });
        reset();
      } else {
        const toastId = toast.error(`Failed to send message`, {
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
        `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
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
      // Ensure smooth scrolling works on all devices
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
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="w-full">
          <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
            <Link href="/">
              <span className="flex items-center space-x-2 text-2xl font-ghibi-bold text-primary dark:text-foreground">
                <span>
                  <Image
                    className="w-8 mb-2"
                    src="/images/favicon.ico"
                    alt="Peachy Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                  />
                </span>
                <span>PEACHY</span>
              </span>
            </Link>

            <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
              <ThemeChanger />
            </div>

            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle className="text-lg font-ghibi-bold text-foreground pl-3">
                    Menu
                  </SheetTitle>
                  <ul className="flex flex-col gap-4 pl-3">
                    {navigation.map((menu, index) => (
                      <li key={index}>
                        <button
                          onClick={() => scrollToSection(menu.sectionId)}
                          className={`text-lg font-ghibi text-foreground ${
                            activeSection === menu.sectionId
                              ? "text-primary"
                              : ""
                          }`}
                          aria-label={`Scroll to ${menu.name} section`}
                        >
                          {menu.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden text-center lg:flex lg:items-center">
              <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                {navigation.map((menu, index) => (
                  <li className="mr-3 nav__item" key={index}>
                    <button
                      onClick={() => scrollToSection(menu.sectionId)}
                      className={`inline-block px-4 py-2 text-lg font-ghibi text-foreground no-underline rounded-md dark:text-foreground hover:text-primary focus:text-primary dark:hover:text-primary ${
                        activeSection === menu.sectionId ? "text-primary" : ""
                      }`}
                      aria-label={`Scroll to ${menu.name} section`}
                    >
                      {menu.name}
                    </button>
                  </li>
                ))}
              </ul>
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
          <h1 className="text-6xl md:text-6xl font-ghibi-bold text-center text-primary mb-6 animate-twinkle">
            Welcome to the PEACHY GANG!
          </h1>

          <Image
            className="object-cover"
            src="/images/main.png"
            width={616}
            height={617}
            alt="Peach and Goma"
            priority
            sizes="(max-width: 768px) 100vw, 616px"
          />

          <Button
            onClick={() => router.push("/login")}
            className="cursor-pointer"
            aria-label="Get started with Peachy Gang"
          >
            Get Started
          </Button>
        </motion.div>
      </Container>

      <Container>
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-xl text-center text-foreground dark:text-foreground font-ghibi">
            Trusted by{" "}
            <span className="text-primary font-ghibi-bold">
              +{customers ? customers.toLocaleString() : 0}
            </span>{" "}
            customers in discord
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-muted-foreground dark:text-muted-foreground">
              <AmazonLogo />
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground">
              <VerizonLogo />
            </div>
            <div className="text-muted-foreground dark:text-muted-foreground">
              <MicrosoftLogo />
            </div>
            <div className="pt-1 text-muted-foreground dark:text-muted-foreground">
              <NetflixLogo />
            </div>
            <div className="pt-2 text-muted-foreground dark:text-muted-foreground">
              <SonyLogo />
            </div>
          </div>
        </motion.div>
      </Container>

      <Container>
        <div className="relative flex min-h-screen w-full flex-col items-center p-6 md:p-10 bg-background">
          <div className="texture" />

          <div className="w-full max-w-3xl z-10">
            <motion.section
              id="about"
              className="flex flex-col md:flex-row items-center mb-8 bg-card rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-ghibi-bold text-foreground mb-2">
                  Our Beginnings
                </h3>
                <p className="text-muted-foreground font-ghibi">
                  Peach and Goma came to life in 2017 when I designed the first
                  "Peach Cat ®" stickers for WeChat. This charming duo—a white
                  cat named Peach and her gray cat boyfriend, Goma—was inspired
                  by my own relationship and everyday moments with my boyfriend.
                  Living together, they share a love that’s sometimes cuddly,
                  sometimes playful, and always heartwarming—reflecting the ups
                  and downs of love that so many of us experience.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src={config.url}
                  alt="Peach and Goma Beginnings"
                  width={200}
                  height={200}
                  className="rounded-full shadow-primary border border-border"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </motion.section>

            <motion.section
              className="bg-card rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-ghibi-bold text-foreground mb-2">
                From China to the World
              </h3>
              <p className="text-muted-foreground mb-4 font-ghibi">
                What started on Weibo quickly spread beyond borders. Peach and
                Goma’s irresistible charm captured hearts globally, appearing on
                platforms like LINE, WeChat, KakaoTalk, Telegram, and WhatsApp.
                In 2021, I launched their official Telegram, Twitter, and
                YouTube channels to bring them closer to fans everywhere. It’s
                been an incredible journey seeing their cuteness connect with
                people worldwide!
              </p>
              <a
                href="https://t.me/+Wn2SkWaTk6wyYTM1"
                className="inline-block bg-primary text-primary-foreground font-ghibi-bold py-2 px-4 rounded-md hover:bg-primary/90 transition shadow-primary"
                aria-label="Join our Telegram Group"
              >
                Join Our Telegram Group
              </a>
            </motion.section>

            <motion.section
              className="bg-card rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-ghibi-bold text-foreground mb-2">
                Our Mission
              </h3>
              <p className="text-muted-foreground mb-4 font-ghibi">
                Peach and Goma are more than just adorable characters—they’re a
                celebration of life’s simple joys, warmth, and love. My goal is
                to spread happiness through their stories while safeguarding
                their uniqueness from unauthorized use. Thank you for being part
                of this mission!
              </p>
            </motion.section>

            <motion.section
              id="faq"
              className="bg-card rounded-lg shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-ghibi-bold text-primary mb-4 text-center">
                FAQ (Frequently Asked Questions)
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
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <section className="p-6 text-center">
                <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
                  We’d Love to Hear from You!
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto font-ghibi">
                  Whether you have questions about Peach and Goma, want to share
                  your love for their adventures, or have ideas for new
                  stickers, reach out to us! Fill out the form below or connect
                  with us on social media.
                </p>
              </section>

              <Card className="bg-card border border-border shadow-md">
                <CardHeader>
                  <CardTitle className="font-ghibi-bold text-foreground">
                    Send Us a Message
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
                          Name *
                        </Label>
                        <Input
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          placeholder="Enter your name"
                          className="border-border bg-input text-foreground font-ghibi"
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
                          Email *
                        </Label>
                        <Input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          placeholder="Enter your email"
                          className="border-border bg-input text-foreground font-ghibi"
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
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder="What’s on your mind?"
                          className="border-border bg-input text-foreground font-ghibi"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground font-ghibi-bold rounded-md hover:bg-primary/90 shadow-primary"
                          aria-label="Send message"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
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
                A Tale of Love, Laughter, and Adorable Cats
              </h2>
              <p className="text-muted-foreground font-ghibi">
                <strong className="font-ghibi-bold text-foreground">
                  Email:
                </strong>{" "}
                <a
                  href="mailto:mail@peachandgoma.com"
                  className="text-primary hover:underline"
                >
                  mail@peachandgoma.com
                </a>
              </p>
              <p className="text-muted-foreground font-ghibi">
                <strong className="font-ghibi-bold text-foreground">
                  Telegram Group:
                </strong>{" "}
                <a
                  href="https://t.me/+Wn2SkWaTk6wyYTM1"
                  className="text-primary hover:underline"
                >
                  Join our Telegram Group
                </a>
              </p>
              <p className="text-muted-foreground font-ghibi">
                <strong className="font-ghibi-bold text-foreground">
                  Telegram Channel:
                </strong>{" "}
                <a
                  href="https://t.me/+9DqGFiLAe6k1MjBl"
                  className="text-primary hover:underline"
                >
                  Join our Telegram Channel
                </a>
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary"
                  aria-label={`Scroll to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary dark:hover:text-primary"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-ghibi-bold text-foreground dark:text-foreground">
              Follow us
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
                    <div className="flex items-center space-y-2">
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
                    <span className="text-2xl">𝕏</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center space-x-2">
                      <span>Twitter</span>
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
                    <span className="text-2xl">📺</span>
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
          Copyright © 2025. Made by{" "}
          <a
            href="https://discord.gg/kHVBQ5DAQd"
            target="_blank"
            rel="noopener"
          >
            PEACHY GANG.
          </a>
        </div>
      </Container>
    </>
  );
}
