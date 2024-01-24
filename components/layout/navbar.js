import classes from "./navbar.module.css";
import Link from "next/link";
import { useState} from "react";

function Navbar() {
  const [fileOptions,setFileOptions]=useState(false);





    return <>
    <nav className={classes.navbar}>
    {fileOptions && 
    <div className={classes.fileoptions}>
      <div className={classes.closeFile}
      onClick={()=>setFileOptions(false)}
      >X</div>
      <div>Load Input</div>
      <div>Save Input - Results</div>
      </div>}
    <div className={classes.navfile}
    onClick={()=>setFileOptions(true)}
    >File

    
    </div>
    <div><Link href="/single"><a><span className={classes.navfile}>Single Scatterer</span></a></Link>
    <Link href="/"><a><span className={classes.navfile}>Multiple Scattering</span></a></Link>
    <Link href="/single/results"><a><span className={classes.navfile}>Results</span></a></Link>
    </div>
    <div className={classes.rightside}>
      <div className={classes.navfile}><i className="fa fa-question-circle" aria-hidden="true"/> help</div>
      <div className={classes.loginnav}>Login</div>
    </div>
    
  </nav></>
}

export default Navbar;