import Link from "next/link";
import Hero from "../components/home/hero";
import Team from "../components/home/team";
import Hood from "../components/home/underthehood";

export default function Home() {
    return <div className="min-h-screen"> 

<Hero/>
<Hood/>
<Team/>


       
    </div>
}