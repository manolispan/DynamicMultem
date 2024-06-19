import classes from "./navbar.module.css";
import Link from "next/link";
import { useState,useEffect} from "react";

function Navbar() {
  const [fileOptions,setFileOptions]=useState(false);

  const [navBg, setNavBg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  
  const handleClick = () => {
      setIsOpen(!isOpen);
  };

  const changeNavBg = () => {
   window.scrollY >= 800 ? setNavBg(true) : setNavBg(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    }
  }, [])



    return <nav>
    <div className={navBg ? classes.navbarbg : classes.navbar}>
    {fileOptions && 
    <div className={classes.fileoptions}>
      <div className={classes.closeFile}
      onClick={()=>setFileOptions(false)}
      >X</div>
      <div>Load Input</div>
      <div>Save Input - Results</div>
      </div>}
    <div className={classes.navfile}
   /*  onClick={()=>setFileOptions(true)} */
    ><i class="fa fa-lock" aria-hidden="true"/> File

    
    </div>
    <div>
    <Link href="/"><a><span className={classes.navfile}>Home</span></a></Link>
    <Link href="/single"><a><span className={classes.navfile}>Single Scatterer</span></a></Link>
    <Link href="/multiple-scattering"><a><span className={classes.navfile}>Multiple Scattering</span></a></Link>
    <Link href="/single/results"><a><span className={classes.navfile}>Results</span></a></Link>
    </div>
    <div className={classes.rightside}>
      <div className={classes.navfile}><i className="fa fa-question-circle" aria-hidden="true"/> help</div>
      <div className={classes.loginnav}>Login</div>
    </div>
    
  </div>
  

<div className="lg:hidden">

<button class="group h-14 w-14 bg-slate-50 rounded-full border-0 z-50 fixed top-4 left-2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
onClick={handleClick}
>
	<div class="grid justify-items-center gap-1.5">
 
    <span class={`h-1 w-8 rounded-full bg-blue-700 transition ${isOpen && "rotate-45 translate-y-2.5"}`}></span>
    
    <span class={`h-1 w-8 rounded-full bg-blue-700 ${isOpen && "scale-x-0"} transition`}></span>
 
    <span class={`h-1 w-8 rounded-full bg-blue-700 ${isOpen && "-rotate-45 -translate-y-2.5"}`}></span>
  </div>
</button>


<img 
className={`fixed top-0 left-0 z-40 h-screen w-full object-cover opacity-20 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition pt-20`}
src="/photos/menu.svg" />


<div 
className={`flex flex-col bg-neutral-800 text-slate-100 fixed top-0 left-0 h-screen w-full z-30 pt-40 px-10 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition`}
>

<Link href={"/"}>
  <a className="text-slate-100 no-underline p-2 text-xl">
    Home
  </a>
</Link>


<Link href={"/single"}>
  <a className="text-slate-100 no-underline p-2 text-xl">
    Single Scatterer
  </a>
</Link>


<Link href={"/multiple-scattering"}>
  <a className="text-slate-100 no-underline p-2 text-xl">
  Multiple Scattering
  </a>
</Link>

<Link href={"/single/results"}>
  <a className="text-slate-100 no-underline p-2 text-xl">
  Results
  </a>
</Link>


</div>


</div>

  
  </nav>
}

export default Navbar;