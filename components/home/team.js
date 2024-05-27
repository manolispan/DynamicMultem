import Link from "next/link";

export default function Team () {
return <section class="py-24 bg-gray-50">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center flex-col lg:flex-row md:mt-20 md:mb-20">
        <div class="w-full lg:w-1/2">
            <h2
                class="font-manrope text-5xl text-gray-900 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                The Minds Behind the Science</h2>
            <p class="text-lg text-gray-500 mb-16 text-center lg:text-left">
              Meet our team.</p>
            <button class="cursor-pointer py-3 px-8 w-60 bg-blue-600
             text-white text-base font-semibold transition-all duration-500 
             block text-center rounded-2xl hover:bg-blue-800 mx-auto lg:mx-0
             border-none">
              Contact Us</button>
        </div>

        <div class="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">

            <div class="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-8">


               <Link href="/team"><a className="text-transparent">
              <div class="w-44 h-56 rounded-2xl object-cover md:mt-20 
              mx-auto min-[450px]:mr-0 relative overflow-hidden
              group/edit
              ">                        
               
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238644.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 
                flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div></a>
                </Link>


                <Link href="/team"><a className="text-transparent">

                    <div class="w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mx-auto 
                    relative overflow-hidden group/edit">                        
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238665.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 flex flex-col bg-trasparent text-trasparent w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div>
                    </a>
                </Link>


                <Link href="/team"><a className="text-transparent">

                    <div class="w-44 h-56 rounded-2xl object-cover md:mt-20 mx-auto 
                    min-[450px]:mr-0 md:ml-0 relative overflow-hidden group/edit">                        
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238684.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 flex flex-col bg-trasparent text-trasparent  w-full
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500
                ">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div>
                    </a>
                </Link>

              
                <Link href="/team"><a className="text-transparent">
                    <div class="w-44 h-56 rounded-2xl object-cover mx-auto 
                    min-[450px]:ml-0 md:mr-0 md:ml-auto relative overflow-hidden group/edit">                        
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238684.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 flex flex-col bg-trasparent text-trasparent w-full 
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div>
                    </a>
                </Link>


                <Link href="/team"><a className="text-transparent">
                    <div class="w-44 h-56 rounded-2xl object-cover 
                    md:-mt-20 mx-auto min-[450px]:mr-0 md:mx-auto relative 
                    overflow-hidden group/edit">                        
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238720.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 flex flex-col bg-trasparent text-trasparent  w-full 
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div>
                    </a>
                </Link>


                <Link href="/team"><a className="text-transparent">
                    <div class="w-44 h-56 rounded-2xl 
                    object-cover 
                    mx-auto min-[450px]:ml-0 md:mr-0 relative 
                    overflow-hidden group/edit">                        
                <img 
                class="w-44 h-56 rounded-2xl object-cover group-hover/edit:scale-110 transition-all duration-300"
                src="https://pagedone.io/asset/uploads/1696238737.png" alt="Team tailwind section"
                     />
                <div
                className="absolute bottom-0 left-0 px-2 py-1 flex flex-col bg-trasparent text-trasparent  w-full 
                group-hover/edit:bg-black group-hover/edit:text-white transition-all duration-500">
                  <div>John Doe</div>
                  <div className="text-xs">Senior Developer</div>
                  
                </div>
                    </div>
                    </a>
                </Link>
               
            </div>
        </div>
    </div>
</div>
</section>
            
        
        
        }