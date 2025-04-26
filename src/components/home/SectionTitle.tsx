import React from "react";
import { Container } from "@/components/home/Container";

interface SectionTitleProps {
    preTitle?: string;
    title?: string;
    align?: "left" | "center";
    children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
    return (
        <Container
            className={`flex w-full flex-col mt-4 ${
                props.align === "left" ? "" : "items-center justify-center text-center"
            }`}
        >
            {props.preTitle && (
                <div className="text-sm font-ghibi-bold tracking-wider text-primary uppercase">
                    {props.preTitle}
                </div>
            )}

            {props.title && (
                <h2 className="max-w-2xl mt-3 text-3xl font-ghibi-bold leading-snug tracking-tight text-foreground lg:leading-tight lg:text-4xl dark:text-foreground">
                    {props.title}
                </h2>
            )}

            {props.children && (
                <p className="max-w-2xl py-4 text-lg leading-normal font-ghibi text-muted-foreground lg:text-xl xl:text-xl dark:text-muted-foreground">
                    {props.children}
                </p>
            )}
        </Container>
    );
};