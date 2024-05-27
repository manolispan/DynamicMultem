import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
//import BoxesPage from "../../components/threejs/singlescat";
import classes from "./index.module.css";
import Axios from "axios";
import LoadingPrompt from "../../components/ui/loadingPrompt/loadingPrompt";
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
import FastPlot from "../../components/fastplot/fastplot";
import BasicTabs from "../../components/twotabs/twotabs";
import PlanePlot from "../../components/fieldplot/fieldplot2";

const BoxesPage = dynamic(
  () => import('../../components/threejs/singlescat'), { ssr: false });

  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })

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
  const [editMaterials,setEditMaterials]=useState(false);
  const [materialList,setMaterialList] = useState([])

  useEffect(()=>{
    if (router.query.editmat && router.query.editmat=="open") {
      setEditMaterials(true)}
      else {
        if (editMaterials==true)
       { setEditMaterials(false)}}
  },[router.query.editmat])


  function addUrlParam(param, value) {
    const { pathname, query } = router;
    const updatedQuery = { ...query };

    if (value === "") {
        delete updatedQuery[param];
    } else {
        updatedQuery[param] = value;
    }

    router.push({ pathname, query: updatedQuery });
}

  async function GetListMat () {
    const response = await Axios.get('http://localhost:3001/materialslist');
  
    let newdata=[]

    for (let i=0; i<response.data.length;i++)
    {newdata.push(JSON.parse(response.data[i]))}

    setMaterialList(newdata)
  }
  

  const fieldQuualityOptions = [
    {name: "low" ,
    value : 51
    },
    {name: "medium" ,
    value : 101
    },


  ]


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

const [fieldQuality,setFieldQuality]= useState(51);

  const [runMode,setRunMode]=useState("scs")

const [fieldPoint,setFieldPoint]=useState(1);



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

return <div key={lightValues.unitsOfWavelength+"-"+lightValues.unitsOfWavelength+"-"+start+ end}
className={classes.materialinfo}
>
  
  {lightValues.frequency[3]==false ? <>
  Wavelength Range: {end.toExponential(2)} to {start.toExponential(2)} {units}</> :
  <>Frequency Range: {start.toExponential(2)} to {end.toExponential(2)} {units}</>
  }
  
  
  
</div>

}

function findIndexByName(arr, name) {
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].filename === name) {
          return i; // Return index if name matches
      }
  }
  return -1; // Return -1 if name not found
}

function MaterialChoice (props) {

  let property = "typeofMaterial";
  if (props.type && props.type !="") {property=props.type }

const activeIndex = findIndexByName(materialList,scatValues[typeofScat][property])



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

  {materialList.map((choice)=>{
    return <>
    {typeofScat=="GYROELECTRICSPHERE" && choice.typeOfMat && choice.typeOfMat=="gyroelectric" &&
    <option value={choice.filename} id={choice.filename}>
      {choice.name} 
    </option>}
    
    {typeofScat=="GYROMAGNETICSPHERE" && choice.typeOfMat && choice.typeOfMat=="gyromagnetic" &&
    <option value={choice.filename} id={choice.filename}>
      {choice.name} 
    </option>}

    {typeofScat!="GYROMAGNETICSPHERE" && typeofScat!="GYROELECTRICSPHERE" && 
    (!choice.typeOfMat || (choice.typeOfMat!="gyromagnetic" && choice.typeOfMat!="gyroelectric")) 
    &&
    <option value={choice.filename} id={choice.filename}>
      {choice.name} 
    </option>}
    
    </>
  })}
  
          </select> <Button 
          variant="contained"
          size = "small"
          onClick={()=>addUrlParam("editmat","open")}
          >Edit Materials</Button>

          {scatValues[typeofScat][property] && scatValues[typeofScat][property]!="userdefined" &&

   <RangeOfFreqsMaterials
   start = {materialList[activeIndex].minValue}
   end = {materialList[activeIndex].maxValue}
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
{  activeIndex = findIndexByName(materialList,scatValues[typeofScat]["typeofMaterial"])
  start=parseFloat(materialList[activeIndex].minValue);
  end=parseFloat(materialList[activeIndex].maxValue);

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
    activeIndex = findIndexByName(materialList,scatValues[typeofScat]["typeofMaterial"])
  start=parseFloat(materialList[activeIndex].minValue);
  end=parseFloat(materialList[activeIndex].maxValue);

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
    activeIndex = findIndexByName(materialList,scatValues[typeofScat]["typeofMaterialShell"+j])
    start=parseFloat(materialList[activeIndex].minValue);
    end=parseFloat(materialList[activeIndex].maxValue);
  
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


function MaterialsEdit () {

  const [x,setX]=useState([])
  const [y,setY]=useState([])
  const [z,setZ]=useState([])
  const [graphTitle,setGraphTitle]=useState("");

  const [addnewMaterial,setAddnewMaterial]=useState(false);

  function AddNewMaterial () {

    const [fileUpload,setFileUpload] = useState();
  
  
    async function filehandler () {
      const fd = new FormData();
      fd.append('name', document.getElementById("filename").value)
      fd.append('skiplines', document.getElementById("skiplines").value)
      fd.append('typeOfMat', document.getElementById("typeOfMat").value)
      fd.append('file', fileUpload, document.getElementById("filename").value)
      try {
       
        const res= await Axios.post('http://localhost:3001/addnewmaterial',fd);
  
        if (res.data.success && res.data.success===true) {
          alert("success!");
          GetListMat ();
          setAddnewMaterial(false)
        
        }
        else {alert("Failed")}
  
      }
  
      catch (err) {console.log(err)}
    
    }
  
    return <>
          <DialogTitle><span className=" w-full p-1 font-semibold ">
            Add New Material</span></DialogTitle>
          <DialogContent>
<div className="p-1 pb-3  w-full flex flex-row justify-between items-center text-slate-800 border-b border-solid border-t-0 border-x-0    
           border-slate-400">Type of material: <select id="typeOfMat" className="p-1 mr-1 rounded-md">
      <option value="normal">Normal</option>
      <option value="gyroelectric">Gyroelectric</option>
      <option value="gyromagnetic">Gyromagnetic</option>
      </select></div>
  
          <div className=" text-slate-800 p-1 pb-2 pt-2 w-full flex flex-row justify-between items-center border-b border-solid border-t-0 border-x-0    
           border-slate-400">
            Name of material: <input 
           className=" w-28 p-1"
          placeholder="Name of Material" id="filename"/></div>
    <div className="border-b border-solid border-t-0 border-x-0    
           border-slate-400 text-slate-800 p-1 pb-2 pt-2 w-full flex flex-row justify-between items-center">
      Lines to Skip: <input 
    className="p-1"
    type="number" id="skiplines" defaultValue={0}/></div>

    <div className="border-b border-solid border-t-0 border-x-0    
           border-slate-400 text-slate-800 p-1 pt-2 pb-2 w-full flex flex-row justify-between items-center">Upoad file: <input type="file" 
    className="w-48 ml-4"
    onChange={(e) => setFileUpload(e.target.files?.[0])}/></div>
  
          </DialogContent>
          <DialogActions>
          <Button onClick={()=>setAddnewMaterial(false)}>Cancel</Button>
            <Button onClick={()=>filehandler ()}>Upload</Button>
          </DialogActions>
  
  
  </>
  }
  
  async function downloadMaterialData (file,kind) {
    let fileToDnld= file;
  
    if (kind=="jsondata")
      {fileToDnld= file.replace('.txt', '-info.txt');}
  
    
  
    const body = {filename : fileToDnld}
   
    const result = await Axios.post('http://localhost:3001/downloadmaterial',
      body
    );
  
    let textToWrite=result.data;
  
   
    if (kind=="jsondata") {
      textToWrite=JSON.stringify(textToWrite)
    }
  
    const blob = new Blob([textToWrite], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileToDnld;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  


  return <>
  <Dialog
maxWidth="xl"
fullscreen
sx={{
  ["&>div"] : 
  {maxWidth:"none"}
}}
        open={addnewMaterial}
        onClose={()=>setAddnewMaterial(false)}
        aria-describedby="alert-dialog-add-materials"
      >

<AddNewMaterial/>


      </Dialog>
  <div className="flex flex-row justify-center items-stretch min-h-[600px]">



    <div className={`p-4 mt-12 w-full h-full border-slate-200 border-solid border 
      rounded-sm  min-w-60 flex flex-col 
     flex-nowrap justify-between
    `}>
      
      
      <div className=" list-none p-0 ">
      <h3 className="pb-0 mb-2">Materials</h3>
      <div
      className="text-slate-600 mb-4"
      >Choose Material to see its properties graph. If you 
      want to add more materials press the "add new" button. You can also download 
      the material data in text format or json format.</div>
        {materialList.map((item)=>{
          return <div className="flex flex-row justify-between items-center border-b border-solid border-t-0 border-x-0   mt-0 
           border-slate-400"
           key={item.name}>
          <div
          className={`p-0 m-0 py-2  pl-2 hover:cursor-pointer hover:bg-slate-200 w-full`}
          onClick={()=>{
            setX(item.eV)
            setY(item.k)
            setZ(item.n)
            setGraphTitle(item.name)
          }}
          >
            {item.name}
           
          </div> 

          <div className=" min-w-fit py-2 pl-2 pr-2">

            {item.typeOfMat=="gyromagnetic" || item.typeOfMat=="gyroelectric" &&           
            <span
          className=" text-xs text-sky-700 mr-4"
          >
            {item.typeOfMat=="gyromagnetic" && <span title="Gyromagnetic">GM</span>}
            {item.typeOfMat=="gyroelectric" && <span title="Gyroelectric">GE</span>}
        </span>}



          <span
          title="download json data"
          onClick={()=>downloadMaterialData(item.filename,"jsondata")}
          className=" text-xs text-sky-700 hover:cursor-pointer"
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" 
          viewBox="0 0 24 24" strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-3 h-3 translate-y-1 mr-1">
          <path strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg> json
        </span>

        <span
        title="download txt data"
          onClick={()=>downloadMaterialData(item.filename,"plaindata")}
          className=" text-xs text-sky-700 hover:cursor-pointer"
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" 
          viewBox="0 0 24 24" strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-3 h-3 translate-y-1 ml-3">
          <path strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg> data
        </span>
        </div>
          
          </div>
          
        })}
      </div>

<div className="pt-6">
  <Button variant="contained"
  onClick={()=>setAddnewMaterial(true)}
  >Add New</Button>
</div>
      </div>

<div className="p-4  pt-0 w-full">


  <Plot
data={[{
  x: x,
  y: y,
  mode: 'markers',
  type: 'scatter',
  name : "k"
},
{
x: x,
y: z,
mode: 'markers',
type: 'scatter',
name : "n"
}
]}
        layout={{   
        title: graphTitle,
        xaxis:{title: "freq(eV)"},
        yaxis:{title: "k,n"},
        autosize:true 
      }}
        config={{ scrollZoom: true, editable: true }} 
        useResizeHandler
        className="w-full h-full " 
        />
</div>
  </div></>
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
      runMode : runMode,
      fieldPoint : fieldPoint,
      fieldQuality : fieldQuality

    }
  


  
  const result = await Axios.post(
    'http://localhost:3001/runsingle',
    input
  )
  setLoading(false);
  setMultemEnd(true);
  if (runMode=="scs")
  {document.getElementById("simple-tab-1").click()}
  else if (runMode=="field")
  {document.getElementById("simple-tab-2").click()}

  }


  async function FetchInput () {
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

    setRunMode(input[62+coreShells*6]);
   setFieldPoint(input[63+coreShells*6]) 
   setFieldQuality(input[64+coreShells*6])


  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        await GetListMat();
        await FetchInput();
      } catch (error) {
        alert("Error fetching data: ", error);
      } finally {
        setLoadingValues(false);
      }
    };

    fetchData();
    
     

  
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
fullScreen
        open={editMaterials}
        onClose={()=>addUrlParam("editmat","")}
        aria-describedby="alert-dialog-edit-materials"
      >
      
        <DialogTitle>{"Materials Management"}</DialogTitle>
        <DialogContent>

<MaterialsEdit/>

        </DialogContent>
        <DialogActions>
          <div className="p-10">
            <Button variant="contained" 
            size= "large"
            onClick={()=>addUrlParam("editmat","")}>
              Done</Button></div>
          
        </DialogActions>
        
      
      </Dialog>

 <Dialog
        open={multemEnd}
        onClose={()=>setMultemEnd(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The simulation has finished successfully!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Successfully calculated 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setMultemEnd(false)}>ok</Button>
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
            <h2 style={{ display: "inline" }}>Calculate</h2>{" "}
            <select
onChange={(e)=>setRunMode(e.target.value)}
            >
              <option
                value={"scs"}
                selected={runMode=="scs"}
              >
                Scattering Cross Section
              </option>

              <option
                value={"field"}
                selected={runMode=="field"}
              >
                Field
              </option>
            </select>{" "}
            <i className="fa fa-question-circle" aria-hidden="true" />
          </div>

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

{runMode=="scs" &&  <>
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
            )}</>

}



{runMode=="field" && (
              <>

                  <div>
                  <b>Find Field at &nbsp;
                    {lightValues.frequency[3] == true ? <span>({lightValues.unitsOfFreq})</span> :
                    <span>({lightValues.unitsOfWavelength=="microm"? <>μm</> : <>{lightValues.unitsOfWavelength}</>})</span>

                    }
                     :{" "}</b>
                    <input
                    onChange={(e)=>setFieldPoint(e.target.value)}
                      defaultValue={fieldPoint}
                    />

                  </div>

                  <div>

                  <b>Quality</b> <select
                  onChange={(e) => {
                    setFieldQuality(e.target.value)
                  }}
                  defaultValue={fieldQuality}
                >
                  {fieldQuualityOptions.map((item) => {
                    let text=item.name;
                    if (item.name=="medium") {text="medium (locked)"}
                    return <option value={item.value} disabled={item.name=="medium"}>{text}</option>;
                  })}
                </select>
                  </div>



                  <div 
                  style={{
                    color: fieldQuality==101 ? "orangered" : "transparent"
                  }}
                  >Medium Quality selected - slower run time</div>
                
              </>
            )}

          </div>

         
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


{/* <div>
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

</div> */}

              <div>
                <h2 className={classes.inline}>polarization:</h2>{" "}
                <select
                defaultValue={lightValues.polarization}
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



<div className=" absolute mt-24 text-zinc-900 ml-3 flex flex-row">
  <div
  className="w-10 mr-2 text-transparent border-solid border-orange-600 border-b-0 border-r-0 border-l-0 translate-y-3"
  >E</div> <div>Wave Vector</div>
</div>

<div className=" absolute mt-32 text-zinc-900 ml-3 flex flex-row">
  <div
  className="w-10 mr-2 text-transparent border-solid border-yellow-400 border-b-0 border-r-0 border-l-0 translate-y-3"
  >E</div> <div>Electric Field</div>
</div>




{(typeofScat=="GYROELECTRICSPHERE" || typeofScat=="GYROMAGNETICSPHERE") && 
<div className=" absolute mt-40 text-zinc-900 ml-3 flex flex-row">
  <div
  className="w-10 mr-2 text-transparent border-solid border-black border-b-0 border-r-0 border-l-0 translate-y-3"
  >E</div> <div>Polarization</div>
</div>
}

{/*         <h1>Geometry</h1>
        <BoxesPage type={typeofScat} scatterer={scatValues[typeofScat]} /> 
<div key={loading}>
  <FastPlot
/>
</div> */}

<BasicTabs
tab1= {<div className={classes.sxhma}>
    <BoxesPage 
  type={typeofScat} 
  scatterer={scatValues[typeofScat]} 
  lightValues= {lightValues} />
  </div>
 }
tab2 = {<div key={loading}>  <FastPlot
 polarization={lightValues.polarization}
  /></div>}

  tab3 = {<div key={loading}>  {!loading && <PlanePlot/>} </div>}

/>

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