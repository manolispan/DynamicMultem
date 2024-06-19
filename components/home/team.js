import Link from "next/link";
import { useInView } from "react-intersection-observer";


export default function Team () {

    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        triggerOnce: true
      });

return <section class="py-20 bg-gray-50 md:py-40 relative">
{/*   <div className="absolute w-full h-full top-0 left-0 opacity-5">
<img
src="/photos/lines.svg"
className="h-full w-full object-cover"
/>
</div> */}
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-start flex-col  md:mt-20 md:mb-20">
        <div class="w-full ">
            <h2  
                class="font-manrope leading-normal text-4xl md:text-5xl text-gray-900 font-bold md:leading-[4rem] mb-6 text-center mt-0 ">
                The Minds Behind the Science</h2>
            <p class="text-lg text-gray-500 mb-8 md:mb-16 text-center ">
              Meet our team.</p>

        </div>


        <div
        ref={ref}
        class={`w-full  lg:mt-0 md:mt-40 mt-16 ${inView ? "animate-fade-up animate-delay-200": "opacity-0"}`}>

           


       <div className="flex flex-col xl:flex-row xl:my-32 flex-wrap items-center justify-center">



                      <div class= {` max-w-[280px] sm:max-w-none mb-24 sm:mb-12 xl:mb-0 sm:h-60  object-cover  
              ml-0 sm:rounded-l-2xl  relative overflow-hidden 
              group/edit border w-full xl:w-1/2 xl:pr-10 
             
             `} >                        
               <Link href="/team">
               <a className={`  
               flex flex-col sm:flex-row no-underline text-black bg-slate-100 pt-6 sm:pt-0 border border-solid rounded-2xl sm:rounded-r-2xl border-slate-300 sm:border-0
               
               `}>
                <img 
                class="w-44 h-44 mx-auto sm:w-44 sm:h-60 rounded-full  sm:rounded-t-none sm:rounded-b-none  sm:rounded-l-2xl object-cover"
                src="/photos/panagiotidis-manolis.jpg" alt="Team tailwind section"
                     />
                <div
                className=" px-5 py-6 border sm:border-solid sm:rounded-r-2xl border-slate-300
                flex flex-col   w-full bg-slate-100
                
                ">
                  <div className=" text-xl font-semibold ">Panagiotidis Manolis</div>
                  <div className=" text-slate-700 py-1 ">Dr. Physics, FullStack Developer</div>
                  <div
                  className="text-slate-600 py-4"
                  >Creator of the UI, backend and website. Contributions to the Fortran Code Development.</div>
                </div>
                
                
                <button type="button" 
                className=" rounded-b-xl
                sm:absolute sm:bottom-0 sm:right-0 xl:right-10
                border-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium sm:rounded-lg 
                 text-sm px-5 py-2.5 text-center sm:me-2 sm:mb-2">
                  Contact</button>
                
                </a></Link>
                    </div>
                

                    <div class= {` max-w-[280px] sm:max-w-none mb-24 sm:mb-12 xl:mb-0 sm:h-60  object-cover  
              ml-0 sm:rounded-l-2xl  relative overflow-hidden 
              group/edit border w-full xl:w-1/2 xl:pl-10
              
             `} >                        
               <Link href="/team">
               <a className={`  
               flex flex-col sm:flex-row no-underline text-black bg-slate-100 pt-6 sm:pt-0 border border-solid rounded-2xl sm:rounded-r-2xl border-slate-300 sm:border-0
               
               `}>
                <img 
                class="w-44 h-44 mx-auto sm:w-44 sm:h-60 rounded-full  sm:rounded-t-none sm:rounded-b-none  sm:rounded-l-2xl object-cover"
                src="/photos/almpanis-evangelos.jpg" alt="Team tailwind section"
                     />
                <div
                className=" px-5 py-6 border sm:border-solid sm:rounded-r-2xl border-slate-300
                flex flex-col   w-full bg-slate-100
                
                ">
                  <div className=" text-xl font-semibold ">Almpanis Evangelos</div>
                  <div className=" text-slate-700 py-1 ">Dr. Applied Physics</div>
                  <div
                  className="text-slate-600 py-4"
                  >Contributions to the UI and the Fortran Code Development.</div>
                </div>
                
                
                <button type="button" 
                className=" rounded-b-xl
                sm:absolute sm:bottom-0 sm:right-0
                border-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium sm:rounded-lg 
                 text-sm px-5 py-2.5 text-center sm:me-2 sm:mb-2">
                  Contact</button>
                
                </a></Link>
                    </div>
                

      
        </div>        



        <div className="flex flex-col xl:flex-row xl:my-20 flex-wrap items-center justify-center">



<div class= {` max-w-[280px] sm:max-w-none mb-24 sm:mb-12 xl:mb-0 sm:h-60  object-cover  
ml-0 sm:rounded-l-2xl  relative overflow-hidden 
group/edit border w-full xl:w-1/2 xl:pr-10 

`} >                        
<Link href="/team">
<a className={`  
  flex flex-col sm:flex-row no-underline text-black bg-slate-100 pt-6 sm:pt-0 border border-solid rounded-2xl sm:rounded-r-2xl border-slate-300 sm:border-0 

`}>
<img 
                class="w-44 h-44 mx-auto sm:w-44 sm:h-60 rounded-full  sm:rounded-t-none sm:rounded-b-none  sm:rounded-l-2xl object-cover"
src="/photos/papanikolaou-nikolaos.jpg" alt="Team tailwind section"
/>
<div
className=" px-5 py-6 border sm:border-solid sm:rounded-r-2xl border-slate-300
flex flex-col   w-full bg-slate-100

">
<div className=" text-xl font-semibold ">Nikolaos Papanikolaou</div>
<div className=" text-slate-700 py-1 ">Research Director, NCSR “Demokritos”</div>
<div
className="text-slate-600 py-4"
>Significant contributions to the Fortran Code for many years.</div>
</div>


<button type="button" 
className=" rounded-b-xl
sm:absolute sm:bottom-0 sm:right-0 xl:right-10
border-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
focus:ring-blue-300 dark:focus:ring-blue-800 font-medium sm:rounded-lg 
text-sm px-5 py-2.5 text-center sm:me-2 sm:mb-2">
Contact</button>

</a></Link>
</div>


<div class= {` max-w-[280px] sm:max-w-none mb-12 xl:mb-0 sm:h-60  object-cover  
ml-0 sm:rounded-l-2xl  relative overflow-hidden 
group/edit border w-full xl:w-1/2 xl:pl-10

`} >                        
<Link href="/team">
<a className={`  
flex flex-col sm:flex-row no-underline text-black bg-slate-100 pt-6 sm:pt-0 border border-solid rounded-2xl sm:rounded-r-2xl border-slate-300 sm:border-0 

`}>
<img 
                class="w-44 h-44 mx-auto sm:w-44 sm:h-60 rounded-full  sm:rounded-t-none sm:rounded-b-none  sm:rounded-l-2xl object-cover"
src="/photos/nikolaos-stefanou.jpg" alt="Team tailwind section"
/>
<div
  className=" px-5 py-6 border sm:border-solid sm:rounded-r-2xl border-slate-300
flex flex-col   w-full bg-slate-100

">
<div className=" text-xl font-semibold ">Stefanou Nikolaos</div>
<div className=" text-slate-700 py-1 ">Professor of Physics, NKUA</div>
<div
className="text-slate-600 py-4"
>One of the original authors of the first Multem program and Significant contributor until now.</div>
</div>


<button type="button" 
className=" rounded-b-xl
sm:absolute sm:bottom-0 sm:right-0
border-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
focus:ring-blue-300 dark:focus:ring-blue-800 font-medium sm:rounded-lg 
text-sm px-5 py-2.5 text-center sm:me-2 sm:mb-2">
Contact</button>

</a></Link>
</div>



</div>        












               
            
        </div>
    </div>
</div>
</section>
            
        
        
        }