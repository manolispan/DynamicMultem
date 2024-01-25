import classes from "./loadingPrompt.module.css";


function LoadingPrompt(props) {


    return (       <>    <div className={classes.backdrop}></div>
        <div className={classes.promptpage}>
{/* <div className={classes.text
}>Loading...</div>  */}

        </div>
</> 
    )
    }


export default LoadingPrompt;



