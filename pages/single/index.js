import { useEffect, useState } from "react";
import BoxesPage from "../../components/threejs/singlescat";
import classes from "./index.module.css";
import Axios from "axios";
import LoadingPrompt from "../../components/ui/loadingPrompt/loadingPrompt";
import ConfirmPrompt from "../../components/ui/confirmprompt/confirmprompt";
import { useRouter } from "next/router";

export default function Homepage(props) {
  const router = useRouter();
  const [loading,setLoading]= useState(false);
  const [loadingValues,setLoadingValues]= useState(true);
  const [multemEnd,setMultemEnd]=useState(false);
  const ΕίδηΣκεδαστών = ["SPHERE", "CYLINDER", "ELIPSE"];
  const unitsFreq = ["MHz", "GHz", "THz"];
  const unitsLength = ["mm", "microm", "nm"];
  const polarizationChoices = ["P", "S", "L", "R"];
  const [typeofScat, setTypeOfScat] = useState("SPHERE");
  const [typeofMaterial,setTypeofMaterial]=useState("userdefined");
  const [lengthUnitsScat,setLengthUnitsScat]=useState("nm");
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
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [1, 1, 1],
      radius: [1, 4, 1],
    },
    CYLINDER: {
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [1, 1, 1],
      radius: [1, 4, 1],
      height: [1, 4, 1],
    },
    ELIPSE: {
      epsReal: [12, 12, 1],
      epsImag: [0, 12, 1],
      muReal: [1, 1, 1],
      muImag: [1, 1, 1],
      radius1: [1, 4, 1],
      radius2: [1, 4, 1],
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

  function ScatChoices(items) {
    let text = [];
    Object.entries(items).forEach(([key, value]) => {
      if (typeofMaterial=="userdefined" || 
      (key!="epsReal" && key!="epsImag" && key!="muReal" && key!="muImag")
      )
      text.push(
        <div>
          <h2 className={classes.inline}>{key} {key=="radius" || key=="height" ?
          <>({lengthUnitsScat})</>:null}:</h2>
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

{/*           <input
            type="checkbox"
            checked={
              scatValues[typeofScat][key][2] != 0 &&
              scatValues[typeofScat][key][2] != 1
                ? true
                : false
            }
            id={"sweep" + typeofScat + key}
            onChange={(e) => {
              if (!e.target.checked) {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat][key][2] = 1;
                setScatValues(temp);
              } else {
                const temp = Object.assign({}, scatValues);
                temp[typeofScat][key][2] = 2;
                setScatValues(temp);
              }
            }}
          /> */}

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
      );
    });

    return <>{text}</>;
  }

  async function RunMultemHandler() {

  setLoading(true)
    
  
    const input = {
      typeofScat : typeofScat,
      lengthUnitsScat : lengthUnitsScat,
      ...scatValues[typeofScat],
      ...envValues,
      ...lightValues,
      ...multExpansion

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
      console.log(input)
      setTypeOfScat(input[1]);
      setLengthUnitsScat(input[2]);
      if (input[1]=="SPHERE") {
        setScatValues({
          SPHERE: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius: input[7].split(" "),
          },
          CYLINDER: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius: input[7].split(" "),
            height: input[7].split(" "),
          },
          ELIPSE: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius1: input[7].split(" "),
            radius2: input[7].split(" "),
          },
        });
      
      setEnvValues({
        epsEnv: input[8],
        muEnv: input[9],
      });

      let a = true;
      let b = false;
      if (input[10].split(" ")[3]=="false")
      {a= false;
        b=true; }

      setLightValues({
        frequency: [input[10].split(" ")[0],
        input[10].split(" ")[1],
        input[10].split(" ")[2],a],
        wavelength: [input[11].split(" ")[0],
        input[11].split(" ")[1],
        input[11].split(" ")[2],b],
        thetaIn: input[12].split(" "),
        phiIn: input[13].split(" "),
        polarization: input[14],
        unitsOfFreq: input[15],
        unitsOfWavelength: input[16],
      });

      setMultExpansion({
        lmax: input[17],
        ltmax: input[18],
        Ngauss: input[19]
      });


      }
  

      if (input[1]=="ELIPSE") {
        setScatValues({
          SPHERE: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius: input[7].split(" "),
          },
          CYLINDER: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius: input[7].split(" "),
            height: input[8].split(" "),
          },
          ELIPSE: {
            epsReal: input[3].split(" "),
            epsImag: input[4].split(" "),
            muReal: input[5].split(" "),
            muImag: input[6].split(" "),
            radius1: input[7].split(" "),
            radius2: input[8].split(" "),
          },
        });
      
      setEnvValues({
        epsEnv: input[9],
        muEnv: input[10],
      });

      let a = true;
      let b = false;
      if (input[11].split(" ")[3]=="false")
      {a= false;
        b=true; }

      setLightValues({
        frequency: [input[11].split(" ")[0],
        input[11].split(" ")[1],
        input[11].split(" ")[2],a],
        wavelength: [input[12].split(" ")[0],
        input[12].split(" ")[1],
        input[12].split(" ")[2],b],
        thetaIn: input[13].split(" "),
        phiIn: input[14].split(" "),
        polarization: input[15],
        unitsOfFreq: input[16],
        unitsOfWavelength: input[17],
      });

      setMultExpansion({
        lmax: input[18],
        ltmax: input[19],
        Ngauss: input[20]
      });


      }



      setLoadingValues(false);
     
  
   
  
  
  
  },[])
  
  return (<>    
  {loading && <LoadingPrompt/>}
  {loadingValues && <LoadingPrompt/>}
  {multemEnd && <ConfirmPrompt
  text="Success! Multem has ended"
  yestext= "Go to results"
  notext = "Stay here"
  cancel = {()=>setMultemEnd(false)}
  ok = {()=> router.push("/single/results")}
  />}

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
                    return <option value={item}>{item}</option>;
                  })}
                </select>{" "}
                <i className="fa fa-question-circle" aria-hidden="true" />
              </>
            )}
          </div>

          <div key={lightValues.frequency[3] === true ? "freq" : "wave"}>
{/*             {lightValues.frequency[3] == true && (
              <>
                <h2 className={classes.inline}>
                  {Object.keys(lightValues)[0]} ({lightValues.unitsOfFreq}):
                </h2>{" "}
                {(lightValues.frequency[2] == 0 || lightValues.frequency[2] == 1) && (
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
                )}{" "}
                <h2 className={classes.inline}>
                  <label htmlFor={"sweep" + Object.keys(lightValues)[0]}>
                    sweep:
                  </label>
                </h2>
                <input
                  type="checkbox"
                  checked={lightValues.frequency[2]!= 0 &&  lightValues.frequency[2]!= 1? true : false}
                  id={"sweep" + Object.keys(lightValues)[0]}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setLightValues({
                        ...lightValues,
                        frequency: [
                          lightValues.frequency[0],
                          lightValues.frequency[1],
                          0,
                          lightValues.frequency[3],
                        ],
                      });
                    } else {
                      setLightValues({
                        ...lightValues,
                        frequency: [
                          lightValues.frequency[0],
                          lightValues.frequency[1],
                          2,
                          lightValues.frequency[3],
                        ],
                      });
                    }
                  }}
                />
                {lightValues.frequency[2] != 0 && lightValues.frequency[2] != 1 && (
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
                )}
              </>
            )}
 */}

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



{/* {lightValues.wavelength[3] == true && (
              <>
                <h2 className={classes.inline}>
                  {Object.keys(lightValues)[1]}  ({lightValues.unitsOfWavelength}):
                </h2>{" "}
                {(lightValues.wavelength[2] == 0 || lightValues.wavelength[2] == 1) && (
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
                )}{" "}
                <h2 className={classes.inline}>
                  <label htmlFor={"sweep" + Object.keys(lightValues)[1]}>
                    sweep:
                  </label>
                </h2>
                <input
                  type="checkbox"
                  checked={lightValues.wavelength[2]!= 0 &&  lightValues.wavelength[2]!= 1? true : false}
                  id={"sweep" + Object.keys(lightValues)[1]}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setLightValues({
                        ...lightValues,
                        wavelength: [
                          lightValues.wavelength[0],
                          lightValues.wavelength[1],
                          0,
                          lightValues.wavelength[3],
                        ],
                      });
                    } else {
                      setLightValues({
                        ...lightValues,
                        wavelength: [
                          lightValues.wavelength[0],
                          lightValues.wavelength[1],
                          2,
                          lightValues.wavelength[3],
                        ],
                      });
                    }
                  }}
                />
                {lightValues.wavelength[2] != 0 && lightValues.wavelength[2] != 1 && (
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
                )}
              </>
            )} */}

{lightValues.wavelength[3] == true && (
              <>
                <h2 className={classes.inline}>
                  {Object.keys(lightValues)[1]}  ({lightValues.unitsOfWavelength}):
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
{/*                 <h2 className={classes.inline}>
                  <label htmlFor={"sweep" + "thetaIn"}>
                    sweep:
                  </label>
                </h2>
                <input
                  type="checkbox"
                  checked={lightValues.thetaIn[2]!= 0 &&  lightValues.thetaIn[2]!= 1? true : false}
                  id={"sweep" + "thetaIn"}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setLightValues({
                        ...lightValues,
                        thetaIn: [
                          lightValues.thetaIn[0],
                          lightValues.thetaIn[1],
                          0
                        ],
                      });
                    } else {
                      setLightValues({
                        ...lightValues,
                        thetaIn: [
                          lightValues.thetaIn[0],
                          lightValues.thetaIn[1],
                          2
                        ],
                      });
                    }
                  }}
                /> */}


{/* {lightValues.thetaIn[2] != 0 && lightValues.thetaIn[2] != 1 && (
                  <div>
                    start:{" "}
                    <input
                      defaultValue={lightValues.thetaIn[0]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          thetaIn: [
                            e.target.value.replaceAll(",", "."),
                            lightValues.thetaIn[1],
                            lightValues.thetaIn[2]
                          ],
                        });
                      }}
                    />
                    end:{" "}
                    <input
                      defaultValue={lightValues.thetaIn[1]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          thetaIn: [
                            lightValues.thetaIn[0],
                            e.target.value.replaceAll(",", "."),
                            lightValues.thetaIn[2]
                          ],
                        });
                      }}
                    />
                    points:{" "}
                    <input
                      defaultValue={lightValues.thetaIn[2]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          thetaIn: [
                            lightValues.thetaIn[0],
                            lightValues.thetaIn[1],
                            e.target.value.replaceAll(",", ".")
                          ],
                        });
                      }}
                    />
                  </div>
                )} */}

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
{/*                 <h2 className={classes.inline}>
                  <label htmlFor={"sweep" + "phiIn"}>
                    sweep:
                  </label>
                </h2>
                <input
                  type="checkbox"
                  checked={lightValues.phiIn[2]!= 0 &&  lightValues.phiIn[2]!= 1? true : false}
                  id={"sweep" + "phiIn"}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setLightValues({
                        ...lightValues,
                        phiIn: [
                          lightValues.phiIn[0],
                          lightValues.phiIn[1],
                          0
                        ],
                      });
                    } else {
                      setLightValues({
                        ...lightValues,
                        phiIn: [
                          lightValues.phiIn[0],
                          lightValues.phiIn[1],
                          2
                        ],
                      });
                    }
                  }}
                /> */}
</div>
{/* 
{lightValues.phiIn[2] != 0 && lightValues.phiIn[2] != 1 && (
                  <div>
                    start:{" "}
                    <input
                      defaultValue={lightValues.phiIn[0]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          phiIn: [
                            e.target.value.replaceAll(",", "."),
                            lightValues.phiIn[1],
                            lightValues.phiIn[2]
                          ],
                        });
                      }}
                    />
                    end:{" "}
                    <input
                      defaultValue={lightValues.phiIn[1]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          phiIn: [
                            lightValues.phiIn[0],
                            e.target.value.replaceAll(",", "."),
                            lightValues.phiIn[2]
                          ],
                        });
                      }}
                    />
                    points:{" "}
                    <input
                      defaultValue={lightValues.phiIn[2]}
                      onChange={(e) => {
                        setLightValues({
                          ...lightValues,
                          phiIn: [
                            lightValues.phiIn[0],
                            lightValues.phiIn[1],
                            e.target.value.replaceAll(",", ".")
                          ],
                        });
                      }}
                    />
                  </div>
                )} */}


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
          <h1>Enviroment Constants</h1>
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
              return <option value={item}>{item}</option>;
            })}
          </select>
          </div>

          <div className={classes.use}>
          <h2 style={{ display: "inline" }}>Length Units: </h2>
          <select onChange={(e) => setLengthUnitsScat(e.target.value)}
          defaultValue={lengthUnitsScat}  
        >
            {unitsLength.map((item) => {
              return <option value={item}>{item}</option>;
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

   <div className={classes.materialdiv}>
    <h2 className={classes.inline}>Material: </h2>
<select
onChange={(e)=>setTypeofMaterial(e.target.value)}
defaultValue={typeofMaterial}
>
   <option value="loadmaterial">Load Material</option>
   <option value="userdefined">User Defined</option>
          </select>

    {typeofMaterial=="loadmaterial" && 
    <select>
   <option>Si (Aspnes)</option>
   <option>Au</option>
   <option>SiO2</option>
   <option>+ Add  new</option>
          </select>  }            
          
          </div>       




          {typeofScat && (
            <div>
              <div key={typeofScat}>{ScatChoices(scatValues[typeofScat])}</div>
            </div>
          )}
        </div>
      </div>

      <div className={classes.geometry}>
        <h1>Geometry</h1>
        <BoxesPage type={typeofScat} scatterer={scatValues[typeofScat]} />
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