import { useState, useEffect, useContext, useRef } from "react";
import classes from "./index.module.css";
import SphereGeometry from "../components/geometry/sphere";
import AllSpheres from "../components/geometry/allspheres";
import Layer from "../components/geometry/layer";
import BoxesPage from "../components/threejs/test";
import Card from "../components/ui/card";

function Homepage(props) {

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


//layers props contains basic info about layer like periodicity for arrays
const [periodicBase, setPeriodicBase] = useState([[],[],[],[],[],[],[]]);


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

  const PassValues = (layer, scatterer, sphere) => {
    let temp = layersScaterrers.slice(0);
    temp[layer][scatterer] = sphere;
    setLayersScaterrers(temp);
  };

  const passArrayBase= (a1,layer,drt)=>
  {let temp=periodicBase.slice(0);
    temp[layer]=a1;
    setPeriodicBase(temp);
    let temp2=dr.slice(0);
    temp2[layer]=drt;
    setDr(temp2);
  }

  const passNumSpheres=(number,layer)=>{
    let temp=noScat.slice(0);
    temp[layer]=number;
    setNoScat(temp);
  }


 // console.log(dr)
//console.log(noScat)
//  console.log(periodicBase);
  //console.log(layersScaterrers)

  return (
    <div className={classes.page}>
      
      <div className={classes.navBar}>
<h1>Dynamic Multem</h1>
      <div className={classes.cardschange}>
          <h4
          className={chosenCategory==1? classes.chosen : classes.notchosen}
          onClick={()=> setChosenCategory("basic")}
          >Basic Parameters </h4> 
          <h4 className={chosenCategory==2? classes.chosen : classes.notchosen}
          onClick={()=> setChosenCategory("light")}
          >Light and Loops </h4>
          <h4 className={chosenCategory==3? classes.chosen : classes.notchosen}
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
            Num of freq : <input type="number" 
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
             Num of freq : <input type="number" 
           defaultValue={parseInt(freqPoints[1])}
           onChange={(e)=>{const number=e.target.value;
            let a=freqPoints.slice(1);
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
Num of freq : <input type="number" 
           defaultValue={parseInt(freqPoints[2])}
           onChange={(e)=>{const number=e.target.value;
            let a=freqPoints.slice(1);
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
  From : <input type="number" 
             defaultValue={parseInt(freqRange[0])}
             onChange={(e)=>{const number=e.target.value;
              let a=freqRange.slice(0);
              a[0]=number;
              setFreqRange(a);
             }}
             />

To : <input type="number" 
             defaultValue={parseInt(freqRange[1])}
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
<div>Lmax: <input type="number"/></div>
<div className={modes[1]? classes.show : classes.hidden}>
N0 (Number anelastic beams): <input type="number"/></div>

<div className={modes[1] || modes[2]? classes.show : classes.hidden}>
Nfft: <input type="number"/></div>

<div>Rmax: <input type="number"/></div>
<div>iEwaldRecip: <input type="number"/></div>
<div>iEwaldReal: <input type="number"/></div>
<div>EwaldScale: <input type="number"/></div>
          </Card>
          </div>


          <div className={chosenCategory=="light" ? classes.show : classes.hidden}>
            <Card>
            <h2>Select What do you want to scan:</h2>
            <div className={classes.checkboxselectsweep}>
              <div>
                <input
                  type="checkbox"
                  id="Static"
                  name="Static"
                  value="Static"
                />
                <label htmlFor="Static"> Frequency</label>

                <div>
                  {" "}
                  Starting : <input type="number" />
                </div>
                <div>
                  {" "}
                  Ending : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points (Static) : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points (Adiabatic) : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points (Dynamic) : <input type="number" />
                </div>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="Static"
                  name="Static"
                  value="Static"
                />
                <label htmlFor="Static"> Angle</label>

                <div>
                  {" "}
                  Starting : <input type="number" />
                </div>
                <div>
                  {" "}
                  Ending : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points: <input type="number" />
                </div>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="Static"
                  name="Static"
                  value="Static"
                />
                <label htmlFor="Static"> Omega</label>

                <div>
                  {" "}
                  Starting : <input type="number" />
                </div>
                <div>
                  {" "}
                  Ending : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points: <input type="number" />
                </div>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="Static"
                  name="Static"
                  value="Static"
                />
                <label htmlFor="Static"> Vibration Amplitude</label>

                <div>
                  {" "}
                  Starting : <input type="number" />
                </div>
                <div>
                  {" "}
                  Ending : <input type="number" />
                </div>
                <div>
                  {" "}
                  Points: <input type="number" />
                </div>
              </div>
            </div></Card>
          </div>
       


      <div className={chosenCategory=="geometry" ? classes.show : classes.hidden}>
  

        <Card>
          <h2>General Geometry Settings</h2>
        <h3>Embedding Medium</h3>
        <div>
          ε = <input type="number" onChange={(e)=>setEpsEnvR(e.target.value)} 
          defaultValue={1}/>+{" "}
          <input type="number"  onChange={(e)=>setEpsEnvI(e.target.value)}
           defaultValue={1} 
           />i
        </div>
        <div>
          μ = <input type="number" onChange={(e)=>setMuEnvR(e.target.value)} 
          defaultValue={1}/>+{" "}
          <input type="number"   onChange={(e)=>setMuEnvI(e.target.value)} 
          defaultValue={1}/>i
        </div>

        <div>
          How many layers :{" "}
          <input
            type="number"
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
            <h2 className={classes.layertitle}>Layer 1</h2>
<Layer type="periodic" 
layer={0}
onChange={PassValues} 
passArrayBase={passArrayBase} 
noSpheres={passNumSpheres}
dr={dr}
totalScat={noScat}
periodicBase={periodicBase}
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
periodicBase={periodicBase}
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
periodicBase={periodicBase}
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
periodicBase={periodicBase}
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
periodicBase={periodicBase}
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
periodicBase = {periodicBase}
dr={dr}
/>
   </div>


    </div>
  );
}

export default Homepage;
