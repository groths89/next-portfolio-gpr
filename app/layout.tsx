import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/components/craft";
import { InfoBar } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Logo from "@/public/logo.svg";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL("https://wp.9d8.dev"),
};

// Revalidate content every hour
export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased bg-gray-700", fontSans.variable)}
      >
        <div className={cn("p-4 bg-gray-700 w-full h-full relative overflow-hidden")}>
          <div className={cn("max-w-full mx-auto bg-gray-800 bg-cover w-full h-full relative overflow-hidden shadow-sm")}>
            <div className={cn("relative flex flex-nowrap")}>
              <InfoBar>
                <div className={cn("fixed p-0 px-4")}>
                  <div className={cn("w-full h-20 justify-start items-center absolute left-0 top-0 z-50 hidden")}> 
                    <a className={cn("ml-auto pointer-events-auto text-base px-8 py-12")}> 
                      <i className="fas fa-ellipsis-v"></i> 
                    </a> 
                  </div>
                  <div className={cn("relative left-0 top-0 z-50 w-full p-6 h-60 bg-gradient-to-br from-gray-700 to-gray-800 text-center shadow-sm")}> 
                    <div className={cn("w-24 h-24 mx-auto rounded-full relative mb-4")}> 
                      <a data-no-swup="" href="https://arter.bslthemes.com/wp-content/uploads/2020/09/face-1.jpg" className={cn("relative w-full h-full rounded-full flex justify-center outline-none transition-all duration-200 ease-in-out z-0")}> 
                        <img className={cn("absolute w-full h-full object-cover rounded-full z-0")} src="https://arter.bslthemes.com/wp-content/uploads/2020/09/face-1.jpg" alt="avatar" />
                      </a> 
                    </div> 
                    <h5 className="art-name mb-10">
                        <a href="https://arter.bslthemes.com">Artur Carter</a>
                    </h5>
                    <div className="art-sm-text">Front-end Developer<br/> Ui/UX Designer</div>
                  </div>
                </div>
              </InfoBar>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Main>
                  {children}
                  <Footer />
                </Main>
                <Nav />
              </ThemeProvider>
              <Analytics />              
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">next-wp starter</h2>
          <Image
            src={Logo}
            alt="Logo"
            className="dark:invert"
            width={84}
            height={30.54}
          ></Image>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="https://github.com/9d8dev/next-wp">Get Started</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>{metadata.description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            © <a href="https://9d8.dev">9d8</a>. All rights reserved.
            2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
