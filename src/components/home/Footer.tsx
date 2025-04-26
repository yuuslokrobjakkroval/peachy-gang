import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Container} from "@/components/home/Container";
import {FaFacebook, FaInstagram} from "react-icons/fa6";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export function Footer() {
    const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];
    const legal = ["Terms", "Privacy", "Legal"];

    return (
        <div className="w-full">
            <Container>
                <div
                    className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-border dark:border-border lg:grid-cols-5"
                >
                    <div className="lg:col-span-2">
                        <div>
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-2xl font-ghibi-bold text-primary dark:text-foreground"
                            >
                                <Image
                                    className="w-8 mb-2"
                                    src="/images/favicon.ico"
                                    alt="P"
                                    width="48"
                                    height="48"
                                />
                                <span>PEACHY</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {navigation.map((item, index) => (
                                <Link
                                    key={index}
                                    href="/"
                                    className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary focus:bg-muted focus:outline-none dark:hover:text-primary dark:focus:bg-muted"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                            {legal.map((item, index) => (
                                <Link
                                    key={index}
                                    href="/"
                                    className="w-full px-4 py-2 text-muted-foreground font-ghibi rounded-md dark:text-muted-foreground hover:text-primary focus:text-primary focus:bg-muted focus:outline-none dark:hover:text-primary dark:focus:bg-muted"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-ghibi-bold text-foreground dark:text-foreground">Follow us</div>
                        <div className="flex mt-5 space-x-5 text-muted-foreground dark:text-muted-foreground">

                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener"
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FaFacebook size={24}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex items-center space-x-2">
                                            <span>Facebook</span>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </a>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noopener"
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FaInstagram size={24}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex items-center space-y-2">
                                            <span>Instagram</span>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="my-10 text-sm text-center text-muted-foreground font-ghibi dark:text-muted-foreground">
                    Copyright © 2025. Made by{" "}
                    <a href="https://discord.gg/kHVBQ5DAQd" target="_blank" rel="noopener">
                        PEACHY GANG.
                    </a>
                </div>
            </Container>
        </div>
    );
}
