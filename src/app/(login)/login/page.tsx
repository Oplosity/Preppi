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
          <h2 className={`${poppins.className} text-black text-4xl mb-3 text-pretty`}>Login</h2>
          <h1 className={`${poppins.className} text-black text-md mb-2 text-pretty`}>If you don`t have an account<br/>You can <Button variant="link" size={"links"} className="text-md"><Link href={"/signup"}>Sign up here!</Link></Button></h1>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Email</p>
          <Input placeholder="Enter your email address"></Input>
          <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Password</p>
          <Input className="mb-2" placeholder="Enter your password"></Input>
          <div className="flex pb-3">
            <Checkbox/>
            <p className={`${poppins.className} text-black text-xs mb-1 text-pretty pl-2`}>Remember me</p>
            <Button variant="link2" size={"links"} className={`${poppins.className} text-gray-500 mb-1 text-pretty ml-24 text-xs`}>Forgot password?</Button>
          </div>
          <Button size={"wide"}>Login</Button>
          
          <div className="w-full px-24">
            <p className="py-3 text-md text-gray-500 px-1">Or continue with</p>
            <div className="flex gap-3">
                <Link href="/login/face" className="w-10 h-10">
                    <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link href="/login/apple" className="w-8 h-10">
                    <FontAwesomeIcon icon={faApple} />
                </Link>
                <Link href="/login/google" className="w-10 h-1s0">
                    <FontAwesomeIcon icon={faGoogle} />
                </Link>
            </div>
          </div>

        </div>
      </div>
      
      <div className="flex-1 p-10">
        <div className="flex flex-col h-full w-full bg-[url('/landing/landing-bg.svg')] bg-cover rounded-xl p-10">
          <div className="grow relative self-center h-full w-full bg-[url('/sign-in-pana.png')] bg-contain bg-no-repeat bg-center"></div>
          <div className="">
            <h1 className={`${poppins.className} text-white text-3xl mb-0 text-pretty pl-10`}>Log in to Preppi</h1>
            <p className={`${poppins.className} text-white text-2xl mb-3 text-pretty pl-10`}>Your personalized quizzes are waiting for you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}