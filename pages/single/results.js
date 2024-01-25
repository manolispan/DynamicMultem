import { useState, useEffect, useContext, useRef } from "react";
import dynamic from 'next/dynamic';
import Axios from "axios";
import classes from "./results.module.css";
import ConfirmPrompt from "../../components/ui/confirmprompt/confirmprompt";
import LoadingPrompt from '../../components/ui/loadingPrompt/loadingPrompt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


function Plots(props) {
  const [savePrompt, setSavePrompt] = useState(false);
  const [saveInput,setSaveInput]=useState(false);
  const [saveOutput,setSaveOutput]=useState(false);
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
<Dialog
        open={savedFilesPrompt}
        onClose={()=>setSavedFilesPrompt(false)}
        aria-describedby="alert-choose-files to load"
      >
        <DialogTitle>{"Which file to load?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-choose-files to load description">
          <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="8" label="index.js" />
          </TreeItem>
        </TreeItem>
      </TreeView>
          
          
          
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
                    {loadedResultFilesList.map((keyName, i) => {
                      let fileName= keyName;
                      if (keyName=="scs") {fileName="single_scatterer"}
                      return  <option key={i + "tt"} value={keyName}>
                      {fileName}
                    </option>
                    }

                    )}

                  </select></div>

         
<div className={classes.materialButton}>
<Button variant="contained"
size="small"
onClick={() => setSavedFilesPrompt(true)}>
  Load file
</Button>
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
  <Button
  size="small"
  color="error"
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
  >
Remove Graph
  </Button>
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
        <Button
        variant="contained"
        
        onClick={() => setSavePrompt(true)}>
          Save Input-Results
        </Button>
       

      </div>}

      <div className={classes.plotdata}>
      <Plot
        data={plotData}
        layout={{ width: width, height: 600, title: 'Best Plots Here' }}
        config={{ scrollZoom: true, editable: true }} />
        </div>
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