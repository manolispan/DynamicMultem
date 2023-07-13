import { useState, useEffect, useContext, useRef } from "react";
import dynamic from 'next/dynamic';
import Axios from "axios";
import classes from "./results.module.css";
import ConfirmPrompt from "../../components/ui/confirmprompt/confirmprompt";
import LoadingPrompt from '../../components/ui/loadingPrompt/loadingPrompt';


function Plots(props) {
  const [savePrompt, setSavePrompt] = useState(false);

  const [width, setWidth] = useState(800);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [loadedResultFilesList, setLoadedResultFilesList] = useState([])
  const [loadedResults, setLoadedResults] = useState({});

  const [savedResults, setSavedResults] = useState([]);

  const [savedFilesPrompt, setSavedFilesPrompt] = useState(false);

  const [chosenOutput, setChosenOutput] = useState("");
  const outputTypeRef = useRef();

  const [graphColor, setGraphColor] = useState("blue");
  const AllColors = ["blue", "black", "red", "yellow"];

  const [plotData, setPlotData] = useState([]);

  const [numberofPlots, setNumberOfPlots] = useState([0, 1, 2]);

  const [isLoading,setIsLoading] = useState(false);

  let idextra = "";
  if (props.idextra) { idextra = props.idextra };


  useEffect(() => {
    let outputs = {};
    let list = {};

    const getThisOutputs = async () => {
      const scs = await Axios.get('http://localhost:3001/thisrun/fort.98');



      outputs = {
        scs: scs.data,
/*         staticScatn: staticnOut.data,
        dynScat: dynOut.data,
        dynScatn: dynnOut.data,
        adiabScat: adiabOut.data,
        adiabScatn: adiabnOut.data */
      }

      let tempdata=data.slice(0);
      tempdata[0]={};
      tempdata[0]=scs.data
      setData(tempdata);
      setXAxis(scs.data.freq);
      setYAxis(scs.data.trans);

      setLoadedResultFilesList(["scs"])
      setLoadedResults(outputs);


    };

    const getListSavedOutputs = async () => {
      const staticout = await Axios.get('http://localhost:3001/loadoutputlist/static');
      const dynout = await Axios.get('http://localhost:3001/loadoutputlist/dyn');
      const adiabout = await Axios.get('http://localhost:3001/loadoutputlist/adiab');
      const scsout = await Axios.get('http://localhost:3001/loadoutputlist/scs');

      list = {
        static: staticout.data,
        dyn: dynout.data,
        adiab: adiabout.data,
        scs : scsout.data
      }
      setSavedResults(list)

    };

    getThisOutputs();
    getListSavedOutputs();
    setLoading(false);

    /*     Axios.get('http://localhost:3001/staticScat')
          .then((response) => {
            setData(response.data);
            setXAxis(response.data.freq);
            setYAxis(response.data.trans);
    
            setLoadedResultFilesList(["staticScat","dynScat","adiabScat","staticScatn","dynScatn","adiabScatn"])
    
    
            setLoading(false);
          }) */


  }, [])

  async function SaveFilesHandler() {
    setIsLoading(true);
    const input = {
      inputfile: document.getElementById("inputfile").checked,
      scs: document.getElementById("scs").checked,
      name: document.getElementById("filename").value
    }
    if (document.getElementById("inputfile").checked ||
    document.getElementById("scs").checked
    ) {

      const result = await Axios.post(
        'http://localhost:3001/savefilessingle',
        input
      )



    }

setSavePrompt(false);
setIsLoading(false);



  }


  async function LoadOutputHandler() {

    if (chosenOutput == "") { alert("Chose an Output!") }
    else {
      const result = await Axios.get(`http://localhost:3001/loadoutput/${outputTypeRef.current}/${chosenOutput}`);
      let previouslist = loadedResultFilesList;
      previouslist.push(chosenOutput);
      let previousresults = loadedResults;
      previousresults[chosenOutput] = result.data;

    }

  }



  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })

  return <div> {loading ? <>PLEASE WAIT</> :
    <>

{isLoading && <LoadingPrompt/>}
{savedFilesPrompt &&
                    <ConfirmPrompt
                    top = "5%"
                      text={<div className={classes.allInputList}>
                        <h4>Which file to load?</h4>
                        <div>Static</div>
                        <div className={classes.inputlist}>
                          {savedResults.static.map((name) =>
                            <div
                              key={name}
                              id={name}
                              onClick={(e) => {
                                setChosenOutput(e.target.id);
                                outputTypeRef.current = "savedstatic"

                              }}
                              className={chosenOutput == name ? classes.inputlistchosen : null}
                            >{name}</div>
                          )}
                        </div>

                        <div>Dynamic</div>
                        <div className={classes.inputlist}>
                          {savedResults.dyn.map((name) =>
                            <div
                              key={name}
                              id={name}
                              onClick={(e) => {
                                setChosenOutput(e.target.id);
                                outputTypeRef.current = "saveddyn"

                              }}
                              className={chosenOutput == name ? classes.inputlistchosen : null}
                            >{name}</div>
                          )}
                        </div>

                        <div>Adiabatic</div>
                        <div className={classes.inputlist}>
                          {savedResults.adiab.map((name) =>
                            <div
                              key={name}
                              id={name}
                              onClick={(e) => {
                                setChosenOutput(e.target.id);
                                outputTypeRef.current = "savedadiab"
                              }}
                              className={chosenOutput == name ? classes.inputlistchosen : null}
                            >{name}</div>
                          )}
                        </div>

                        <div>SCS</div>
                        <div className={classes.inputlist}>
                          {savedResults.scs.map((name) =>
                            <div
                              key={name}
                              id={name}
                              onClick={(e) => {
                                setChosenOutput(e.target.id);
                                outputTypeRef.current = "savedscs"
                              }}
                              className={chosenOutput == name ? classes.inputlistchosen : null}
                            >{name}</div>
                          )}
                        </div>

                      </div>
                      }
                      cancel={() => setSavedFilesPrompt(false)}
                      notext="Cancel"
                      yestext="Ok"
                      ok={LoadOutputHandler}
                    />
                  }
      {savePrompt &&
        <ConfirmPrompt
          text={
            <div>
              What do you want to save?
              <div>
                <label for="inputfile">Inputfile</label>
                <input type="checkbox" id="inputfile" />
              </div>

              <div>
                <label for="static"> SCS results</label>
                <input type="checkbox" id="scs" /></div>

              <div>
                Ονομασία Αρχείων :  <input type="text" id="filename" />
              </div>


            </div>}
          cancel={() => setSavePrompt(false)}
          ok={SaveFilesHandler}
        />
      }

      <div className={classes.alldata}>

        {
          numberofPlots.map((number) =>
            <div key={"key" + number + "extra" + idextra}>
              <div className={classes.savedfiles}>

                <div>File
                  <select
                    id={"file" + number + idextra}
                    onChange={(e) => {
                      let tempdata = data.slice(0);
                      if (typeof tempdata[number] != 'object') { tempdata[number] = {} };
                      tempdata[number] = loadedResults[e.target.value]
                      setData(tempdata);
                      document.getElementById("xaxis" + number + idextra).selectedIndex = 0;
                      document.getElementById("yaxis" + number + idextra).selectedIndex = 0;

                    }
                    }>
                    <option disabled selected>Select File</option>
                    {loadedResultFilesList.map((keyName, i) => (
                      <option key={i + "tt"} value={keyName}>
                        {keyName}
                      </option>
                    ))}

                  </select></div>

                <div style={{ position: "relative" }}><button onClick={() => setSavedFilesPrompt(true)}>Saved Files</button>


                </div>

              </div>

              <div className={classes.settings}>
                <div> Y AXIS
                  <select
                    id={"yaxis" + number + idextra}
                    onChange={(e) => {
                      let temp = plotData.slice(0);
                      if (typeof temp[number] != 'object') { temp[number] = {} };
                      temp[number].y = data[number][e.target.value]
                      setPlotData(temp)
                    }
                    }>
                    <option disabled selected>Select Y</option>
                    {data[number] && Object.keys(data[number]).map((keyName, i) => (
                      <option key={i} value={keyName}>
                        {keyName}
                      </option>
                    ))}

                  </select>

                </div>

                <div> X AXIS
                  <select
                    id={"xaxis" + number + idextra}
                    onChange={(e) => {
                      let temp = plotData.slice(0);
                      if (typeof temp[number] != 'object') { temp[number] = {} };
                      temp[number].x = data[number][e.target.value]
                      temp[number].type = 'scatter'
                      temp[number].mode = 'lines'
                      setPlotData(temp)
                    }
                    }>
                    <option disabled selected>Select X</option>
                    {data[number] && Object.keys(data[number]).map((keyName, i) => (
                      <option key={i + "x"} value={keyName}>
                        {keyName}
                      </option>
                    ))}

                  </select>

                </div>


                <div> Color
                  <select
                    id={"color" + number + idextra}
                    onChange={(e) => {
                      let temp = plotData.slice(0);
                      if (typeof temp[number] != 'object') { temp[number] = {} };
                      if (!temp[number].marker) { temp[number].marker = {} }
                      temp[number].marker.color = e.target.value
                      setPlotData(temp)
                    }
                    }>
                    {AllColors.map((i) => (
                      <option key={i + "x"} value={i}>
                        {i}
                      </option>
                    ))}

                  </select>

                </div>


                {/* FIX THE OPTIONS OF SELECT DO NOT CHANGE if u have a different file! */}
                <div>
                  <button
                    onClick={() => {
                      let temp = numberofPlots.slice(0);
                      temp.pop();
                      setNumberOfPlots(temp);
                      let temp2 = plotData.slice(0);
                      temp2.splice(number, 1);
                      setPlotData(temp2);
                      /*  for (let i=number ; i<numberofPlots.length-1 ; i++)
                       {let j=i+1;
                         document.getElementById("file"+i+idextra).value= document.getElementById("file"+j+idextra).value;
                         document.getElementById("xaxis"+i+idextra).value= document.getElementById("xaxis"+j+idextra).value;
                         document.getElementById("yaxis"+i+idextra).value= document.getElementById("yaxis"+j+idextra).value;
                         document.getElementById("color"+i+idextra).value= document.getElementById("color"+j+idextra).value;
                       }
              */
                    }}
                  >Remove Graph</button>
                </div>





              </div>

            </div>
          )
        }




        <div className={classes.addgraph}><div
          onClick={() => {
            let temp = numberofPlots.slice(0);
            temp.push(temp[temp.length - 1] + 1);
            setNumberOfPlots(temp)

          }
          }
        >Add graph</div></div>
      </div>

      {idextra==="" &&       <div className={classes.savePrompt}>
        <div onClick={() => setSavePrompt(true)}>Save Input-Results</div>

      </div>}


      <Plot
        data={plotData}
        layout={{ width: width, height: 600, title: 'Best Plots Here' }}
        config={{ scrollZoom: true, editable: true }} />
    </>}

{/*     <Plot
        data={[{

          z: [[10, 10.625, 12.5, 15.625, 20],
        
               [5.625, 6.25, 8.125, 11.25, 15.625],
        
               [2.5, 3.125, 5., 8.125, 12.5],
        
               [0.625, 1.25, 3.125, 6.25, 10.625],
        
               [0, 0.625, 2.5, 5.625, 10]],
        
          x: [-9, -6, -5 , -3, -1],
        
          y: [0, 1, 4, 5, 7],
        
          type: 'contour'
        
        }]}
        layout={{ width: width, height: 600, title: 'Best Plots Here' }}
        config={{ scrollZoom: true, editable: true }} /> */}
  </div>
}

export default Plots