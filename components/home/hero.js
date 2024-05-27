import Link from "next/link";

export default function Hero () {
return <div className="min-h-screen overflow-hidden bg-[url('/photos/hero3.jpg')]">

{/* <img
src="/photos/hero3.jpg"
className="w-full h-full object-cover  -z-10 absolute "
/> */}

<div className="flex flex-col items-center justify-center pt-40 pb-16">

<div className="flex flex-col items-center justify-center p-5
">
<div
className=" text-white text-7xl font-bold  pb-10"
>EM wave scattering </div>

<div className="text-white flex-1">Find the scattering parameters of a single particle or from a 
   periodic geometry.
</div>

</div>

<div className="flex flex-row">

<Link href="/single">
<button className="m-5 border-none bg-blue-600 hover:bg-blue-800 text-white  py-2 px-4 rounded hover:cursor-pointer text-lg">
 Single Scatterer
</button>
</Link>

<Link href="/multiple-scattering">
<button className="m-5 border-none bg-blue-600 hover:bg-blue-800 text-white  py-2 px-4 rounded hover:cursor-pointer text-lg">
 Multiple Scattering
</button>
</Link>

</div>

<img
           className=" pt-24 "
           src="/photos/hero4.png"
           />




</div>

</div>

        
        
        
        
        }