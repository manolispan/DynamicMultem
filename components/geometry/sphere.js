import classes from './sphere.module.css';
import { useEffect,useState,useRef } from 'react';

function SphereGeometry(props) {
    const layer=props.layer;
    const scatterer =props.scatterer;
    const epsRealRef=useRef();
    const epsImRef=useRef();
    const muRealRef=useRef();
    const muImRef=useRef();
    const radRef=useRef();
    const posXRef=useRef();
    const posYRef=useRef();
    const posZRef=useRef();
    const vibAmplRef=useRef();


    const PassValues= ()=> {

        const eps = [epsRealRef.current.value,epsImRef.current.value];
        const mu = [muRealRef.current.value,muImRef.current.value];
        const position = [parseFloat(posXRef.current.value),parseFloat(posYRef.current.value),
            parseFloat(posZRef.current.value)]
        const vibAmpl = vibAmplRef.current.value
        const sphere ={
            type : "sphere",
            layer :layer ,
            scatterer : scatterer,
            eps : eps,
            mu : mu,
            rad : parseFloat(radRef.current.value),
            position : position,
            vibAmpl : vibAmpl,
        }
    
        
        props.onChange(layer,scatterer,sphere);
    
    }

useEffect(()=>{
if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"epsr").value=
props.layersScaterrers[layer][scatterer]["eps"][0]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"epsi").value=
props.layersScaterrers[layer][scatterer]["eps"][1]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"mur").value=
props.layersScaterrers[layer][scatterer]["mu"][0]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"mui").value=
props.layersScaterrers[layer][scatterer]["mu"][1]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"rad").value=
props.layersScaterrers[layer][scatterer]["rad"]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"x").value=
props.layersScaterrers[layer][scatterer]["position"][0]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"y").value=
props.layersScaterrers[layer][scatterer]["position"][1]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"z").value=
props.layersScaterrers[layer][scatterer]["position"][2]}

if (props.layersScaterrers[layer][scatterer] && props.layersScaterrers[layer][scatterer]!="")
{document.getElementById("layer"+layer+"scatterer"+scatterer+"h").value=
props.layersScaterrers[layer][scatterer]["vibAmpl"]}

}
,[])


    return <div className={classes.page}>
        <h3>scatterer {scatterer+1}</h3>

    <div>ε = <input type="number" ref={epsRealRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"epsr"}
    />+ 

    <input type="number" ref={epsImRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"epsi"}
    />i</div>

    <div>μ = <input type="number" ref={muRealRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"mur"}
    />+ 

    <input type="number" ref={muImRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"mui"}
    />i</div>

    <div>radious = <input type="number" ref={radRef}
     onChange={PassValues}
     id={"layer"+layer+"scatterer"+scatterer+"rad"}
     /></div>

    <div>Position (x,y,z) = <input type="number" ref={posXRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"x"}
    />

    <input type="number" ref={posYRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"y"}
    />

    <input type="number" ref={posZRef} 
    onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"z"}
    />

    </div>
    <div>η = <input type="number" ref={vibAmplRef} onChange={PassValues}
    id={"layer"+layer+"scatterer"+scatterer+"h"}
    /></div>
</div>
}

export default SphereGeometry;