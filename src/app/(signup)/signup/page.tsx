import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { faApple, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="flex flex-col flex-1 justify-center">
        <Link href={"/"}><Image src="logo-black.svg" height={45} width={157.5} alt="Preppi logo" className="mb-20 ml-[10%]"/></Link>
        <div className="self-center">
          <h2 className={`${poppins.className} text-black text-4xl mb-3 text-pretty`}>Sign up</h2>
          <h1 className={`${poppins.className} text-black text-md mb-2 text-pretty`}>If you already have an account registered<br/>You can <Button variant="link" size={"links"} className="text-md"><Link href={"/login"}>Log in here!</Link></Button></h1>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Email</p>
          <Input></Input>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Username</p>
          <Input className="mb-2"></Input>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Password</p>
          <Input></Input>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Confirm Password</p>
          <Input className="mb-2"></Input>
          <Button size={"wide"}>Register</Button>
        </div>
      </div>
      
      <div className="flex-1 p-10">
        <div className="flex flex-col h-full w-full bg-[url('/landing/landing-bg.svg')] bg-cover rounded-xl p-10">
        <div className="grow relative self-center h-full w-full bg-[url('/sign-up-pana.png')] bg-contain bg-no-repeat bg-center"></div>
          <div className="">
            <h1 className={`${poppins.className} text-white text-3xl mb-0 text-pretty pl-10`}>Sign Up to Preppi</h1>
            <p className={`${poppins.className} text-white text-2xl mb-3 text-pretty pl-10`}>Your personalized quizzes are waiting for you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}//If you already have an account register