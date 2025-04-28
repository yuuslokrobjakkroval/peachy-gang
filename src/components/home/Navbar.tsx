"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";

export const Navbar = () => {
  // const navigation = ["Features", "Pricing", "Blog"];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-ghibi-bold text-primary dark:text-foreground">
            <span>
              <Image
                className="w-8 mb-2"
                src="/images/favicon.ico"
                alt="P"
                width="48"
                height="48"
              />
            </span>
            <span>PEACHY</span>
          </span>
        </Link>

        {/* Get Started */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <ThemeChanger />
          <Link
            href="/login"
            className="px-6 py-2 text-primary-foreground bg-primary rounded-md font-ghibi hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
          >
            Get Started
          </Link>
        </div>

        {/* Menu */}
        {/*<div className="hidden text-center lg:flex lg:items-center">*/}
        {/*    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">*/}
        {/*        {navigation.map((menu, index) => (*/}
        {/*            <li className="mr-3 nav__item" key={index}>*/}
        {/*                <Link*/}
        {/*                    href={`/${menu.toLowerCase()}`}*/}
        {/*                    className="inline-block px-4 py-2 text-lg font-ghibi text-foreground no-underline rounded-md dark:text-foreground hover:text-primary focus:text-primary focus:bg-muted focus:outline-none dark:hover:text-primary dark:focus:bg-muted"*/}
        {/*                >*/}
        {/*                    {menu}*/}
        {/*                </Link>*/}
        {/*            </li>*/}
        {/*        ))}*/}
        {/*    </ul>*/}
        {/*</div>*/}
      </nav>
    </div>
  );
};
