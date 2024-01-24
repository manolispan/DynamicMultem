import classes from './confirmprompt.module.css';
import Link from 'next/link';

function ConfirmPromptMain(props) {


    return (       <>  <div className={classes.backdrop}
      onClick={props.back}></div>  
        <div className={classes.promptpage}>
<div className={classes.text
}>Θέλω να δω:</div>
            
            <div className={classes.flexbuttons}> 
<Link href="/findschool"><div>Σχολές</div></Link>
<Link href="/findteacher"><div>Δασκάλους</div></Link>


            </div>

        </div>
</> 
    )
    }

export default ConfirmPromptMain;