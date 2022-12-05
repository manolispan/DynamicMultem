import classes from './confirmprompt.module.css';

function ConfirmPrompt(props) {


    return (       <>  {props.back? <div className={classes.backdrop}
      onClick={props.back}></div> : <div className={classes.backdrop}
      onClick={props.cancel}></div>}  
        <div className={classes.promptpage}
        style = {{top : props.top ? props.top : null}}>
<div className={classes.text
}>{props.text}</div>
            
            <div className={classes.flexbuttons}> 
<div onClick={props.ok}>{props.yestext ? props.yestext : "Ναι"}</div>
{props.onebutton? null:<div onClick={props.cancel}>{props.notext ? props.notext : "Όχι"}</div>}


            </div>

        </div>
</> 
    )
    }

export default ConfirmPrompt;