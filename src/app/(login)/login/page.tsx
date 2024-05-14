import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import Image from "next/image";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="flex flex-row overflow-hidden h-screen">
      <div className="flex-1 place-item-center p-40">
        <h2 className={`${poppins.className} text-black text-2xl xl:text-3xl mb-3 text-pretty`}>Login</h2>
        <h1 className={`${poppins.className} text-black mb-2 text-pretty`}>If you don`t have an account<br/>You can<Button variant="link">Sign up here!</Button></h1>
        <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Email</p>
        <Input></Input>
        <p className={`${poppins.className} text-gray-500 mb-1 text-pretty`}>Password</p>
        <Input className="mb-5"></Input>
        <Button size={"wide"}>Login</Button>
      </div>
      <div className="flex-3 p-10">
        <div className="h-full bg-[url('/landing/landing-bg.svg')] bg-cover rounded-xl">
          <Image alt="f" src={'/sign-in-pana.png'} width={600} height={700}/>
          <h1 className={`${poppins.className} text-white text-2xl xl:text-3xl mb-0 text-pretty pl-10`}>Log in to Preppi</h1>
          <p className={`${poppins.className} text-white text-2xl xl:text-2xl mb-3 text-pretty p-10`}> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
        </div>
      </div>
    </div>
  );
}