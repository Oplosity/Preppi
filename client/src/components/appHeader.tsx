"use client"
 
import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'


const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]

export default function AppHeader() {
  const router = useRouter()

  const [username, setUsernanme] = useState<string>("")
  useEffect(() => {
    axios.post("http://localhost:3001/checkAuthentication", null, { withCredentials: true }).then((res) => {
      setUsernanme(res.data)
    })
  }, [])

    return(
        <div className="fixed z-10 w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover">
            <header className="flex items-center standard-app-padding">
                <Link href="/" className="mr-6">
                    <Image src="/logo.svg" height={30.24} width={105.84} alt="Preppi logo" />
                </Link>
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger><Link href="http://localhost:3000/app/quizzes/">Quizzes</Link></NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Leaderboards</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    >
                                    {component.description}
                                    </ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>About</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    >
                                    {component.description}
                                    </ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="grow text-right">
                { username ? (
                  <div className="flex w-full grow justify-end content-center">
                    <Button className="mr-3" variant="halfTransparent" onClick={() => {
                      axios.post("http://localhost:3001/logout", null, { withCredentials: true }).then((res) => {
                        console.log(res)
                        window.location.reload()
                      })
                    }}>Log out</Button>
                    <span className="mr-3 leading-10 text-white">{username}</span>
                    <div className="">
                      <Avatar>
                        <AvatarImage src="https://picsum.photos/200" />
                      </Avatar>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button asChild variant="halfTransparent" className="hidden sm:inline-block mr-3">
                    <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="mr-3"><Link href="/signup">Sign up</Link></Button>
                  </>
                ) }
                <NavigationMenu className="inline-block md:hidden">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button asChild variant="halfTransparent"><NavigationMenuTrigger><FontAwesomeIcon icon={faBars} /></NavigationMenuTrigger></Button>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
              </div>
            </header>
        </div>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"