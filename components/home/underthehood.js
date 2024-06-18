import Link from "next/link";
import { useInView } from "react-intersection-observer";


export default function Hood () {

    const { ref, inView, entry } = useInView({
        threshold: 1,
        triggerOnce: true
      });

return <section class="py-24 bg-slate-200 relative">

  <div className="z-30 top-0 
  left-0 opacity-100 mt-40 w-full text-center 
  font-manrope  mb-7 
  
  ">
    <div
    className=" text-5xl  font-bold leading-[4rem]
    pb-4  text-transparent sm:text-5xl bg-clip-text bg-gradient-to-br 
    from-blue-200 via-blue-700 to-blue-900 
    "
    >Blazing Fast And lightweight</div>


    <img
    src="/photos/lightning.svg"
    className={`w-36 pt-10 pb-5  ${inView ? "animate-flip-down opacity-60" : "opacity-0"} `}
    
    />
    
    <div ref={ref}
    className="text-lg max-w-4xl text-center m-auto mt-10
    
    "
    >We use the T-Matrix based LMS approach to calculate the frequency band structure of an infinite photonic crystal, and 
        of the transmission, reflection and absorption coefficients of light by a 
        slab of this crystal.</div>


    <div
    className="mx-auto max-w-7xl px-4 my-20 flex flex-col justify-center gap-10 text-left text-white md:my-32 md:flex-row"
    
    >



<div className={`border-border border-solid
 border-slate-300
relative flex grow flex-col overflow-clip rounded border px-8 py-10 md:basis-96 bg-white text-black
${inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}
>
<div className="relative z-[1] flex grow flex-col">
<h3 className="text-2xl text-pretty mb-5 grow md:mb-10">

T matrix Based Method
</h3>

<ul
className="mt-auto flex flex-col gap-4 list-none pl-0"
>
<li className="mb-4">
<button
            ref={ref}
            class="cursor-pointer py-2 px-6  bg-blue-600
             text-white text-base font-semibold transition-all duration-500 
             block text-center rounded-xl hover:bg-blue-800 mx-auto lg:mx-0
             border-none">
              About T Matrix method</button>
</li>
<li className="mb-4">
<span class="block text-7xl">1000x</span>
<span class="text-xl text-pretty">faster than finite elements methods</span>
</li>
<li className="mt-auto">
<span class="block text-7xl">100x</span>
<span class="text-xl text-pretty grow">lower resources needed</span>
</li>


</ul>

</div>

<div className="absolute w-full h-full top-0 left-0 opacity-5">
<img
src="/photos/triangles.svg"
className="h-full w-full object-cover"
/>
</div>

</div>

<div className={`border-border border-solid
 border-slate-300 relative flex grow flex-col overflow-clip rounded border 
 px-8 py-10 md:basis-96 bg-blue-500 text-slate-100
 ${inView ? "animate-fade-up animate-delay-200": "opacity-0"}`}
 >
<div className="relative z-[1] flex grow flex-col">
<h3 class="text-2xl text-pretty mb-5 grow md:mb-10">Battle tested for research reliability</h3>

<ul
className="mt-auto flex flex-col gap-4 list-none pl-0"
>

<li className="mb-4">

<span class="mt-auto block text-5xl">500+</span>
<span class="text-xl mb-5">publications</span>
</li>
<li className="mt-auto">
<span class="mt-auto block text-5xl">1000+</span>
<span class="text-xl mb-0 ml-1 grow">references</span>
</li>


</ul>

</div>

<div className="absolute w-full h-full top-0 left-0 opacity-5">
<img
src="/photos/triangles.svg"
className="h-full w-full object-cover"
/>
</div>


</div>


<div className={`border-border border-solid
 border-slate-300 relative flex grow flex-col overflow-clip 
 rounded border px-8 py-10 md:basis-96 bg-slate-900 text-slate-100 
 ${inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
<div className="relative z-[1] flex grow flex-col">
<h3 class="text-2xl text-pretty mb-5 grow md:mb-10

">Now can be used for spatiotemporal materials</h3>

<ul
className="mt-auto flex flex-col gap-4 list-none pl-0"
>

<li className="mb-4">
<span class="mt-auto block text-5xl">Infinite</span>
<span class="text-xl mb-5">opportunities for novel research</span>
</li>



</ul>

</div>

<div className="absolute w-full h-full top-0 left-0 opacity-5">
<img
src="/photos/triangles.svg"
className="h-full w-full object-cover"
/>
</div>

</div>


    </div>
    
    </div> 
    

</section>
            
        
        
        }