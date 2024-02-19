import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
//import BoxesPage from "../../components/threejs/singlescat";
import classes from "./index.module.css";
import Axios from "axios";
import LoadingPrompt from "../../components/ui/loadingPrompt/loadingPrompt";
import ConfirmPrompt from "../../components/ui/confirmprompt/confirmprompt";
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import {materials} from "../../variables/materials";
import FastPlot from "../../components/fastplot/fastplot";

const BoxesPage = dynamic(
  () => import('../../components/threejs/singlescat'), { ssr: false });


export default function Homepage(props) {
  const [saveInput,setSaveInput]=useState(false);
  const [saveOutput,setSaveOutput]=useState(false);
  const router = useRouter();
  const [savePrompt,setSavePrompt]=useState(false);
  const [loading,setLoading]= useState(false);
  const [loadingValues,setLoadingValues]= useState(true);
  const [multemEnd,setMultemEnd]=useState(false);
  const ΕίδηΣκεδαστών = ["SPHERE", "CYLINDER", "ELIPSE","CORESHELL","GYROELECTRICSPHERE","GYROMAGNETICSPHERE"];
  const unitsFreq = ["MHz", "GHz", "THz"];
  const unitsLength = ["mm", "microm", "nm"];
  const polarizationChoices = ["P", "S", "L", "R"];
  const [typeofScat, setTypeOfScat] = useState("SPHERE");
  const [typeofMaterial,setTypeofMaterial]=useState("userdefined");
  const [lengthUnitsScat,setLengthUnitsScat]=useState("nm");
  const [issues,setIssues]=useState(false);
 

  const [sweeps,setSweeps]= useState({
    frequency : true,
    wavelength : true,
    thetaIn : false,
    phiIn: false,
    epsReal : false,
    epsImag :false,
    muReal : false,
    muImag : false,
    radius : false,
    height : false,
    radius1 : false,
    radius2 :false

  })
  const [scatValues, setScatValues] = useState({
    SPHERE: {
      typeofMaterial : typeofMaterial,
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [0, 1, 1],
      radius: [1, 4, 1],
    },
    CYLINDER: {
      typeofMaterial : typeofMaterial,
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [0, 1, 1],
      radius: [1, 4, 1],
      height: [1, 4, 1],
    },
    ELIPSE: {
      typeofMaterial : typeofMaterial,
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [0, 1, 1],
      radius1: [1, 4, 1],
      radius2: [1, 4, 1],
    },
    CORESHELL: {
      typeofMaterial : typeofMaterial,
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [0, 1, 1],
      coreRadius: [1, 4, 1],
      NumOfShells: [1,0,1],
      typeofMaterialShell1 : typeofMaterial,
      epsRealShell1: [12, 12, 1],
      epsImagShell1: [0, 12, 1],
      muRealShell1: [1, 1, 1],
      muImagShell1: [0, 1, 1],
      radiusShell1 : [1, 4, 1],
    },
    GYROELECTRICSPHERE: {
      typeofMaterial : typeofMaterial,
      epsxxReal: [12, 12, 1],
      epsxxImag: [0, 12, 1],
      epsxyReal: [12, 12, 1],
      epsxyImag: [0, 12, 1],
      epszzReal: [12, 12, 1],
      epszzImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [0, 1, 1],
      radius: [1, 4, 1],   
    },
    GYROMAGNETICSPHERE: {
      typeofMaterial : typeofMaterial,
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muxxReal: [12, 12, 1],
      muxxImag: [0, 12, 1],
      muxyReal: [12, 12, 1],
      muxyImag: [0, 12, 1],
      muzzReal: [12, 12, 1],
      muzzImag: [0, 12, 1],
      radius: [1, 4, 1],   
    },
  });

  const [envValues, setEnvValues] = useState({
    epsEnv: 1,
    muEnv: 1,
  });

  const [lightValues, setLightValues] = useState({
    frequency: [1, 4, 1, true],
    wavelength: [100, 200, 10, false],
    thetaIn: [0, 0, 1],
    phiIn: [0, 0, 1],
    polarization: "P",
    unitsOfFreq: "GHz",
    unitsOfWavelength: "nm",
  });

  const [multExpansion, setMultExpansion] = useState({
    lmax: 4,
    ltmax: 6,
    Ngauss :256
  });

  function findIndex (array, filenameToFind) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].filename === filenameToFind) {
        return i;
      }
    }
    return -1;
  }


  function ScatChoices(items) {
    let text = [];
    Object.entries(items).forEach(([key, value]) => {
      if (typeofMaterial=="userdefined" || 
      (key!="epsReal" && key!="epsImag" && key!="muReal" && key!="muImag")
      )
      {
        if (key=="epsxxReal" || key=="epsxxImag" ||
        key=="epsxyReal" || key=="epsxyImag" ||
        key=="epszzReal" || key=="epszzImag" ||
        key=="muxxReal" || key=="muxxImag" ||
        key=="muxyReal" || key=="muxyImag" ||
        key=="muzzReal" || key=="muzzImag" 

        ) {return}

        if (key=="NumOfShells") 
        {
          text.push(<div> 
       <h2>{key} </h2>     
             <button
             onClick={()=>{
              const temp = Object.assign({}, scatValues);
              let previousNo= parseInt(scatValues[typeofScat][key][0]);
              if (previousNo==1) {return}
              let newNo= previousNo-1;
              temp[typeofScat][key][0]= newNo;
              delete temp[typeofScat]["epsRealShell"+previousNo];
              delete temp[typeofScat]["epsImagShell"+previousNo];
              delete temp[typeofScat]["muRealShell"+previousNo];
              delete temp[typeofScat]["muImagShell"+previousNo]; 
              delete temp[typeofScat]["radiusShell"+previousNo];
              setScatValues(temp);
             }}
             >-</button> {scatValues[typeofScat][key][0]} <button
             onClick={()=>{
              const temp = Object.assign({}, scatValues);
              let previousNo= parseInt(scatValues[typeofScat][key][0]);
              let newNo= previousNo+1;
              temp[typeofScat][key][0]= newNo;
              temp[typeofScat]["epsRealShell"+newNo]=temp[typeofScat]["epsRealShell"+previousNo].slice();
              temp[typeofScat]["epsImagShell"+newNo]=temp[typeofScat]["epsImagShell"+previousNo].slice();
              temp[typeofScat]["muRealShell"+newNo]=temp[typeofScat]["muRealShell"+previousNo].slice();
              temp[typeofScat]["muImagShell"+newNo]=temp[typeofScat]["muImagShell"+previousNo].slice(); 
              temp[typeofScat]["radiusShell"+newNo]=temp[typeofScat]["radiusShell"+previousNo].slice();
              setScatValues(temp);
             }}
             >+</button> 
          </div>)

        }



        else 
{      text.push(
        <div>
          {typeofScat=="CORESHELL" && key=="epsReal" &&
           <h2>Core Info</h2> 
          }

{typeofScat=="CORESHELL" && key.includes("epsRealShell") &&
           <h2>Shell {key.split("ll")[1]} Info</h2> 
          }

          <h2 className={classes.inline}>{key} {key=="radius" || key=="height" ?
          <>
          ({lengthUnitsScat!="microm" ? <>{lengthUnitsScat}</>:<>μm</>})</>:null}:</h2>
          {scatValues[typeofScat][key][2] == 0 ||
            (scatValues[typeofScat][key][2] == 1 && (
              <input
                defaultValue={scatValues[typeofScat][key][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat][key][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            ))}


          {scatValues[typeofScat][key][2] != 0 &&
            scatValues[typeofScat][key][2] != 1 && (
              <div>
                From:{" "}
                <input
                  type="text"
                  accept="[0,9]"
                  defaultValue={scatValues[typeofScat][key][0]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat][key][0] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />
                To:
                <input
                  type="text"
                  accept="[0,9]"
                  defaultValue={scatValues[typeofScat][key][1]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat][key][1] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />
                Points:{" "}
                <input
                  type="text"
                  accept="[0,9]"
                  defaultValue={scatValues[typeofScat][key][2]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat][key][2] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />
              </div>
            )}
        </div>
      )}
      ;
    }
    });

    return <>{text}</>;
  }


function SphereCylindChoices () {
  return <div>

<MaterialChoice/> 

  {scatValues[typeofScat]["typeofMaterial"]=="userdefined" &&
  <>
      <div>
    <h2 className={classes.inline}>Eps=</h2>
    <input
                defaultValue={scatValues[typeofScat]["epsReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["epsImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["epsImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>

            <div>
    <h2 className={classes.inline}>Mu=</h2>
    <input
                defaultValue={scatValues[typeofScat]["muReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["muImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>

  
  </>
  }



            <div>
    <h2 className={classes.inline}>Radius
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radius"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radius"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>

{typeofScat=="CYLINDER" && 
            <div>
    <h2 className={classes.inline}>Height
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["height"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["height"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>
}


  </div>
}

function SpheroidChoices () {
  return <div>

<MaterialChoice/> 

{scatValues[typeofScat]["typeofMaterial"]=="userdefined" &&
  <>
    <div>
    <h2 className={classes.inline}>Eps=</h2>
    <input
                defaultValue={scatValues[typeofScat]["epsReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["epsImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["epsImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>

            <div>
    <h2 className={classes.inline}>Mu=</h2>
    <input
                defaultValue={scatValues[typeofScat]["muReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["muImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>  
  </>}




            <div>
    <h2 className={classes.inline}>Radius1
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radius1"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radius1"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>


            <div>
    <h2 className={classes.inline}>Radius2
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radius2"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radius2"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>



  </div>
}

function CoreShellChoices() {
  let text = [];

  for (let i=0;i<scatValues[typeofScat]["NumOfShells"][0]; i++) {
    const j=i+1
    text.push(
      <div>
        <h2>Shell {j}</h2>
        
        <MaterialChoice type={"typeofMaterialShell"+j}/> 
        {scatValues[typeofScat]["typeofMaterialShell"+j]=="userdefined" &&
  <>
  <div>
    <h2 className={classes.inline}>Eps=</h2>
    <input
                defaultValue={scatValues[typeofScat]["epsRealShell"+j][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsRealShell"+j][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["epsImagShell"+j][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["epsImagShell"+j][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>

            <div>
    <h2 className={classes.inline}>Mu=</h2>
    <input
                defaultValue={scatValues[typeofScat]["muRealShell"+j][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muRealShell"+j][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["muImagShell"+j][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muImagShell"+j][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>
  </>}



            <div>
    <h2 className={classes.inline}>Radius
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radiusShell"+j][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radiusShell"+j][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>  
      </div>
    )
  }


  return <div>


<h2>Core Info</h2> 

<MaterialChoice/> 
{scatValues[typeofScat]["typeofMaterial"]=="userdefined" &&
  <><div>
      <h2 className={classes.inline}>Eps=</h2>
    <input
                defaultValue={scatValues[typeofScat]["epsReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["epsImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["epsImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
  </div>
            <div>
    <h2 className={classes.inline}>Mu=</h2>
    <input
                defaultValue={scatValues[typeofScat]["muReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["muImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>
  </>}

            



            <div>
    <h2 className={classes.inline}>Radius
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["coreRadius"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["coreRadius"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>




<div>
<h2 className={classes.inline}>Num. of Shells</h2>= <button
           onClick={()=>{
            const temp = Object.assign({}, scatValues);
            let previousNo= parseInt(scatValues[typeofScat]["NumOfShells"][0]);
            if (previousNo==1) {return}
            let newNo= previousNo-1;
            temp[typeofScat]["NumOfShells"][0]= newNo;
            delete temp[typeofScat]["typeofMaterialShell"+previousNo];
            delete temp[typeofScat]["epsRealShell"+previousNo];
            delete temp[typeofScat]["epsImagShell"+previousNo];
            delete temp[typeofScat]["muRealShell"+previousNo];
            delete temp[typeofScat]["muImagShell"+previousNo]; 
            delete temp[typeofScat]["radiusShell"+previousNo];
            setScatValues(temp);
           }}
           >-</button> {scatValues[typeofScat]["NumOfShells"][0]} <button
           onClick={()=>{
            const temp = Object.assign({}, scatValues);
            let previousNo= parseInt(scatValues[typeofScat]["NumOfShells"][0]);
            let newNo= previousNo+1;
            temp[typeofScat]["NumOfShells"][0]= newNo;
            temp[typeofScat]["typeofMaterialShell"+newNo]=temp[typeofScat]["typeofMaterialShell"+previousNo].slice();
            temp[typeofScat]["epsRealShell"+newNo]=temp[typeofScat]["epsRealShell"+previousNo].slice();
            temp[typeofScat]["epsImagShell"+newNo]=temp[typeofScat]["epsImagShell"+previousNo].slice();
            temp[typeofScat]["muRealShell"+newNo]=temp[typeofScat]["muRealShell"+previousNo].slice();
            temp[typeofScat]["muImagShell"+newNo]=temp[typeofScat]["muImagShell"+previousNo].slice(); 
            temp[typeofScat]["radiusShell"+newNo]=temp[typeofScat]["radiusShell"+previousNo].slice();
            setScatValues(temp);
           }}
           >+</button> 
 </div>   

{text}

  </div>;
}

function GEChoices () {
  return <div>
    <MaterialChoice/> 


  {/*           <div className={classes.tableupomn}> eps=
              <table>
                <tbody>
                <tr>
                  <td>exx</td>
                  <td>exy</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>eyx=-exy</td>
                  <td>eyy=exx</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>ezz</td>
                </tr>
                 </tbody>
              </table>
              </div> */}
  {scatValues[typeofScat]["typeofMaterial"]=="userdefined" && <>
  
                <div
              className={classes.tableTanustwnCont}>
  <strong>{/* ε */}eps</strong>=
              <table>
                <tbody>
                  <tr>
                    <td>
                    <input
                  defaultValue={scatValues[typeofScat]["epsxxReal"][0]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat]["epsxxReal"][0] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />+<input
                defaultValue={scatValues[typeofScat]["epsxxImag"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsxxImag"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />i
                    </td>
                    <td>
                    <input
                  defaultValue={scatValues[typeofScat]["epsxyReal"][0]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat]["epsxyReal"][0] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />+<input
                defaultValue={scatValues[typeofScat]["epsxyImag"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsxyImag"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />i
                    </td>
                    <td>
                0
                    </td>
                  </tr>
                  <tr>
                    <td>
  {-1*parseFloat(scatValues[typeofScat]["epsxyReal"][0])}
  
  {parseFloat(scatValues[typeofScat]["epsxyImag"][0])>0 &&
  <>{-1*parseFloat(scatValues[typeofScat]["epsxyImag"][0])}i</>
  }
  {parseFloat(scatValues[typeofScat]["epsxyImag"][0])<0 &&
  <>+{-1*parseFloat(scatValues[typeofScat]["epsxyImag"][0])}i</>
  }
  
                    </td>
                    <td>
                    {parseFloat(scatValues[typeofScat]["epsxxReal"][0])}
                    {parseFloat(scatValues[typeofScat]["epsxxImag"][0])>0 &&
  <>+{parseFloat(scatValues[typeofScat]["epsxxImag"][0])}i</>
  }
  {parseFloat(scatValues[typeofScat]["epsxxImag"][0])<0 &&
  <>{parseFloat(scatValues[typeofScat]["epsxxImag"][0])}i</>
  }
                    </td>
                    <td>
                0
                    </td>
                  </tr>
                  <tr>
  <td>0</td>
  <td>0</td>
  <td><input
                  defaultValue={scatValues[typeofScat]["epszzReal"][0]}
                  onChange={(e) => {
                    const temp = Object.assign({}, scatValues);
                    temp[typeofScat]["epszzReal"][0] = e.target.value.replaceAll(
                      ",",
                      "."
                    );
                    setScatValues(temp);
                  }}
                />+<input
                defaultValue={scatValues[typeofScat]["epszzImag"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epszzImag"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />i</td>
  
                  </tr>        
                </tbody>
                </table>    
  
              </div>

              <div>
    <h2 className={classes.inline}>Mu=</h2>
    <input
                defaultValue={scatValues[typeofScat]["muReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["muImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>

  </>}

            <div>
    <h2 className={classes.inline}>Radius
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radius"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radius"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>

              </div>
}

function GMChoices () {
  return <div>
     <MaterialChoice/> 

     {scatValues[typeofScat]["typeofMaterial"]=="userdefined" && <>
     
         <div>
    <h2 className={classes.inline}>Eps=</h2>
    <input
                defaultValue={scatValues[typeofScat]["epsReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["epsReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              /> + <input
              defaultValue={scatValues[typeofScat]["epsImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["epsImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
            </div>
  

<div
            className={classes.tableTanustwnCont}>
<strong>{/* ε */}mu</strong>=
            <table>
              <tbody>
                <tr>
                  <td>
                  <input
                defaultValue={scatValues[typeofScat]["muxxReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muxxReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />+<input
              defaultValue={scatValues[typeofScat]["muxxImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muxxImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
                  </td>
                  <td>
                  <input
                defaultValue={scatValues[typeofScat]["muxyReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muxyReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />+<input
              defaultValue={scatValues[typeofScat]["muxyImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muxyImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i
                  </td>
                  <td>
              0
                  </td>
                </tr>
                <tr>
                  <td>
{-1*parseFloat(scatValues[typeofScat]["muxyReal"][0])}

{parseFloat(scatValues[typeofScat]["muxyImag"][0])>0 &&
<>{-1*parseFloat(scatValues[typeofScat]["muxyImag"][0])}i</>
}
{parseFloat(scatValues[typeofScat]["muxyImag"][0])<0 &&
<>+{-1*parseFloat(scatValues[typeofScat]["muxyImag"][0])}i</>
}

                  </td>
                  <td>
                  {parseFloat(scatValues[typeofScat]["muxxReal"][0])}
                  {parseFloat(scatValues[typeofScat]["muxxImag"][0])>0 &&
<>+{parseFloat(scatValues[typeofScat]["muxxImag"][0])}i</>
}
{parseFloat(scatValues[typeofScat]["muxxImag"][0])<0 &&
<>{parseFloat(scatValues[typeofScat]["muxxImag"][0])}i</>
}
                  </td>
                  <td>
              0
                  </td>
                </tr>
                <tr>
<td>0</td>
<td>0</td>
<td><input
                defaultValue={scatValues[typeofScat]["muzzReal"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["muzzReal"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />+<input
              defaultValue={scatValues[typeofScat]["muzzImag"][0]}
              onChange={(e) => {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat]["muzzImag"][0] = e.target.value.replaceAll(
                  ",",
                  "."
                );
                setScatValues(temp);
              }}
            />i</td>

                </tr>        
              </tbody>
              </table>    

            </div>
     </>}


            <div>
    <h2 className={classes.inline}>Radius
    ({lengthUnitsScat=="microm" ? <>μm</>:<>{lengthUnitsScat}</>})
    =</h2>
    <input
                defaultValue={scatValues[typeofScat]["radius"][0]}
                onChange={(e) => {
                  const temp = Object.assign({}, scatValues);
                  temp[typeofScat]["radius"][0] = e.target.value.replaceAll(
                    ",",
                    "."
                  );
                  setScatValues(temp);
                }}
              />
            </div>

              </div>
}

function RangeOfFreqsMaterials (props) {
let start = parseFloat(props.start);
let end = parseFloat(props.end);
let units = "MHz";

if (lightValues.frequency[3]==true) {
  units = lightValues.unitsOfFreq;
  if (lightValues.unitsOfFreq=="MHz") 
  {
    start = start / (4.1357e-9)
    end = end / (4.1357e-9)
  }
  else if (lightValues.unitsOfFreq=="GHz") 
  {
    start = start / (4.1357e-6)
    end = end / (4.1357e-6)
  }
  else if (lightValues.unitsOfFreq=="THz") 
  {
    start = start / (4.1357e-3)
    end = end / (4.1357e-3)
  }
}

else if (lightValues.frequency[3]==false) 

{units = lightValues.unitsOfWavelength; 
if (units=="microm") {units= "μm"}
  if (lightValues.unitsOfWavelength=="mm") 
  {
    start = 1.2398e-3/start
    end = 1.2398e-3/end
  }
  else if (lightValues.unitsOfWavelength=="microm") 
  {
    start = 1.2398/start
    end = 1.2398/end
  }
  else if (lightValues.unitsOfWavelength=="nm") 
  {
    start = 1239.8/start
    end = 1239.8/end
  }
}

return <div key={lightValues.unitsOfWavelength+"-"+lightValues.unitsOfWavelength+"-"+start+ end}>
  
  {lightValues.frequency[3]==false ? <>
  Wavelength Range: {end.toExponential(2)} to {start.toExponential(2)} {units}</> :
  <>Frequency Range: {start.toExponential(2)} to {end.toExponential(2)} {units}</>
  }
  
  
  
</div>

}


function MaterialChoice (props) {

  let property = "typeofMaterial";
  if (props.type && props.type !="") {property=props.type }

const activeIndex = findIndex(materials,scatValues[typeofScat][property])



  return <div className={classes.materialdiv}>
    <h2 className={classes.inline}>Material: </h2>
<select
        onChange={(e) => {
          const temp = Object.assign({}, scatValues);
          temp[typeofScat][property] = e.target.value.toString();
          setScatValues(temp);
          
        }}
defaultValue={scatValues[typeofScat][property]}
>
   <option value="userdefined">User Defined</option>

  {materials.map((choice)=>{
    return <>
    {typeofScat=="GYROELECTRICSPHERE" && choice.matType && choice.matType=="GE" &&
    <option value={choice.filename} id={choice.filename}>
      {choice.optionName} 
    </option>}
    
    {typeofScat=="GYROMAGNETICSPHERE" && choice.matType && choice.matType=="GM" &&
    <option value={choice.filename} id={choice.filename}>
      {choice.optionName} 
    </option>}

    {typeofScat!="GYROMAGNETICSPHERE" && typeofScat!="GYROELECTRICSPHERE" && 
    (!choice.matType || (choice.matType!="GM" && choice.matType!="GE")) 
    &&
    <option value={choice.filename} id={choice.filename}>
      {choice.optionName} 
    </option>}
    
    </>
  })}
  
          </select>

          {scatValues[typeofScat][property] && scatValues[typeofScat][property]!="userdefined" &&

   <RangeOfFreqsMaterials
   start = {materials[activeIndex].rangeStart}
   end = {materials[activeIndex].rangeEnd}
   />}
          
          </div>  
}

function CriticalErrors() {
  let activeIndex;
  let start;
  let end;
  let warnings="";
  let units;
  if (typeofScat!="CORESHELL" && scatValues[typeofScat]["typeofMaterial"]!="userdefined")
{  activeIndex = findIndex(materials,scatValues[typeofScat]["typeofMaterial"])
  start=parseFloat(materials[activeIndex].rangeStart);
  end=parseFloat(materials[activeIndex].rangeEnd);

  if (lightValues.frequency[3]==true) {
    units = lightValues.unitsOfFreq;
    if (lightValues.unitsOfFreq=="MHz") 
    {
      start = start / (4.1357e-9)
      end = end / (4.1357e-9)
    }
    else if (lightValues.unitsOfFreq=="GHz") 
    {
      start = start / (4.1357e-6)
      end = end / (4.1357e-6)
    }
    else if (lightValues.unitsOfFreq=="THz") 
    {
      start = start / (4.1357e-3)
      end = end / (4.1357e-3)
    }

    if (start>parseFloat(lightValues.frequency[0]) || 
    end<parseFloat(lightValues.frequency[1])
    ) {
      warnings = "You have selected a frequency range outside of the material you used. Please change material or the selected frequencies."
    }
  }
  
  else if (lightValues.frequency[3]==false) 
  
  {units = lightValues.unitsOfWavelength; 
  if (units=="microm") {units= "μm"}
    if (lightValues.unitsOfWavelength=="mm") 
    {
      start = 1.2398e-3/start
      end = 1.2398e-3/end
    }
    else if (lightValues.unitsOfWavelength=="microm") 
    {
      start = 1.2398/start
      end = 1.2398/end
    }
    else if (lightValues.unitsOfWavelength=="nm") 
    {
      start = 1239.8/start
      end = 1239.8/end
    }

    if (start<parseFloat(lightValues.wavelength[1]) || 
    end>parseFloat(lightValues.wavelength[0])
    ) {
      warnings="You have selected a wavelength range outside of the material you used. Please change material or the selected wavelengths."
    
    }
  }
}
else if (typeofScat=="CORESHELL") {
  if (scatValues[typeofScat]["typeofMaterial"]!="userdefined")
  {
    activeIndex = findIndex(materials,scatValues[typeofScat]["typeofMaterial"])
  start=parseFloat(materials[activeIndex].rangeStart);
  end=parseFloat(materials[activeIndex].rangeEnd);

  if (lightValues.frequency[3]==true) {
    units = lightValues.unitsOfFreq;
    if (lightValues.unitsOfFreq=="MHz") 
    {
      start = start / (4.1357e-9)
      end = end / (4.1357e-9)
    }
    else if (lightValues.unitsOfFreq=="GHz") 
    {
      start = start / (4.1357e-6)
      end = end / (4.1357e-6)
    }
    else if (lightValues.unitsOfFreq=="THz") 
    {
      start = start / (4.1357e-3)
      end = end / (4.1357e-3)
    }

    if (start>parseFloat(lightValues.frequency[0]) || 
    end<parseFloat(lightValues.frequency[1])
    ) {
      warnings = "You have selected a frequency range outside of the material you used. Please change material or the selected frequencies."
    }
  }
  
  else if (lightValues.frequency[3]==false) 
  
  {units = lightValues.unitsOfWavelength; 
  if (units=="microm") {units= "μm"}
    if (lightValues.unitsOfWavelength=="mm") 
    {
      start = 1.2398e-3/start
      end = 1.2398e-3/end
    }
    else if (lightValues.unitsOfWavelength=="microm") 
    {
      start = 1.2398/start
      end = 1.2398/end
    }
    else if (lightValues.unitsOfWavelength=="nm") 
    {
      start = 1239.8/start
      end = 1239.8/end
    }

    if (start<parseFloat(lightValues.wavelength[1]) || 
    end>parseFloat(lightValues.wavelength[0])
    ) {
      warnings="You have selected a wavelength range outside of the material you used. Please change material or the selected wavelengths."
    
    }
  }
  }

  for (let i=0;i<scatValues[typeofScat]["NumOfShells"][0];i++)
  { let j=i+1
    if (scatValues[typeofScat]["typeofMaterialShell"+j]!="userdefined")
  {
    activeIndex = findIndex(materials,scatValues[typeofScat]["typeofMaterialShell"+j])
    start=parseFloat(materials[activeIndex].rangeStart);
    end=parseFloat(materials[activeIndex].rangeEnd);
  
    if (lightValues.frequency[3]==true) {
      units = lightValues.unitsOfFreq;
      if (lightValues.unitsOfFreq=="MHz") 
      {
        start = start / (4.1357e-9)
        end = end / (4.1357e-9)
      }
      else if (lightValues.unitsOfFreq=="GHz") 
      {
        start = start / (4.1357e-6)
        end = end / (4.1357e-6)
      }
      else if (lightValues.unitsOfFreq=="THz") 
      {
        start = start / (4.1357e-3)
        end = end / (4.1357e-3)
      }
  
      if (start>parseFloat(lightValues.frequency[0]) || 
      end<parseFloat(lightValues.frequency[1])
      ) {
        warnings = "You have selected a frequency range outside of the material you used. Please change material or the selected frequencies."
      }
    }
    
    else if (lightValues.frequency[3]==false) 
    
    {units = lightValues.unitsOfWavelength; 
    if (units=="microm") {units= "μm"}
      if (lightValues.unitsOfWavelength=="mm") 
      {
        start = 1.2398e-3/start
        end = 1.2398e-3/end
      }
      else if (lightValues.unitsOfWavelength=="microm") 
      {
        start = 1.2398/start
        end = 1.2398/end
      }
      else if (lightValues.unitsOfWavelength=="nm") 
      {
        start = 1239.8/start
        end = 1239.8/end
      }
  
      if (start<parseFloat(lightValues.wavelength[1]) || 
      end>parseFloat(lightValues.wavelength[0])
      ) {
        warnings="You have selected a wavelength range outside of the material you used. Please change material or the selected wavelengths."
      
      }
    }
  }
  
  }

}




return warnings

}




  async function RunMultemHandler() {

  setLoading(true)

  const warnings = CriticalErrors();
  if (warnings && warnings!="" && warnings!=" " && warnings!=[]) 
  {setLoading(false)
    setIssues(warnings)
    return
  }
    
  const coreShells= parseInt(scatValues["CORESHELL"]["NumOfShells"][0]);
  let allShells = {};
  for (let i=0 ; i<coreShells; i++) {
    const j=i+1
    const tempShells= {
      ["typeofMaterialShell"+j] : scatValues["CORESHELL"]["typeofMaterialShell"+j],
      ["epsRealShell"+j] : scatValues["CORESHELL"]["epsRealShell"+j],
      ["epsImagShell"+j] : scatValues["CORESHELL"]["epsImagShell"+j],
      ["muRealShell"+j] : scatValues["CORESHELL"]["muRealShell"+j],
      ["muImagShell"+j] : scatValues["CORESHELL"]["muImagShell"+j],
      ["radiusShell"+j] : scatValues["CORESHELL"]["radiusShell"+j],
    }
    allShells={...allShells,...tempShells}
  }
    const input = {
      typeofScat : typeofScat,
      lengthUnitsScat : lengthUnitsScat,
      //...scatValues[typeofScat],
      typeofMaterial : scatValues["SPHERE"]["typeofMaterial"],
      epsReal: scatValues["SPHERE"]["epsReal"],
      epsImag: scatValues["SPHERE"]["epsImag"],
      muReal: scatValues["SPHERE"]["muReal"],
      muImag: scatValues["SPHERE"]["muImag"],
      radius: scatValues["SPHERE"]["radius"],
      typeofMaterialC : scatValues["CYLINDER"]["typeofMaterial"],
      epsRealC: scatValues["CYLINDER"]["epsReal"],
      epsImagC: scatValues["CYLINDER"]["epsImag"],
      muRealC: scatValues["CYLINDER"]["muReal"],
      muImagC: scatValues["CYLINDER"]["muImag"],
      radiusC: scatValues["CYLINDER"]["radius"],
      heightC: scatValues["CYLINDER"]["height"],
      typeofMaterialE : scatValues["ELIPSE"]["typeofMaterial"],
      epsRealE: scatValues["ELIPSE"]["epsReal"],
      epsImagE: scatValues["ELIPSE"]["epsImag"],
      muRealE: scatValues["ELIPSE"]["muReal"],
      muImagE: scatValues["ELIPSE"]["muImag"],
      radius1E: scatValues["ELIPSE"]["radius1"],
      radius2E: scatValues["ELIPSE"]["radius2"],
      typeofMaterialCS : scatValues["CORESHELL"]["typeofMaterial"],
      epsRealCS: scatValues["CORESHELL"]["epsReal"],
      epsImagCS: scatValues["CORESHELL"]["epsImag"],
      muRealCS: scatValues["CORESHELL"]["muReal"],
      muImagCS: scatValues["CORESHELL"]["muImag"],
      coreRadiusCS: scatValues["CORESHELL"]["coreRadius"],
      NumOfShells: scatValues["CORESHELL"]["NumOfShells"], 
      ...allShells,    
      ...envValues,
      ...lightValues,
      ...multExpansion,
      typeofMaterialGE : scatValues["GYROELECTRICSPHERE"]["typeofMaterial"],
      epsxxReal: scatValues["GYROELECTRICSPHERE"]["epsxxReal"],
      epsxxImag: scatValues["GYROELECTRICSPHERE"]["epsxxImag"],
      epsxyReal: scatValues["GYROELECTRICSPHERE"]["epsxyReal"],
      epsxyImag: scatValues["GYROELECTRICSPHERE"]["epsxyImag"],
      epszzReal: scatValues["GYROELECTRICSPHERE"]["epszzReal"],
      epszzImag: scatValues["GYROELECTRICSPHERE"]["epszzImag"],
      muRealGE: scatValues["GYROELECTRICSPHERE"]["muReal"],
      muImagGE: scatValues["GYROELECTRICSPHERE"]["muImag"],
      radiusGE: scatValues["GYROELECTRICSPHERE"]["radius"],
      typeofMaterialGM : scatValues["GYROMAGNETICSPHERE"]["typeofMaterial"],
      epsRealGM: scatValues["GYROMAGNETICSPHERE"]["epsReal"],
      epsImagGM: scatValues["GYROMAGNETICSPHERE"]["epsImag"],
      muxxReal: scatValues["GYROMAGNETICSPHERE"]["muxxReal"],
      muxxImag: scatValues["GYROMAGNETICSPHERE"]["muxxImag"],
      muxyReal: scatValues["GYROMAGNETICSPHERE"]["muxyReal"],
      muxyImag: scatValues["GYROMAGNETICSPHERE"]["muxyImag"],
      muzzReal: scatValues["GYROMAGNETICSPHERE"]["muzzReal"],
      muzzImag: scatValues["GYROMAGNETICSPHERE"]["muzzImag"],
      radiusGM: scatValues["GYROMAGNETICSPHERE"]["radius"],

    }
  


  
  const result = await Axios.post(
    'http://localhost:3001/runsingle',
    input
  )
  setLoading(false);
  setMultemEnd(true);

  }

  useEffect(async()=>{
    const response = await Axios.get('http://localhost:3001/singleinputdefault');
   
      const input = response.data;
      const coreShells= parseInt(input[29].split(" ")[0]);
      let allShells = {};
      for (let i=0 ; i<coreShells; i++) {
        const j=i+1
        const tempShells= {
          ["typeofMaterialShell"+j] : input[29+6*i+1].toString(),
          ["epsRealShell"+j] : input[29+6*i+2].split(" "),
          ["epsImagShell"+j] : input[29+6*i+3].split(" "),
          ["muRealShell"+j] : input[29+6*i+4].split(" "),
          ["muImagShell"+j] : input[29+6*i+5].split(" "),
          ["radiusShell"+j] : input[29+6*i+6].split(" "),
        }
        allShells={...allShells,...tempShells}
      }
      setTypeOfScat(input[1]);
      setLengthUnitsScat(input[2]);
        setScatValues({
          SPHERE: {
            typeofMaterial : input[3].toString(),
            epsReal: input[4].split(" "),
            epsImag: input[5].split(" "),
            muReal: input[6].split(" "),
            muImag: input[7].split(" "),
            radius: input[8].split(" "),
          },
          CYLINDER: {
            typeofMaterial : input[9].toString(),
            epsReal: input[10].split(" "),
            epsImag: input[11].split(" "),
            muReal: input[12].split(" "),
            muImag: input[13].split(" "),
            radius: input[14].split(" "),
            height: input[15].split(" "),
          },
          ELIPSE: {
            typeofMaterial : input[16].toString(),
            epsReal: input[17].split(" "),
            epsImag: input[18].split(" "),
            muReal: input[19].split(" "),
            muImag: input[20].split(" "),
            radius1: input[21].split(" "),
            radius2: input[22].split(" "),
          },
          CORESHELL: {
            typeofMaterial : input[23].toString(),
            epsReal: input[24].split(" "),
            epsImag: input[25].split(" "),
            muReal: input[26].split(" "),
            muImag: input[27].split(" "),
            coreRadius: input[28].split(" "),
            NumOfShells: input[29].split(" "),
            ...allShells
          },
          GYROELECTRICSPHERE: {
            typeofMaterial : input[42+coreShells*6].toString(),
            epsxxReal: input[43+coreShells*6].split(" "),
            epsxxImag: input[44+coreShells*6].split(" "),
            epsxyReal: input[45+coreShells*6].split(" "),
            epsxyImag: input[46+coreShells*6].split(" "),
            epszzReal: input[47+coreShells*6].split(" "),
            epszzImag: input[48+coreShells*6].split(" "),
            muReal: input[49+coreShells*6].split(" "),
            muImag: input[50+coreShells*6].split(" "),
            radius: input[51+coreShells*6].split(" "),           
          },

          GYROMAGNETICSPHERE: {
            typeofMaterial : input[52+coreShells*6].toString(),
            epsReal: input[53+coreShells*6].split(" "),
            epsImag: input[54+coreShells*6].split(" "),
            muxxReal: input[55+coreShells*6].split(" "),
            muxxImag: input[56+coreShells*6].split(" "),
            muxyReal: input[57+coreShells*6].split(" "),
            muxyImag: input[58+coreShells*6].split(" "),
            muzzReal: input[59+coreShells*6].split(" "),
            muzzImag: input[60+coreShells*6].split(" "),
            radius: input[61+coreShells*6].split(" "), 
          },

        });
      
      setEnvValues({
        //epsEnv: input[20],
        epsEnv: input[22+8+coreShells*6],
        muEnv: input[23+8+coreShells*6]
      });

      let a = true;
      let b = false;
      if (input[24+8+coreShells*6].split(" ")[3]=="false")
      {a= false;
        b=true; }

      setLightValues({
        frequency: 
        [input[24+8+coreShells*6].split(" ")[0],
        input[24+8+coreShells*6].split(" ")[1],
        input[24+8+coreShells*6].split(" ")[2],a],
        wavelength: 
        [input[25+8+coreShells*6].split(" ")[0],
        input[25+8+coreShells*6].split(" ")[1],
        input[25+8+coreShells*6].split(" ")[2],b],
        thetaIn: input[26+8+coreShells*6].split(" "),
        phiIn: input[27+8+coreShells*6].split(" "),
        polarization: input[28+8+coreShells*6],
        unitsOfFreq: input[29+8+coreShells*6],
        unitsOfWavelength: input[30+8+coreShells*6],
      });

      setMultExpansion({
        lmax: input[31+8+coreShells*6],
        ltmax: input[32+8+coreShells*6],
        Ngauss: input[33+8+coreShells*6]
      });


      setLoadingValues(false);
     

  
  },[])


  
  async function SaveFilesHandler() {
    setLoading(true);
    const input = {
      inputfile: saveInput,
      scs: saveOutput,
      name: document.getElementById("filename").value
    }
    if (saveInput ||
    saveOutput
    ) {

      const result = await Axios.post(
        'http://localhost:3001/savefilessingle',
        input
      )



    }

setSavePrompt(false);
setLoading(false);



  }


  return (<>    
  {loading && <LoadingPrompt/>}
  {loadingValues && <LoadingPrompt/>}
 <Dialog
        open={multemEnd}
        onClose={()=>setMultemEnd(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The simulation has finished successfully!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          How do you want to proceed? You can save the results either by pressing "save the results" or by 
          selecting "Go to the graphs" and save later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setMultemEnd(false)}>Stay Here</Button>
          <Button onClick={()=>{setMultemEnd(false);setSavePrompt(true)}}>Save the results</Button>
          <Button onClick={()=> router.push("/single/results")}>Go to the Graphs</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={savePrompt}
        onClose={()=>setSavePrompt(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"What do you want to save?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Select if you want to save the input file, the output file (SCS) and the name to save it.
          </DialogContentText>

        </DialogContent>


        <DialogActions>
        <TextField id="filename" label="Enter name to save" variant="outlined"
        size="small"
        />

        <FormControlLabel control=
        {
          <Checkbox
          checked={saveInput}
          onChange={(event) => {
            setSaveInput(event.target.checked);
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        } label="Input" />

<FormControlLabel control=
        {
          <Checkbox
          checked={saveOutput}
          onChange={(event) => {
            setSaveOutput(event.target.checked);
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        } label="Output (scs)" />

        </DialogActions>
        <DialogActions>
          <Button variant="contained" onClick={()=>{
            if (document.getElementById("filename").value=="") {alert("Please input a name")}
            else
            {setSavePrompt(false); SaveFilesHandler()}}}>Save</Button>
        </DialogActions>
      </Dialog>
  
      <Dialog
        open={issues}
        onClose={()=>setIssues(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please check frequency/wavelength range"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {issues}
          </DialogContentText>

        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={()=>{
setIssues(false)}}>Ok</Button>
        </DialogActions>
      </Dialog>
  


  <div className={classes.allpage}
  key={loadingValues? "wait" : "done"}
  >
      <div className={classes.allproperties}>
        <div id="lightproperties" className={classes.lightproperties}>
          <h1>Light Properties</h1>

          <div className={classes.use}>
            <h2 style={{ display: "inline" }}>Use:</h2>{" "}
            <select
              onChange={(e) => {
                if (e.target.value == "frequency") {
                  setLightValues({
                    ...lightValues,
                    wavelength: [
                      lightValues.wavelength[0],
                      lightValues.wavelength[1],
                      lightValues.wavelength[2],
                      false,
                    ],
                    frequency: [
                      lightValues.frequency[0],
                      lightValues.frequency[1],
                      lightValues.frequency[2],
                      true,
                    ],
                  });
                } else if (e.target.value == "wavelength") {
                  setLightValues({
                    ...lightValues,
                    wavelength: [
                      lightValues.wavelength[0],
                      lightValues.wavelength[1],
                      lightValues.wavelength[2],
                      true,
                    ],
                    frequency: [
                      lightValues.frequency[0],
                      lightValues.frequency[1],
                      lightValues.frequency[2],
                      false,
                    ],
                  });
                }
              }}
            >
              <option
                value={"frequency"}
                selected={lightValues.frequency[3] === true}
              >
                frequency
              </option>

              <option
                value={"wavelength"}
                selected={lightValues.wavelength[3] === true}
              >
                wavelength
              </option>
            </select>{" "}
            <i className="fa fa-question-circle" aria-hidden="true" />
          </div>

          <div className={classes.use}>
            {lightValues.frequency[3] === true && (
              <>
                {" "}
                <h2 className={classes.inline}>Frequency Units:</h2>{" "}
                <select
                  onChange={(e) => {
                    setLightValues({
                      ...lightValues,
                      unitsOfFreq: e.target.value,
                    });
                  }}
                  defaultValue={lightValues.unitsOfFreq}
                >
                  {unitsFreq.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>{" "}
                <i className="fa fa-question-circle" aria-hidden="true" />
              </>
            )}

            {lightValues.wavelength[3] === true && (
              <>
                {" "}
                <h2 style={{ display: "inline" }}>Wavelength Units:</h2>{" "}
                <select
                  onChange={(e) => {
                    setLightValues({
                      ...lightValues,
                      unitsOfWavelength: e.target.value,
                    });
                  }}
                  defaultValue={lightValues.unitsOfWavelength}
                >
                  {unitsLength.map((item) => {
                    let textToshow= item;
                    if (item=="microm")
                    {textToshow="μm"}
                    return <option value={item}>{textToshow}</option>;
                  })}
                </select>{" "}
                <i className="fa fa-question-circle" aria-hidden="true" />
              </>
            )}
          </div>

          <div key={lightValues.frequency[3] === true ? "freq" : "wave"}>


{lightValues.frequency[3] == true && (
              <>
                <h2 className={classes.inline}>
                  {Object.keys(lightValues)[0]} ({lightValues.unitsOfFreq}):
                </h2>{" "}
                  <div>
                    start:{" "}
                    <input
                      defaultValue={lightValues.frequency[0]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          frequency: [
                            e.target.value.replaceAll(",", "."),
                            lightValues.frequency[1],
                            lightValues.frequency[2],
                            lightValues.frequency[3],
                          ],
                        });
                      }}
                    />
                    end:{" "}
                    <input
                      defaultValue={lightValues.frequency[1]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          frequency: [
                            lightValues.frequency[0],
                            e.target.value.replaceAll(",", "."),
                            lightValues.frequency[2],
                            lightValues.frequency[3],
                          ],
                        });
                      }}
                    />
                    points:{" "}
                    <input
                      defaultValue={lightValues.frequency[2]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          frequency: [
                            lightValues.frequency[0],
                            lightValues.frequency[1],
                            e.target.value.replaceAll(",", "."),
                            lightValues.frequency[3],
                          ],
                        });
                      }}
                    />
                  </div>
                
              </>
            )}



{lightValues.wavelength[3] == true && (
              <>
                <h2 className={classes.inline}>
                  {Object.keys(lightValues)[1]}  ({lightValues.unitsOfWavelength=="microm"? <>μm</> : <>{lightValues.unitsOfWavelength}</>}):
                </h2>{" "}


                  <div>
                    start:{" "}
                    <input
                      defaultValue={lightValues.wavelength[0]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          wavelength: [
                            e.target.value.replaceAll(",", "."),
                            lightValues.wavelength[1],
                            lightValues.wavelength[2],
                            lightValues.wavelength[3],
                          ],
                        });
                      }}
                    />
                    end:{" "}
                    <input
                      defaultValue={lightValues.wavelength[1]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          wavelength: [
                            lightValues.wavelength[0],
                            e.target.value.replaceAll(",", "."),
                            lightValues.wavelength[2],
                            lightValues.wavelength[3],
                          ],
                        });
                      }}
                    />
                    points:{" "}
                    <input
                      defaultValue={lightValues.wavelength[2]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          wavelength: [
                            lightValues.wavelength[0],
                            lightValues.wavelength[1],
                            e.target.value.replaceAll(",", "."),
                            lightValues.wavelength[3],
                          ],
                        });
                      }}
                    />
                  </div>
                
              </>
            )}


          </div>

          {typeofScat != "SPHERE" && (
            <>

<h2 className={classes.inline}>
                  ThetaIn (deg):
                </h2>{" "}
                {1==1 && (
                  <input
                    defaultValue={lightValues.thetaIn[0]}
                    onChange={(e) => {
                      setLightValues({
                        ...lightValues,
                        thetaIn: [
                          e.target.value.replaceAll(",", "."),
                          lightValues.thetaIn[1],
                          lightValues.thetaIn[2],
                        ],
                      });
                    }}
                  />
                )}{" "}


<div>
<h2 className={classes.inline}>
                  PhiIn (deg):
                </h2>{" "}
                {1==1 && (
                  <input
                    defaultValue={lightValues.phiIn[0]}
                    onChange={(e) => {
                      setLightValues({
                        ...lightValues,
                        phiIn: [
                          e.target.value.replaceAll(",", "."),
                          lightValues.phiIn[1],
                          lightValues.phiIn[2],
                        ],
                      });
                    }}
                  />
                )}{" "}

</div>

              <div>
                <h2>polarization:</h2>{" "}
                <select
                  onChange={(e) => {
                    setLightValues({
                      ...lightValues,
                      polarization: e.target.value,
                    });
                  }}
                >
                  {polarizationChoices.map((items) => {
                    return <option value={items}>{items}</option>;
                  })}
                </select>
              </div>
            </>
          )}
        </div>

        <div id="envperties">
          <h1>Environment Constants</h1>
          <h2 style={{ display: "inline" }}>epsEnv:</h2>{" "}
          <input
            defaultValue={envValues.epsEnv}
            onChange={(e) => {
              setEnvValues({
                ...envValues,
                epsEnv: e.target.value.replaceAll(",", "."),
              });
            }}
          />
          <h2 style={{ display: "inline" }}>muEnv: </h2>
          <input
            defaultValue={envValues.muEnv}
            onChange={(e) => {
              setEnvValues({
                ...envValues,
                muEnv: e.target.value.replaceAll(",", "."),
              });
            }}
          />
        </div>

        <div id="SphericalExpansion">
          <h1>Spherical Expansion</h1>
          <h2 style={{ display: "inline" }}>Lmax:</h2>{" "}
          <input
            defaultValue={multExpansion.lmax}
            onChange={(e) => {
              setMultExpansion({
                ...multExpansion,
                lmax: e.target.value.replaceAll(",", "."),
              });
            }}
          /> <i className="fa fa-question-circle" aria-hidden="true" />


 {typeofScat != "SPHERE" && typeofScat != "ELIPSE" && 
           <div>
          <h2 style={{ display: "inline" }}>Ltmax: </h2>
          <input
            defaultValue={multExpansion.ltmax}
            onChange={(e) => {
              setMultExpansion({
                ...multExpansion,
                ltmax: e.target.value.replaceAll(",", "."),
              });
            }}
          />{" "}
          

          <h2 style={{ display: "inline" }}>Ngauss: </h2>
          <input
            defaultValue={multExpansion.Ngauss}
            onChange={(e) => {
              setMultExpansion({
                ...multExpansion,
                Ngauss: e.target.value.replaceAll(",", "."),
              });
            }}
          />{" "}
          <i className="fa fa-question-circle" aria-hidden="true" />
</div>
 }



        </div>

      </div>

      <div className={classes.allproperties2}>
        <div id="scatterer">
          
          <h1>Scatterer Properties</h1>

          <div className={classes.use}>
          <h2 style={{ display: "inline" }}>Type of Scatterer: </h2>
          <select onChange={(e) => setTypeOfScat(e.target.value)}
          defaultValue={typeofScat}
          >

            {ΕίδηΣκεδαστών.map((item) => {
              let name= item;
              if (name=="ELIPSE") {name="SPHEROID"}
              return <option value={item}>{name}</option>;
            })}
          </select>
          </div>

          <div className={classes.use}>
          <h2 style={{ display: "inline" }}>Length Units: </h2>
          <select onChange={(e) => setLengthUnitsScat(e.target.value)}
          defaultValue={lengthUnitsScat}  
        >
            {unitsLength.map((item) => {
              let toShow = item;
              if (item=="microm") {toShow="μm"}
              return <option value={item}>{toShow}</option>;
            })}
          </select>
          </div>

          {typeofScat == "SPHERE" && (
            <div>
              <img src="https://media.istockphoto.com/id/179022209/photo/blue-ball-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=j2nb5L2GO9YbbEc7N0HkiS3OO6PRwZnEBSw-mYyKDYc=" />
            </div>
          )}
          {typeofScat == "CYLINDER" && (
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wIZmirlb8pFfHMeT-IBrC3BZcivNAI2ysQ&usqp=CAU" />
            </div>
          )}
          {typeofScat == "CORESHELL" && (
            <div>
              <img src="/photos/coreshell-small.jpeg" />
            </div>
          )}


     


          {typeofScat=="GYROELECTRICSPHERE" &&
         <div key={typeofScat}>
         {GEChoices()}
</div>
            }

{typeofScat=="GYROMAGNETICSPHERE" &&
<div key={typeofScat}>
           {GMChoices()}
  </div>
            }

{/*           {typeofScat && (
            <div>
              <div key={typeofScat}>{ScatChoices(scatValues[typeofScat])}</div>
            </div>
          )} */}


{(typeofScat=="SPHERE" || typeofScat=="CYLINDER") && <div key={typeofScat}>
           {SphereCylindChoices ()}
  </div>}


  {typeofScat=="ELIPSE" && <div key={typeofScat}> 
          {SpheroidChoices()}
  </div>}

  {typeofScat=="CORESHELL" && <div key={typeofScat}>
         { CoreShellChoices()}
  </div>}
        </div>
      </div>

      <div className={classes.geometry}>

{/*         <h1>Geometry</h1>
        <BoxesPage type={typeofScat} scatterer={scatValues[typeofScat]} /> */}
<div key={loading}>
  <FastPlot
/* loading= {loading} */
/>
</div>

      </div>

            <div
            className={classes.runMultem}
            onClick={RunMultemHandler}
            ><div>Run Multem</div>
              
            </div>

    </div>
  </>

  );
}