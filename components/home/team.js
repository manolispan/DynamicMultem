import Link from "next/link";
import { useInView } from "react-intersection-observer";


export default function Team () {

    const { ref, inView, entry } = useInView({
        threshold: 1,
        triggerOnce: true
      });

return <section class="py-24 bg-gray-50 md:py-48 relative">
{/*   <div className="absolute w-full h-full top-0 left-0 opacity-5">
<img
src="/photos/lines.svg"
className="h-full w-full object-cover"
/>
</div> */}
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center flex-col lg:flex-row md:mt-20 md:mb-20">
        <div class="w-full lg:w-1/2">
            <h2 
                class="font-manrope text-5xl text-gray-900 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                The Minds Behind the Science</h2>
            <p class="text-lg text-gray-500 mb-16 text-center lg:text-left">
              Meet our team.</p>
            <button
            ref={ref}
            class="cursor-pointer py-3 px-8 w-60 bg-blue-600
             text-white text-base font-semibold transition-all duration-500 
             block text-center rounded-2xl hover:bg-blue-800 mx-auto lg:mx-0
             border-none">
              Contact Us</button>
        </div>

        <div class="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">

            <div class="grid grid-cols-3 grid-rows-2 gap-8">


               
                
              <div class="w-44 h-56 rounded-2xl object-cover  
              mx-auto  relative overflow-hidden
              group/edit col-start-1 col-end-2 row-start-1 row-span-2 justify-center items-center self-center
              ">                        
               <Link href="/team">
               <a className={`opacity-0 text-transparent 
               ${inView && "animate-fade-up animate-once animate-delay-200 animate-ease-linear animate-fill-forwards"} `}>
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300 animate-delay-200"
                src="/photos/almpanis-evangelos.jpg" alt="Team tailwind section"
                     />
                <div
                className=" px-2 py-1 
                flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div className="text-transparent group-hover/edit:text-white">John Doe</div>
                  <div className="text-xs text-transparent group-hover/edit:text-white">Senior Developer</div>
                  
                </div></a></Link>
                    </div>
                


               

                    <div class="w-44 h-56 rounded-2xl object-cover  
              mx-auto  relative overflow-hidden
              group/edit col-start-2 col-end-2 row-start-1 
              ">                        
               <Link href="/team">
               <a className={`opacity-0 text-transparent 
               ${inView && "animate-fade-up animate-once animate-delay-100 animate-ease-linear animate-fill-forwards"} `}>
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="/photos/panagiotidis-manolis.jpg" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 
                flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div className="text-transparent group-hover/edit:text-white">John Doe</div>
                  <div className="text-xs text-transparent group-hover/edit:text-white">Senior Developer</div>
                  
                </div></a></Link>
                    </div>
               


                    <div class="w-44 h-56 rounded-2xl object-cover  
              mx-auto  relative overflow-hidden
              group/edit col-start-2 col-end-3 row-start-2 
              ">                        
               <Link href="/team">
               <a className={`opacity-0 text-transparent 
               ${inView && "animate-fade-up animate-once animate-delay-300 animate-ease-linear animate-fill-forwards"} `}>
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300 "
                src="/photos/nikolaos-stefanou.jpg" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 
                flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div className="text-transparent group-hover/edit:text-white">John Doe</div>
                  <div className="text-xs text-transparent group-hover/edit:text-white">Senior Developer</div>
                  
                </div></a></Link>
                    </div>

              

                    <div class="w-44 h-56 rounded-2xl object-cover  
              mx-auto  relative overflow-hidden
              group/edit col-start-3 col-end-4 row-start-1 row-end-3 items-center justify-center self-center
              ">                        
               <Link href="/team">
               <a className={`opacity-0 text-transparent 
               ${inView && "animate-fade-up animate-once animate-delay-[400ms] animate-ease-linear animate-fill-forwards"} `}>
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300 "
                src="/photos/papanikolaou-nikolaos.jpg" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 
                flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div className="text-transparent group-hover/edit:text-white">John Doe</div>
                  <div className="text-xs text-transparent group-hover/edit:text-white">Senior Developer</div>
                  
                </div></a></Link>
                    </div>






               
            </div>
        </div>
    </div>
</div>
</section>
            
        
        
        }