import Link from "next/link";
import { useRouter } from 'next/router';

function Footer() {

    const router = useRouter();

    return (
        <div className={router.asPath=="/signup" ||  router.asPath=="/signup/teachers" ||
        router.asPath=="/signup/schools" || router.asPath=="/signup/visitors"
        ? 
        "pb-0 relative z-0 w-full bg-black "  : "pb-[40px] eight:pb-[60px] relative z-0 w-full bg-neutral-900" }>









        <div className=" text-slate-100 pb-16 pt-6 px-2 flex  
        items-start justify-evenly w-full flex-wrap md:pb-28 md:pt-16 md:max-w-5xl md:mx-auto">


        <div className="text-sm md:text-base px-2 w-1/2 text-center md:w-auto">
<h3 className="mb-2 mt-8 font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300 to-blue-700">Calculate Modes</h3>
<Link href={"/single"}><div className="py-1 cursor-pointer hover:text-blue-300" >Single Scaterrer</div></Link>
<Link href={"/"}><div className="py-1 cursor-pointer hover:text-blue-300">Mulitple Scattering</div></Link>

        </div>



        <div  className="text-sm px-2 w-1/2 text-center md:text-base md:w-auto">
<h3 className="mb-2 mt-8 font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300 to-blue-700">Misc</h3>
<Link href={"/"}><div className="py-1 cursor-pointer hover:text-blue-300">Publications</div></Link>
<Link href={"/"}><div className="py-1 cursor-pointer hover:text-blue-300">About the Method</div></Link>
<Link href={"/"}><div className="py-1 cursor-pointer hover:text-blue-300">Help-Manual</div></Link>


        </div>






        </div>






<div className="p-2 flex text-slate-200 w-full justify-evenly text-xs md:text-sm md:max-w-5xl md:mx-auto md:mb-4 ">


<Link href={"/faqs"}><div className="cursor-pointer hover:text-purple-400">FAQ</div></Link>

<Link href={"/contact"}><div className="cursor-pointer hover:text-purple-400">Contact</div></Link>

<Link href={"/privacy"}><div className="cursor-pointer hover:text-purple-400">Privacy</div></Link>

<Link href={"/introduce"}><div className="cursor-pointer hover:text-purple-400">Our Team</div></Link>



        </div>


        <div class=" w- h-0.5 mb-2 bg-gradient-to-r from-neutral-900 via-blue-600/80 to-neutral-900 z-80 md:mb-4"></div>

<div className=" text-xs text-slate-100 px-2 pb-2 md:text-sm md:mb-4 text-center" >
2024 &copy; designed by M. Panagiotidis. Built using next.js supported by node.js, 
            running with docker.
</div>

        </div>
    )
}

export default Footer

