import { useState, useEffect, useContext, useRef } from "react";
import dynamic from 'next/dynamic';
import Axios from "axios";
import classes from "./plot.module.css";
import ConfirmPrompt from "../components/ui/confirmprompt/confirmprompt"

function Plots(props) {
  const [savePrompt, setSavePrompt] = useState(false);

  const [width, setWidth] = useState(800);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [loadedResultFilesList,setLoadedResultFilesList]= useState([])
  const [loadedResults,setLoadedResults]=useState({});

  const [savedResults,setSavedResults] = useState([]);

  const [savedFilesPrompt,setSavedFilesPrompt] =useState(false);

  const [chosenOutput,setChosenOutput] = useState("");
  const outputTypeRef= useRef();

  const [graphColor,setGraphColor]=useState("blue");
  const AllColors =["blue","black","red","yellow"];

  const [plotData,setPlotData] =useState([]);

  const [numberofPlots,setNumberOfPlots]=useState([0,1,2])

  let idextra= "";
  if (props.idextra) {idextra=pros.idextra};
 

  useEffect(() => {
    let outputs = {};
    let list = {};

    const getThisOutputs = async () => {
      const staticOut = await Axios.get('http://localhost:3001/thisrun/staticScat');
      const staticnOut = await Axios.get('http://localhost:3001/thisrun/staticScatn');
      const dynOut = await Axios.get('http://localhost:3001/thisrun/dynScat');
      const dynnOut = await Axios.get('http://localhost:3001/thisrun/dynScatn');
      const adiabOut = await Axios.get('http://localhost:3001/thisrun/adiabScat');
      const adiabnOut = await Axios.get('http://localhost:3001/thisrun/adiabScatn');


      outputs = {
        staticScat : staticOut.data ,
        staticScatn : staticnOut.data,
        dynScat : dynOut.data,
        dynScatn : dynnOut.data,
        adiabScat : adiabOut.data,
        adiabScatn : adiabnOut.data
      }

      /* let tempdata=data.slice(0);
      tempdata[0]={};
      tempdata[0]=staticOut.data
      setData(tempdata);
      setXAxis(staticOut.data.freq);
      setYAxis(staticOut.data.trans); */

      setLoadedResultFilesList(["staticScat","dynScat","adiabScat","staticScatn","dynScatn","adiabScatn"])
      setLoadedResults(outputs);

     
    };

    const getListSavedOutputs = async () => {
      const staticout = await Axios.get('http://localhost:3001/loadoutputlist/static');
      const dynout = await Axios.get('http://localhost:3001/loadoutputlist/dyn');
      const adiabout = await Axios.get('http://localhost:3001/loadoutputlist/adiab');

      list ={
        static : staticout.data,
        dyn : dynout.data ,
        adiab : adiabout.data
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
    const input ={
      inputfile : document.getElementById("inputfile").checked,
      static : document.getElementById("static").checked,
      dynamic : document.getElementById("dynamic").checked,
      adiabatic : document.getElementById("adiabatic").checked,
      name : document.getElementById("filename").value
    }
    if (document.getElementById("inputfile").checked || 
    document.getElementById("static").checked ||
    document.getElementById("dynamic").checked ||
    document.getElementById("adiabatic").checked
    )
    {

      const result = await Axios.post(
        'http://localhost:3001/savefiles',
        input
      )

    }





  }


  async function LoadOutputHandler () {
  
    if (chosenOutput=="") {alert("Chose an Output!")}
    else 
  { const result = await Axios.get(`http://localhost:3001/loadoutput/${outputTypeRef.current}/${chosenOutput}`);
    let previouslist = loadedResultFilesList;
    previouslist.push(chosenOutput);
    let previousresults = loadedResults;
    previousresults[chosenOutput]= result.data;
    
}
    
  }
  


  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })

  return <div> {loading ? <>PLEASE WAIT</> :
    <>
      {savePrompt &&
        <ConfirmPrompt
          text={
            <div>
              Τι θελετε να αποθηκεύσετε;
              <div>
                <label for="inputfile">Inputfile</label>
                <input type="checkbox" id="inputfile"   />
                </div>

                <div>
                  <label for="static">Static Results</label>
                <input type="checkbox" id="static" /></div>
                
              <div>
                  <label for="dynamic">Dynamic Results</label>
                <input type="checkbox" id="dynamic" />
              </div>


              
<div>
   <label for="adiabatic">Adiabatic Results</label>
                <input type="checkbox" id="adiabatic" />
</div>
               
<div>
                Ονομασία Αρχείων :  <input type="text" id="filename" />
              </div>
           

            </div>}
          cancel = {()=> setSavePrompt(false)}
          ok = {SaveFilesHandler}
        />
      }
  
<div className={classes.alldata}>

  {
    numberofPlots.map((number)=>
    <div>
<div className={classes.savedfiles}> 

  <div>File
    <select onChange={(e) => { 
            let tempdata=data.slice(0);
            if (typeof tempdata[number] != 'object' ) {tempdata[number]={}};
            tempdata[number]=loadedResults[e.target.value]
            setData(tempdata);
            document.getElementById("xaxis"+number+idextra).selectedIndex = 0;
            document.getElementById("yaxis"+number+idextra).selectedIndex = 0;

      }
        }>
          <option disabled selected>Select File</option>
          {loadedResultFilesList.map((keyName, i) => (
            <option key={i+"tt"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select></div>

<div style={{position: "relative"}}><button onClick={()=>setSavedFilesPrompt(true)}>Saved Files</button>

{savedFilesPrompt &&
      <ConfirmPrompt
      text = {<div>
      <h4>Which file to load?</h4>
      <div>Static</div>
      <div className={classes.inputlist}>
        {savedResults.static.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
        outputTypeRef.current="savedstatic"
       
      }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Dynamic</div>
      <div className={classes.inputlist}>
        {savedResults.dyn.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="saveddyn"
        
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Adiabatic</div>
      <div className={classes.inputlist}>
        {savedResults.adiab.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="savedadiab"
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>
      </div>
        }
        cancel ={()=>setSavedFilesPrompt(false)}
        notext = "Cancel"
        yestext ="Ok"
        ok = {LoadOutputHandler}
      />
      }
</div>

</div>

<div className={classes.settings}>
        <div> Y AXIS
        <select 
        id = {"yaxis"+number+idextra}
        onChange={(e) => { 
          let temp = plotData.slice(0);
          if (typeof temp[number] != 'object' ) {temp[number]={}};
          temp[number].y = data[number][e.target.value]
          setPlotData(temp) }
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
        id = {"xaxis"+number+idextra}
          onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[number] != 'object' ) {temp[number]={}};
          temp[number].x = data[number][e.target.value]
          temp[number].type= 'scatter'
          temp[number].mode= 'lines'
          setPlotData(temp)
         }
        }> 
        <option disabled selected>Select X</option>
          {data[number] &&  Object.keys(data[number]).map((keyName, i) => (
            <option key={i+"x"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select>

      </div>


      <div> Color
        <select onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[number] != 'object' ) {temp[number]={}};
           if (!temp[number].marker) {temp[number].marker={}}
          temp[number].marker.color = e.target.value
          setPlotData(temp)
         }
        }>
          {AllColors.map((i) => (
            <option key={i+"x"} value={i}>
              {i}
            </option>
          ))}

        </select>

      </div>
</div>

</div>
    )
  }

{/* <div>
<div className={classes.savedfiles}> 

  <div>File
    <select onChange={(e) => { 
            let tempdata=data.slice(0);
            if (typeof tempdata[0] != 'object' ) {tempdata[0]={}};
            tempdata[0]=loadedResults[e.target.value]
            setData(tempdata);
            document.getElementById("xaxis0").selectedIndex = 0;
            document.getElementById("yaxis0").selectedIndex = 0;

      }
        }>
          <option disabled selected>Select File</option>
          {loadedResultFilesList.map((keyName, i) => (
            <option key={i+"tt"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select></div>

<div style={{position: "relative"}}><button onClick={()=>setSavedFilesPrompt(true)}>Saved Files</button>

{savedFilesPrompt &&
      <ConfirmPrompt
      text = {<div>
      <h4>Which file to load?</h4>
      <div>Static</div>
      <div className={classes.inputlist}>
        {savedResults.static.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
        outputTypeRef.current="savedstatic"
       
      }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Dynamic</div>
      <div className={classes.inputlist}>
        {savedResults.dyn.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="saveddyn"
        
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Adiabatic</div>
      <div className={classes.inputlist}>
        {savedResults.adiab.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="savedadiab"
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>
      </div>
        }
        cancel ={()=>setSavedFilesPrompt(false)}
        notext = "Cancel"
        yestext ="Ok"
        ok = {LoadOutputHandler}
      />
      }
</div>

</div>

<div className={classes.settings}>
        <div> Y AXIS
        <select 
        id = "yaxis0"
        onChange={(e) => { 
          let temp = plotData.slice(0);
          if (typeof temp[0] != 'object' ) {temp[0]={}};
          temp[0].y = data[0][e.target.value]
          setPlotData(temp) }
        }>
           <option disabled selected>Select Y</option>
          {data[0] && Object.keys(data[0]).map((keyName, i) => (
            <option key={i} value={keyName}>
              {keyName}
            </option>
          ))}

        </select>

      </div>

      <div> X AXIS
        <select 
        id = "xaxis0"
          onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[0] != 'object' ) {temp[0]={}};
          temp[0].x = data[0][e.target.value]
          temp[0].type= 'scatter'
          temp[0].mode= 'lines'
          setPlotData(temp)
         }
        }> 
        <option disabled selected>Select X</option>
          {data[0] &&  Object.keys(data[0]).map((keyName, i) => (
            <option key={i+"x"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select>

      </div>


      <div> Color
        <select onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[0] != 'object' ) {temp[0]={}};
           if (!temp[0].marker) {temp[0].marker={}}
          temp[0].marker.color = e.target.value
          setPlotData(temp)
         }
        }>
          {AllColors.map((i) => (
            <option key={i+"x"} value={i}>
              {i}
            </option>
          ))}

        </select>

      </div>
</div>

</div>

<div>
<div className={classes.savedfiles}> 

  <div>File
    <select onChange={(e) => { 
                  let tempdata=data.slice(0);
                  if (typeof tempdata[1] != 'object' ) {tempdata[1]={}};
                  tempdata[1]=loadedResults[e.target.value]
                  setData(tempdata)
                  document.getElementById("xaxis1").selectedIndex = 0;
                  document.getElementById("yaxis1").selectedIndex = 0;
                  ;
                  
     }
        }>
           <option disabled selected>Select File</option>
          {loadedResultFilesList.map((keyName, i) => (
            <option key={i+"tt"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select></div>

<div style={{position: "relative"}}><button onClick={()=>setSavedFilesPrompt(true)}>Saved Files</button>

{savedFilesPrompt &&
      <ConfirmPrompt
      text = {<div>
      <h4>Which file to load?</h4>
      <div>Static</div>
      <div className={classes.inputlist}>
        {savedResults.static.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
        outputTypeRef.current="savedstatic"
       
      }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Dynamic</div>
      <div className={classes.inputlist}>
        {savedResults.dyn.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="saveddyn"
        
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>

      <div>Adiabatic</div>
      <div className={classes.inputlist}>
        {savedResults.adiab.map((name)=>
        <div
        key={name}
        id={name}
        onClick={(e)=> {setChosenOutput(e.target.id);
          outputTypeRef.current="savedadiab"
        }}
        className ={chosenOutput==name ? classes.inputlistchosen : null}
        >{name}</div>
        )}
      </div>
      </div>
        }
        cancel ={()=>setSavedFilesPrompt(false)}
        notext = "Cancel"
        yestext ="Ok"
        ok = {LoadOutputHandler}
      />
      }
</div>

</div>

<div className={classes.settings}>
        <div> Y AXIS
        <select 
          id = "yaxis1"
          onChange={(e) => { 
          let temp = plotData.slice(0);
          if (typeof temp[1] != 'object' ) {temp[1]={}};
          temp[1].y = data[1][e.target.value]
          setPlotData(temp) }
        }>
          <option disabled selected>Select Y</option>
          {data[1] &&  Object.keys(data[1]).map((keyName, i) => (
            <option key={i} value={keyName}>
              {keyName}
            </option>
          ))}

        </select>

      </div>

      <div> X AXIS
        <select 
        id = "xaxis1"
        onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[1] != 'object' ) {temp[1]={}};
          temp[1].x = data[1][e.target.value]
          temp[1].type= 'scatter'
          temp[1].mode= 'lines'
          setPlotData(temp)
         }
        }>
          <option disabled selected>Select X</option>
          {data[1] &&  Object.keys(data[1]).map((keyName, i) => (
            <option key={i+"x"} value={keyName}>
              {keyName}
            </option>
          ))}

        </select>

      </div>


      <div> Color
        <select onChange={(e) => { 
           let temp = plotData.slice(0);
           if (typeof temp[1] != 'object' ) {temp[1]={}};
           if (!temp[1].marker) {temp[1].marker={}}
          temp[1].marker.color = e.target.value
          setPlotData(temp)
         }
        }>
          {AllColors.map((i) => (
            <option key={i+"x"} value={i}>
              {i}
            </option>
          ))}

        </select>

      </div>
</div>

</div> */}


<div className={classes.addgraph}><div
onClick={()=>
{let temp=numberofPlots.slice(0);
  temp.push(temp[temp.length-1]+1);
  setNumberOfPlots(temp)

}
}
>Add graph</div></div>
</div>
      <div className={classes.savePrompt}>
        <div onClick={() => setSavePrompt(true)}>Save Input-Results</div>

      </div>

      <Plot
        data = {plotData}
        layout={{ width: width, height: 600, title: 'Best Plots Here' }}
        config={{ scrollZoom: true, editable: true } } />
    </>}


  </div>
}

export default Plots