import { useEffect,useState,useRef } from 'react';
import SphereGeometry from './sphere';
import classes from './allspheres.module.css'

function AllSpheres(props) {
    const layer=props.layer;
    const [numberOfSpheres,setNumberOfSpheres]=useState();




    const PassValues= (layer,scatterer,sphere)=> {

        
        props.onChange(layer,scatterer,sphere);
        
    
    }

   

    useEffect(()=>{
        const number= parseInt(props.totalScat[layer]) ;
        setNumberOfSpheres(number);

    },[props.totalScat[layer]])

    return <div className={classes.page}>
   <div>
  How many spheres per base : 
  <input type="number" min="1" id={"noSpheres" + layer} defaultValue={parseInt(props.totalScat[layer])}
    onChange={()=>{setNumberOfSpheres(document.getElementById("noSpheres" + layer).value);
    props.noSpheres(document.getElementById("noSpheres" + layer).value);
}}
  />
</div>
    
<div className={classes.allspheres}>
{numberOfSpheres>0 && <SphereGeometry layer={layer} scatterer={0} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}


{numberOfSpheres>1 && <SphereGeometry layer={layer} scatterer={1} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>2 && <SphereGeometry layer={layer} scatterer={2} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>3 && <SphereGeometry layer={layer} scatterer={3} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>4 && <SphereGeometry layer={layer} scatterer={4} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>5 && <SphereGeometry layer={layer} scatterer={5} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>6 && <SphereGeometry layer={layer} scatterer={6} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}

{numberOfSpheres>7 && <SphereGeometry layer={layer} scatterer={7} onChange={PassValues}
layersScaterrers={props.layersScaterrers}
/>}
</div>




</div>
}

export default AllSpheres;