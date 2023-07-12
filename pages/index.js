import { useState, useEffect, useContext, useRef } from "react";
import classes from "./index.module.css";
import SphereGeometry from "../components/geometry/sphere";
import AllSpheres from "../components/geometry/allspheres";
import Layer from "../components/geometry/layer";
import BoxesPage from "../components/threejs/test";
import Card from "../components/ui/card";
import Axios from "axios";
import Link from "next/link";
import ConfirmPrompt from "../components/ui/confirmprompt/confirmprompt";
import LoadingPrompt from "../components/ui/loadingPrompt/loadingPrompt";

function Homepage(props) {

useEffect(async()=>{

  const response = await Axios.get('http://localhost:3001/');
 
    const input = response.data;


    //setting up which modes to run and freq ranges
    let temp=modes.slice(0);
    let freqPointstemp=freqPoints.slice(0);
    if (input.NLIGHT==0) 
      {temp[0]=false} 
      else 
      {temp[0]=true; 
      document.getElementById("Static").checked=true;
      freqPointstemp[0]=input.NLIGHT;
      }
   
      
    if (input.NLIGHTDYN==0)  
      {temp[1]=false} 
      else  
      {temp[1]=true; document.getElementById("Dynamic").checked=true;
      freqPointstemp[1]=input.NLIGHTDYN;}

    if (input.NADIAB==0 )
      {temp[2]=false }
    else 
      {temp[2]=true; document.getElementById("Adiabatic").checked=true;
      freqPointstemp[2]=input.NADIAB;}
    setModes(temp);
    setFreqPoints(freqPointstemp);
    setFreqRange([input.START1,input.END1]);

    // set other basic params

    setLmax(input.LMAX);
    setRmax(input.RMAX);
    setIEwald([input.iEWALDREAL,input.iEWALDRECIP,input.EWALDSCALE]);

      //what to scan
    setPhi(input.FI);
    setTheta([input.STARTTHETA,input.ENDTHETA,input.NTHETA]);
    setOmega([input.STARTVIB,input.ENDVIB,input.NVIBRA]);
    setN0(input.N0);

    // geometry
    setEpsEnvR(input.EPSENVRE);
    setEpsEnvI(input.EPSENVIM);
    setMuEnvR(input.MUENVRE);
    setMuEnvI(input.MUENVIM);

    setA1([input.AR1X,input.AR1Y]);
    setA2([input.AR2X,input.AR2Y]);

    // spheres for layer 1

    setNoScat([input.NBASIS,0,0,0,0,0,0]);
    let layerScat= layersScaterrers;
    layerScat[0][0]={
      type : "sphere",
      layer : 0,
      scatterer : 0,
      eps : [input.EPSSPHRE,input.EPSSPHIM],
      mu : [input.MUSPHRE,input.MUSPHIM],
      rad : parseFloat(input.RADIOUS),
      position : [0,0,0],
      vibAmpl : input.STARTG0,
  }

  if (input.NBASIS>1)
  {
    layerScat[0][1]={
      type : "sphere",
      layer : 0,
      scatterer : 1,
      eps : [input.EPSSPHRE2,input.EPSSPHIM2],
      mu : [input.MUSPHRE2,input.MUSPHIM2],
      rad : parseFloat(input.RADIOUS2),
      position : [input.SPHERE2X,input.SPHERE2Y,input.SPHERE2ZSTART],
      vibAmpl : input.STARTG0,
  }
  };

setLoadingData(false);

 



},[])

const [loadingData,setLoadingData]= useState(true);

  const [loading,setLoading]= useState(false);

  const [appear,setAppear]=useState(false);

  const [dynMode, setDynMode] = useState("eps");

//total numb of layers
  const [numberOfLayers, setNumberOfLayers] = useState(1);

  // the settings card
  const [chosenCategory,setChosenCategory]=useState("basic")

  // layers Dr distance right
  const [dr,setDr]= useState([0,0,0,0,0,0,0]);


  // LAyer Scaterrers contains all the information about scatterers of the array if its array 
  

  const [layersScaterrers, setLayersScaterrers] = useState([[], [], [], [], [], [], []]);

  // layers type shows what type of layer is each one
const [layersType, setLayersType] = useState(["","","","","","",""]);


//Materials array contains all materials info
const [materials,setMaterials]=useState([])




///how many scatterers per array if periodic
const [noScat,setNoScat]=useState([0,0,0,0,0,0,0]);

/// how many frequwncy scans per type static,dynamic,adiabatic in that order
const [freqPoints,setFreqPoints]= useState([0,0,0]);

// start and end frequencies
const [freqRange,setFreqRange]=useState([0,0])


/// which mode to run
const [modes,setModes]= useState([false,false,false]);

  const [EpsEnvR,setEpsEnvR] =useState();
  const [EpsEnvI,setEpsEnvI] =useState();
  const [MuEnvR,setMuEnvR] =useState();
  const [MuEnvI,setMuEnvI] =useState();
  const [Rmax,setRmax]=useState(0);
  const [Lmax,setLmax]=useState(0);
  const [iEwald,setIEwald]= useState([0,0,0]);
  const [theta,setTheta]=useState([0,0,0]);
  const [phi,setPhi]=useState(0);
  const [omega,setOmega]=useState([0,0,0]);
  const [N0,setN0]= useState(0);

  const [a1,setA1]=useState([0,0]);
  const [a2,setA2]=useState([0,0]);
  //const [theta,setTheta]=useState([0,0,0]);

  //vars for list input
  const [inputList,setInputList]=useState([])
  const [inputListPrompt,setInputListPrompt]=useState(false);
  const [chosenInput,setChosenInput]=useState("");

  const PassValues = (layer, scatterer, sphere) => {
    let temp = layersScaterrers.slice(0);
    temp[layer][scatterer] = sphere;
    setLayersScaterrers(temp);
  };

  const passArrayBase= (layer,drt)=>
  {//let temp=periodicBase.slice(0);
    //temp[layer]=a1;
    //setPeriodicBase(temp);
    let temp2=dr.slice(0);
    temp2[layer]=drt;
    setDr(temp2);
  }

  const passNumSpheres=(number,layer)=>{
    let temp=noScat.slice(0);
    temp[layer]=number;
    setNoScat(temp);
  }



async function RunMultemHandler() {
  setLoading(true);

  let EPSSPHRE2=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].eps[0] && layersScaterrers[0][1].eps[0]!="")
  {EPSSPHRE2=layersScaterrers[0][1].eps[0]}

  let EPSSPHIM2=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].eps[1] && layersScaterrers[0][1].eps[1]!="")
  {EPSSPHIM2=layersScaterrers[0][1].eps[1]}

  let MUSPHRE2=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].mu[0] && layersScaterrers[0][1].mu[0]!="")
  {MUSPHRE2=layersScaterrers[0][1].mu[0]}

  let MUSPHIM2=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].mu[1] && layersScaterrers[0][1].mu[1]!="")
  {MUSPHIM2=layersScaterrers[0][1].mu[1]}

  let RADIOUS2=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].rad && layersScaterrers[0][1].rad!="")
  {RADIOUS2=layersScaterrers[0][1].rad}


  let SPHERE2X=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].position[0] && layersScaterrers[0][1].position[0]!="")
  {SPHERE2X=layersScaterrers[0][1].position[0]}

  let SPHERE2Y=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].position[1] && layersScaterrers[0][1].position[1]!="")
  {SPHERE2Y=layersScaterrers[0][1].position[1]}

  let SPHERE2Z=0
  if (layersScaterrers[0][1] && layersScaterrers[0][1].position[2] && layersScaterrers[0][1].position[2]!="")
  {SPHERE2Z=layersScaterrers[0][1].position[2]}

  let N0in=5
  if (N0 && N0!="")
  {N0in=N0}

  let NLIGHT=0
  if (modes[0]===true && modes[0]!="" && freqPoints[0])
  {NLIGHT= freqPoints[0]}

  let NLIGHTDYN=0
  if (modes[1]===true && modes[1]!="" && freqPoints[1])
  {NLIGHTDYN= freqPoints[1]}

  let NADIAB=0
  if (modes[2]===true && modes[2]!="" && freqPoints[2])
  {NADIAB= freqPoints[2]}

  let G0=0
  if (layersScaterrers[0][0] && layersScaterrers[0][0].vibAmpl && layersScaterrers[0][0].vibAmpl!="")
  {G0=layersScaterrers[0][0].vibAmpl}

  let OMEGASTART=0
  {omega[0] && omega[0]!="" ? OMEGASTART=omega[0] : null}

  let OMEGAEND=0
  {omega[1] && omega[1]!="" ? OMEGAEND=omega[1] : null}

  let NOMEGA=0
  {omega[2] && omega[2]!="" ? NOMEGA=omega[2] : null}

  const input = {
    MODE : "eps",
    NBASIS : parseInt(noScat[0]),
    EPSSPHRE : layersScaterrers[0][0].eps[0],
    EPSSPHIM : layersScaterrers[0][0].eps[1],
    MUSPHRE : layersScaterrers[0][0].mu[0],
    MUSPHIM : layersScaterrers[0][0].mu[1],
    EPSSPHRE2 : EPSSPHRE2,
    EPSSPHIM2 : EPSSPHIM2,
    MUSPHRE2 : MUSPHRE2,
    MUSPHIM2 : MUSPHIM2,
    EPSENVRE  : EpsEnvR, 
    EPSENVIM  : EpsEnvI, 
    MUENVRE  : MuEnvR,
    MUENVIM   : MuEnvI,
    RADIOUS : layersScaterrers[0][0].rad,
    RADIOUS2 : RADIOUS2,
    SPHERE2X : SPHERE2X,
    SPHERE2Y : SPHERE2Y,
    SPHERE2ZSTART : SPHERE2Z,
    SPHERE2ZEND : SPHERE2Z,
    NSPHERE2Z: 1,
    NPHASE2: 1,
    PHASE2START: 0.0,
    PHASE2END: 0.0,
    AR1X: a1[0],
    AR1Y: a1[1],
    AR2X: a2[0],
    AR2Y: a2[1],
    LMAX: Lmax,
    N0: N0in,
    NFFT: 600,
    NSPLIT: 1,
    NTHETA: theta[2],
    STARTTHETA : theta[0],
    ENDTHETA : theta[1],
    FI: phi,
    NLIGHT: NLIGHT,
    NLIGHTDYN: NLIGHTDYN,
    NADIAB: NADIAB,
    START1: freqRange[0],
    END1: freqRange[1],
    NG0: 1,
    STARTG0: G0,
    ENDG0: G0,
    NVIBRA: NOMEGA,
    STARTVIB: OMEGASTART,
    ENDVIB  : OMEGAEND,
    RMAX	 : Rmax, 
    iEWALDRECIP:  iEwald[1], 
    iEWALDREAL:  iEwald[0],  
    EWALDSCALE :  iEwald[2], 
    GAMMA   : 0.0,   
    SCALEFACTOR: 1, 
    OPTOMECHANICAL  :"F",     
    OMEGA_RESONANCE : 0.91601122142, 
    SCSFILE :'breath.scs0'
  }

console.log(input)

  const result = await Axios.post(
    'http://localhost:3001/run',
    input
  )

setLoading(false);
}


async function GetInputList () {
  const result = await Axios.get(
    'http://localhost:3001/inputlist'
  );
  setInputList(result.data.trim().split("\n"))
  setInputListPrompt(true);
}


async function LoadNewInputHandler () {
  if (chosenInput=="") {alert("Chose an Input!")}
  else 
{ const result = await Axios.get('http://localhost:3001/loadinput/'+chosenInput);
 if (result.data=="ok") {
  window.location.reload()
 }}
  
}




  return (<>
   {loadingData && <LoadingPrompt/>}
  {loading && <LoadingPrompt/>}
    <div className={classes.page} key={loadingData? "wait" : "ready"}>
      {inputListPrompt &&
      <ConfirmPrompt
      text = {<div>
      <h4>Which input to load?</h4>
      <div className={classes.inputlist}>
        {inputList.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> setChosenInput(e.target.id)}
        className ={chosenInput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>
      </div>
        }
        cancel ={()=>setInputListPrompt(false)}
        notext = "Cancel"
        yestext ="Ok"
        ok = {LoadNewInputHandler}
      />
      }
      
      <div className={classes.runMultem}>
        <div onClick={RunMultemHandler}>RUN MULTEM</div>
        
        
      </div>

      <div className={classes.loadinput}>
<div onClick={GetInputList}>load Input</div>
      </div>

      <div className={classes.results}>
<Link href="/plot">RESULTS</Link>
</div>


      <div className={classes.navBar}>
<h1>Dynamic Multem</h1>
      <div className={classes.cardschange}>
          <h4
          className={chosenCategory=="basic"? classes.chosen : classes.notchosen}
          onClick={()=> setChosenCategory("basic")}
          >Basic Parameters </h4> 
          <h4 className={chosenCategory=="light"? classes.chosen : classes.notchosen}
          onClick={()=> setChosenCategory("light")}
          >Light and Loops </h4>
          <h4 className={chosenCategory=="geometry"? classes.chosen : classes.notchosen}
          onClick={()=> setChosenCategory("geometry")}
          >Geometry </h4>
        </div>
</div>

<div className={classes.body}></div>


        <div className={chosenCategory=="basic" ? classes.show : classes.hidden}>
          <Card>
          <div className={classes.runMode}>
            <h2>Select which modes you want to run:</h2>

            <div className={classes.checkboxselect}> 
            <label htmlFor="Static"> Static</label>
              
                <input
                  type="checkbox"
                  id="Static"
                  name="Static"
                  value="Static"
                  onChange={()=>{
                    let temp=modes.slice(0);
                    {temp[0]? temp[0]=false : temp[0]=true};
                    setModes(temp)
                  }}
                />
               

            <span className={modes[0] ? classes.show :classes.hidden}>
            Num of freq : <input type="text" 
             defaultValue={parseInt(freqPoints[0])}
             onChange={(e)=>{const number=e.target.value;
              let a=freqPoints.slice(0);
              a[0]=number;
              setFreqPoints(a);
             }}
             />
            </span>
   
              

              <div> 
               
              <label htmlFor="Dynamic"> Dynamic</label>
              
              <input
                type="checkbox"
                id="Dynamic"
                name="Dynamic"
                value="Dynamic"
                onChange={()=>{
                  let temp=modes.slice(0);
                  {temp[1]? temp[1]=false : temp[1]=true};
                  setModes(temp)
                }}
              />
             


             <span className={modes[1] ? classes.show :classes.hidden}>
             Num of freq : <input type="text" 
           defaultValue={parseInt(freqPoints[1])}
           onChange={(e)=>{const number=e.target.value;
            let a=freqPoints.slice(0);
            a[1]=number;
            setFreqPoints(a);
    
           }}
           />
           
           <select>
            <option
            disabled
            unselectable={true}
            >Change of </option>
            <option>Rad</option>
            <option>Eps</option>
           </select>
              </span>

              </div>

              <div>
                
              <label htmlFor="Adiabatic"> Adiabatic</label>
              
              <input
                type="checkbox"
                id="Adiabatic"
                name="Adiabatic"
                value="Adiabatic"
                onChange={()=>{
                  let temp=modes.slice(0);
                  {temp[2]? temp[2]=false : temp[2]=true};
                  setModes(temp)
                }}
              />
        <span className={modes[2] ? classes.show :classes.hidden}>
Num of freq : <input type="text" 
           defaultValue={parseInt(freqPoints[2])}
           onChange={(e)=>{const number=e.target.value;
            let a=freqPoints.slice(0);
            a[2]=number;
            setFreqPoints(a); 
           }}
           />

        </span>
             
           
              </div>
            </div>
          </div>

<div>
  <h3>Light Frequencies</h3>
  From : <input type="text" 
             defaultValue={parseFloat(freqRange[0])}
             onChange={(e)=>{const number=e.target.value;
              let a=freqRange.slice(0);
              a[0]=number;
              setFreqRange(a);
             }}
             />

To : <input type="text" 
             defaultValue={parseFloat(freqRange[1])}
             onChange={(e)=>{const number=e.target.value;
              let a=freqRange.slice(0);
              a[1]=number;
              setFreqRange(a);
             }}
             />

</div>

          </Card>

          <Card>
<h2>Basic Parameters</h2>
<div>Units :  <select>
  <option>Dimensionless</option>
  <option>eV</option>
</select>

</div>
<div>Lmax: <input type="text"
defaultValue={parseFloat(Lmax)}
onChange={(e)=>{const number=e.target.value;
 setLmax(number);
}}/></div>

<div className={modes[1]? classes.show : classes.hidden}>
N0 (Number anelastic beams): <input type="text"
              defaultValue={parseInt(N0)}
              onChange={(e)=>{const number=e.target.value;
               setN0(number);
              }} 
/></div>

<div className={modes[1] || modes[2]? classes.show : classes.hidden}>
Nfft: <input type="text" defaultValue={600} /></div>

<div>Rmax: <input type="text"
             defaultValue={parseFloat(Rmax)}
             onChange={(e)=>{const number=e.target.value;
              setRmax(number);
             }}
/></div>
<div>iEwaldRecip: <input type="text" 
defaultValue={parseFloat(iEwald[1])}
onChange={(e)=>{const number=e.target.value;
 let a=iEwald.slice(0);
 a[1]=number;
 setIEwald(a);
}}
/></div>
<div>iEwaldReal: <input type="text"
             defaultValue={parseFloat(iEwald[0])}
             onChange={(e)=>{const number=e.target.value;
              let a=iEwald.slice(0);
              a[0]=number;
              setIEwald(a);
             }}
/></div>
<div>EwaldScale: <input type="text"
             defaultValue={parseFloat(iEwald[2])}
             onChange={(e)=>{const number=e.target.value;
              let a=iEwald.slice(0);
              a[2]=number;
              setIEwald(a);
             }}
/></div>
          </Card>
          </div>


          <div className={chosenCategory=="light" ? classes.show : classes.hidden}>
            <Card>
            <h2>Select What do you want to scan:</h2>
<div className={classes.lightcat}> 
              <div><h4>Theta</h4> 
              From : <input type="text"
              defaultValue={parseFloat(theta[0])}
              onChange={(e)=>{const number=e.target.value;
               let a=theta.slice(0);
               a[0]=number;
               setTheta(a);
              }} 
             /> To : <input type="text" 
             defaultValue={parseFloat(theta[1])}
              onChange={(e)=>{const number=e.target.value;
               let a=theta.slice(0);
               a[1]=number;
               setTheta(a);
       
              }} 
             /> Points : <input type="text" 
             defaultValue={parseInt(theta[2])}
              onChange={(e)=>{const number=e.target.value;
               let a=theta.slice(0);
               a[2]=number;
               setTheta(a);
       
              }} 
             />
              </div>

              <div><h4>Phi</h4> 
              value : <input type="text" 
              defaultValue={parseFloat(phi)}
              onChange={(e)=>{const number=e.target.value;
               setPhi(number);
       
              }} 
             /> 
              </div>



              <div><h4>Omega</h4> 
              From : <input type="text" 
              defaultValue={parseFloat(omega[0])}
              onChange={(e)=>{const number=e.target.value;
               let a=omega.slice(0);
               a[0]=number;
               setOmega(a);
              }} 
             /> To : <input type="text" 
             defaultValue={parseFloat(omega[1])}
             onChange={(e)=>{const number=e.target.value;
              let a=omega.slice(0);
              a[1]=number;
              setOmega(a);
             }} 
             /> Points : <input type="text" 
             defaultValue={parseInt(omega[2])}
             onChange={(e)=>{const number=e.target.value;
              let a=omega.slice(0);
              a[2]=number;
              setOmega(a);
             }} 
             />
              </div>

{/*               <div><h4>Vibration Freq</h4> 
              From : <input type="text" 
             /> To : <input type="text" 
             /> Points : <input type="text" 
             />
              </div> */}

</div>

            </Card>
          </div>
       


      <div className={chosenCategory=="geometry" ? classes.show : classes.hidden}>
  

        <Card>
          <h2>General Geometry Settings</h2>
          <h4>Base Vectors</h4>
<div>
              a1x = <input type="text"   
              defaultValue={a1[0]}
              onChange={(e) =>
                { let tempa= a1.slice(0);
                  tempa[0]=e.target.value
                  setA1(tempa)}
              }/>
              a1y = <input type="text" 
              defaultValue={a1[1]}
              onChange={(e) =>
                { let tempa= a1.slice(0);
                  tempa[1]=e.target.value
                  setA1(tempa)}
              } />
            </div>
            <div>
              a2x = <input type="text" 
              defaultValue={a2[0]}
              onChange={(e) =>
                { let tempa= a2.slice(0);
                  tempa[0]=e.target.value
                  setA2(tempa)}
              }/>
              a2y = <input type="text"  
              defaultValue={a2[1]}
              onChange={(e) =>
                { let tempa= a2.slice(0);
                  tempa[1]=e.target.value
                  setA2(tempa)}
              }/>
            
            </div> 
        <h3>Embedding Medium</h3>
        <div>
          ε = <input type="text" onChange={(e)=>setEpsEnvR(e.target.value)} 
                        defaultValue={parseFloat(EpsEnvR)} />+{" "}
          <input type="text"  onChange={(e)=>setEpsEnvI(e.target.value)}
           defaultValue={parseFloat(EpsEnvI)} 
           />i
        </div>
        <div>
          μ = <input type="text" onChange={(e)=>setMuEnvR(e.target.value)} 
          defaultValue={parseFloat(MuEnvR)}/>+{" "}
          <input type="text"   onChange={(e)=>setMuEnvI(e.target.value)} 
          defaultValue={parseFloat(MuEnvI)}/>i
        </div>

        <div>
          How many layers :{" "}
          <input
            type="text"
            min="1"
            id="noLayers"
            defaultValue={numberOfLayers}
            onChange={() =>
              setNumberOfLayers(document.getElementById("noLayers").value)
            }
          />
        </div></Card>

        {numberOfLayers > 0 && (
          <div><Card>
            {" "}
            <h2 className={classes.layertitle}>
              <div>Layer 1 </div><span className={classes.layerType}>Type : </span>
              <select className={classes.selectType}>
  <option>Periodic</option>
  <option>Interface</option>
  <option>Slab</option>
  </select></h2>


<Layer type="periodic" 
layer={0}
onChange={PassValues} 
passArrayBase={passArrayBase} 
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
//periodicBase={periodicBase}
a1 = {a1}
a2= {a2}
layersScaterrers={layersScaterrers}


/></Card>
          </div>
        )}

{numberOfLayers > 1 && (
          <div><Card>
            {" "}
            <h2 className={classes.layertitle}>Layer 2</h2>
<Layer type="periodic" 
layer={1}
onChange={PassValues} 
passArrayBase={passArrayBase}
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
//periodicBase={periodicBase}
a1 = {a1}
a2= {a2}
layersScaterrers={layersScaterrers}  /></Card>
          </div>
        )}

{numberOfLayers > 2 && (
          <div><Card>
            {" "}
            <h2 className={classes.layertitle}>Layer 3</h2>
<Layer type="periodic" 
layer={2}
onChange={PassValues} 
passArrayBase={passArrayBase} 
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
//periodicBase={periodicBase}
a1 = {a1}
a2= {a2}
layersScaterrers={layersScaterrers} /></Card>
          </div>
        )}


{numberOfLayers > 3 && (
          <div><Card>
            {" "}
            <h2 className={classes.layertitle}>Layer 4</h2>
<Layer type="periodic" 
layer={3}
onChange={PassValues} 
passArrayBase={passArrayBase} 
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
//periodicBase={periodicBase}
a1 = {a1}
a2= {a2}
layersScaterrers={layersScaterrers} /></Card>
          </div>
        )}

{numberOfLayers > 4 && (
          <div><Card>           {" "}
            <h2 className={classes.layertitle}>Layer 5</h2>
<Layer type="periodic" 
layer={4}
onChange={PassValues} 
passArrayBase={passArrayBase}
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
//periodicBase={periodicBase}
a1 = {a1}
a2= {a2}
layersScaterrers={layersScaterrers}  /></Card>
 
          </div>
        )}




      </div>



<div className={classes.geometryview}>
  <h1>Geometry</h1>
   <BoxesPage
noScat={noScat}
layersScaterrers={layersScaterrers}
numberOfLayers={numberOfLayers}
//periodicBase = {periodicBase}
a1={a1}
a2={a2}
dr={dr}
/>
   </div>


    </div></>
  );
}

export default Homepage;
