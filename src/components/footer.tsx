import { faDiscord, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="">
            <div className="bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover flex text-neutral-100">
                <div className="standard-page flex flex-col md:flex-row md:items-end">
                    <div className="grow">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                                <div className="">
                                    <h6 className="block font-bold">Some links 1</h6>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Some uhhh</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Other a</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Links</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Here yes</Link>
                                </div>
                                <div className="">
                                    <h6 className="block font-bold">Some links 2</h6>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Some uhhh</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Other a</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Links</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Here yes</Link>
                                </div>
                                <div className="">
                                    <h6 className="block font-bold">Some links 3</h6>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Some uhhh</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Other a</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Links</Link>
                                    <Link href="https://google.com/" className="block hover:text-neutral-200">Here yes</Link>
                                </div>
                            </div>
                            <div className="">
                                <h6 className="block font-bold">Follow us</h6>
                                <div className="flex gap-3 mt-1">
                                    <Link href="https://google.com/" className="text-xl hover:text-neutral-200">
                                        <FontAwesomeIcon icon={faDiscord} />
                                    </Link>
                                    <Link href="https://google.com/" className="text-xl hover:text-neutral-200">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                    <Link href="https://google.com/" className="text-xl hover:text-neutral-200">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 md:items-end">
                        <Image src="logo.svg" height={30.24} width={105.84} alt="Preppi logo" />
                        <p className="text-sm mt-1">&copy; VisionFive 2024</p>
                    </div>
                </div>
            </div>
            <Link href="#" className="bg-theme-orange-500 hover:bg-theme-orange-700 transition-colors flex">
                <div className="standard-page text-right">
                    <span className="text-white font-medium text-lg">Go to top &nbsp; <FontAwesomeIcon icon={faArrowUp} /></span>
                </div>
            </Link>
        </footer>
    )
}