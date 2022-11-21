import classes from './layer.module.css';
import { useEffect,useState,useRef } from 'react';
import SphereGeometry from './sphere';
import AllSpheres from './allspheres';
import Card from '../ui/card';

function Layer(props) {
    const type=props.type;
    const layer=props.layer
    const dr=props.dr
    const a1xRef=useRef();
    const a1yRef=useRef();
    const a2xRef=useRef();
    const a2yRef=useRef();
    const drRef=useRef();
    

    useEffect(()=>
   {
    /* if (props.periodicBase[layer][0] && props.periodicBase[layer][0]!="")
    {document.getElementById("layer"+layer+"a1x").value=parseFloat(props.periodicBase[layer][0]) ;
}

if (props.periodicBase[layer][1] && props.periodicBase[layer][1]!="")
{document.getElementById("layer"+layer+"a1y").value=parseFloat(props.periodicBase[layer][1]) ;
}

if (props.periodicBase[layer][2] && props.periodicBase[layer][2]!="")
{document.getElementById("layer"+layer+"a2x").value=parseFloat(props.periodicBase[layer][2]) ;
}

if (props.periodicBase[layer][3] && props.periodicBase[layer][3]!="")
{document.getElementById("layer"+layer+"a2y").value=parseFloat(props.periodicBase[layer][3]) ;
}
*/
if (props.dr[layer] && props.dr[layer]!="")
{document.getElementById("layer"+layer+"dr").value=parseFloat(props.dr[layer]) ;
} 




   } 
    ,[])



    const PassValues= (layer,scatterer,sphere)=> {

        
        props.onChange(layer,scatterer,sphere);
    
    }

    const PassValues2 = ()=>{
        //const a1=[a1xRef.current.value,a1yRef.current.value,a2xRef.current.value,a2yRef.current.value]
        props.passArrayBase(props.layer,drRef.current.value)
    }

    const noSpheres=(number)=>{
        props.noSpheres(number,layer);

    }

    return <div className={classes.page}>
      <h4>Environment constants</h4>
              <div>
          ε = <input type="number" defaultValue={1} />+{" "}
          <input type="number" defaultValue={1}/>i
        </div>
        <div>
          μ = <input type="number"  
          defaultValue={1}/>+{" "}
          <input type="number"    
          defaultValue={1}/>i
        </div>
{type=="periodic" &&  <>
{/* <h4>Base Vectors</h4>
<div>
              a1x = <input type="number" id={"layer"+layer+"a1x"}  
              ref={a1xRef}
              onChange={PassValues2}/>
              a1y = <input type="number" id={"layer"+layer+"a1y"} 
              ref={a1yRef}
              onChange={PassValues2} />
            </div>
            <div>
              a2x = <input type="number" id={"layer"+layer+"a2x"} 
              ref={a2xRef}
              onChange={PassValues2}/>
              a2y = <input type="number" id={"layer"+layer+"a2y"} 
              ref={a2yRef} 
              onChange={PassValues2}/>
            
            </div> */}
            distance from previous layer = <input type="number" id={"layer"+layer+"dr"} 
              ref={drRef}
              onChange={PassValues2}
              defaultValue={dr[layer]}/>
            <div>


            </div>
            <AllSpheres layer={layer} 
            onChange={PassValues}
            noSpheres={noSpheres}
            totalScat={props.totalScat}
            layersScaterrers={props.layersScaterrers}
            /></> }

</div>
    






}

export default Layer;