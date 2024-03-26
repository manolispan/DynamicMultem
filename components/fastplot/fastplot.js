import { useState, useEffect, useContext, useRef } from "react";
import dynamic from 'next/dynamic';
import Axios from "axios";
import classes from "./fastplot.module.css";
import ConfirmPrompt from "../ui/confirmprompt/confirmprompt";
import LoadingPrompt from '../ui/loadingPrompt/loadingPrompt';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function FastPlot(props) {

  const [width, setWidth] = useState(500);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedResultFilesList, setLoadedResultFilesList] = useState([])
  const [loadedResults, setLoadedResults] = useState({});

  const [savedResults, setSavedResults] = useState([]);

  const [savedFilesPrompt, setSavedFilesPrompt] = useState(false);

  const [chosenOutput, setChosenOutput] = useState("");
  const outputTypeRef = useRef();

  const [graphColor, setGraphColor] = useState("blue");
  const AllColors = ["blue", "black", "red", "yellow"];

  const [plotData, setPlotData] = useState([]);

  const [numberofPlots, setNumberOfPlots] = useState([0]);

  const [isLoading,setIsLoading] = useState(false);

  const [snackBar,setSnackBar]=useState(false);
  const [xLegend,setXLegend]=useState("");
  const [yLegend,setYLegend]=useState("");

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
/*       let templotdata={};
      templotdata.x=scs.data["freq(eV)"];
      templotdata.y=scs.data["SCS"];
setPlotData(templotdata) */
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


  }, [/* props.loading */])



  async function LoadOutputHandler() {

    if (chosenOutput == "") { alert("Chose an Output!") }
    else {
      const result = await Axios.get(`http://localhost:3001/loadoutput/${outputTypeRef.current}/${chosenOutput}`);
      let previouslist = loadedResultFilesList;
      previouslist.push(chosenOutput);
      let previousresults = loadedResults;
      previousresults[chosenOutput] = result.data;
      setSnackBar(true)
    }

  }



  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })

  return <div
  className={classes.allpage}
  > {loading ? <>PLEASE WAIT</> :
    <>

{isLoading && <LoadingPrompt/>}



<Dialog
        open={savedFilesPrompt}
        onClose={()=>setSavedFilesPrompt(false)}
        aria-describedby="alert-choose-files to load"
      >
        <DialogTitle
                sx={{
                  backgroundColor : "lightgray"
                }}
        >{"Which file to load?"}</DialogTitle>
        <DialogContent
                sx={{
                  backgroundColor : "lightgray"
                }}>
                            <DialogContentText id="alert-dialog-slide-description">
          First select what type of output you want to load. Sorting is alphabetically.
          </DialogContentText><br/>
          <DialogContentText id="alert-choose-files to load description">
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         SCS
        </AccordionSummary>
        <AccordionDetails>
         
        
                          {
                          savedResults && savedResults.scs &&
                          savedResults.scs!="" &&
                          savedResults.scs.map((name) =>
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
                        
          
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         Periodic Static
        </AccordionSummary>
        <AccordionDetails>
         
        
                          {
                                savedResults && savedResults.static &&
                                savedResults.static!="" &&                    
                          savedResults.static.map((name) =>
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
                        
          
        </AccordionDetails>
      </Accordion>     
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         Periodic Dynamic
        </AccordionSummary>
        <AccordionDetails>
         
        
                          {
                          savedResults && savedResults.dyn &&
                          savedResults.dyn!="" &&                          
                          savedResults.dyn.map((name) =>
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
                        
          
        </AccordionDetails>
      </Accordion> 
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         Periodic Adiabatic
        </AccordionSummary>
        <AccordionDetails>
         
        
                          {
                          savedResults && savedResults.adiab &&
                          savedResults.adiab!="" &&
                          savedResults.adiab.map((name) =>
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
                        
          
        </AccordionDetails>
      </Accordion>       
          </DialogContentText>

        </DialogContent>

        <DialogActions
                sx={{
                  backgroundColor : "lightgray"
                }}
        >
          
          <Button variant="contained" 
          onClick={LoadOutputHandler}>Load file</Button>

<Button variant="contained" 
          onClick={() => setSavedFilesPrompt(false)}>Close</Button>
        </DialogActions>
      </Dialog>



{/* {        <div className={classes.addgraph}><div
          onClick={() => {
            let temp = numberofPlots.slice(0);
            temp.push(temp[temp.length - 1] + 1);
            setNumberOfPlots(temp)

          }
          }
        >Add graph</div></div>} */}
      


      <div className={classes.plotdata}>
      <Plot
        data={plotData}
        layout={{ /* width: width, */ height: 600, 
        title: 'Resuls',
        xaxis:{title: xLegend},
        yaxis:{title: yLegend}
      }}
        config={{ scrollZoom: true, editable: true }} />
        </div>
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
              setPlotData(temp);   
              setYLegend(e.target.value)         
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
              setPlotData(temp);
              setXLegend(e.target.value)
            }
            }
            >
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

</div>
    </>}

  </div>
}

export default FastPlot