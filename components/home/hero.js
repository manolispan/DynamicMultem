import Link from "next/link";
import { useInView } from "react-intersection-observer";
export default function Hero () {


   const { ref, inView, entry } = useInView({
      threshold: 1,
      triggerOnce: true
    });

return <div className="min-h-screen overflow-hidden bg-[url('/photos/hero3.jpg')]">

{/* <img
src="/photos/hero3.jpg"
className="w-full h-full object-cover  -z-10 absolute "
/> */}

<div className="flex flex-col items-center justify-center pt-28 sm:pt-40 pb-16">

<div className="flex flex-col items-center justify-center p-5
">
<div
className="text-5xl text-white md:text-7xl font-bold  pb-10"
>Photon Scatter Solvers   </div>

<div 
ref={ref}
className={`text-white flex-1`}>Cutting-edge computational tools designed for full-wave, fast and efficient electromagnetic wave scattering calculations
</div>

</div>

<div className="flex flex-row flex-wrap gap-4 items-start justify-between w-full px-5 m-auto max-w-lg pt-5">

<Link href="/single">
<button className={`text-base sm:m-5 border-none bg-blue-600 hover:bg-blue-800 text-white  py-2 px-4 rounded hover:cursor-pointer sm:text-lg opacity-0 ${inView && "animate-fade-up animate-once animate-delay-100 animate-ease-linear animate-fill-forwards"}`}>
 Single Scatterer
</button>
</Link>

<Link href="/multiple-scattering">
<button className={`text-base sm:m-5 border-none bg-blue-600 hover:bg-blue-800 text-white  py-2 px-4 rounded hover:cursor-pointer sm:text-lg opacity-0 ${inView && "animate-fade-up animate-once animate-delay-300 animate-ease-linear animate-fill-forwards"}`}>
 Multiple Scattering
</button>
</Link>

</div>

<img
           className="pt-14 sm:pt-24 w-56 sm:w-auto"
           src="/photos/hero4.png"
           />




</div>

</div>

        
        
        
        
        }