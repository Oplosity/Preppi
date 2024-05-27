"use client"
 
import * as React from "react"
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
import { Avatar, AvatarImage } from "./ui/avatar"
import axios from "axios"

const components: { name: string; rank: number; score: number }[] = [ //I guess this dropdown can be a leaderboard
    {
      name: "test1",
      rank: 1,
      score: 20000,
    },
    {
      name: "test2",
      rank: 2,
      score: 19000,
    },
    {
      name: "test3",
      rank: 3,
      score: 18000,
    },
    {
      name: "test4",
      rank: 4,
      score: 17000,
    }
  ]

export default function Header() {
  const [username, setUsernanme] = React.useState<string>("")
  React.useEffect(() => {
    axios.post("http://localhost:3001/checkAuthentication", null, { withCredentials: true }).then((res) => {
      setUsernanme(res.data)
    })
  }, [])
    return(
        <div className="fixed z-10 w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover">
            <header className="flex items-center standard-page-padding">
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
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                    key={component.name}
                                    title={component.rank.toString()+ ". " + component.name + " Score: "+ component.score.toString() }
                                    >
                                    {component.score.toString()}
                                    </ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger><Link href="about">About</Link></NavigationMenuTrigger>
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
            "block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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