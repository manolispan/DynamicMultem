import classes from "./navbar.module.css";
import Link from "next/link";

function Navbar() {
    return <>
    <nav className={classes.navbar}>
    <Link href="/"><a><div className={classes.navfile}>File</div></a></Link>
    <div><Link href="/single"><a><span className={classes.navfile}>Single Scatterer</span></a></Link>
    <Link href="/"><a><span className={classes.navfile}>Multiple Scattering</span></a></Link>
    <Link href="/"><a><span className={classes.navfile}>Results</span></a></Link>
    </div>
    <div className={classes.rightside}>
      <div className={classes.navfile}><i className="fa fa-question-circle" aria-hidden="true"/> help</div>
      <div className={classes.loginnav}>Login</div>
    </div>
    
  </nav></>
}

export default Navbar;