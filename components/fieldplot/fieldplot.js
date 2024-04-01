import React from 'react';
import dynamic from 'next/dynamic';
import { useState,useEffect } from 'react';
import Axios from "axios";

const CombinedPlanesPlot = () => {

  const [xPosition,setXPosition]= useState(0);
  const [yPosition,setYPosition]= useState(0);
  const [zPosition,setZPosition]= useState(0);
  const [allData,setAllData] = useState([]);
  const [plane,setPlane]=useState([false,false,true]);



  useEffect(() => {

    const getThisOutputs = async () => {
      const scs = await Axios.get('http://localhost:3001/loadfield/fieldplot.dat');


const data = scs.data;

    let allData=[];

    for (let i=0; i<data.x.length; i++) {
      allData.push([data.x[i],data.y[i],data.z[i],data.normE[i]])
    }

setAllData(allData);


    };




    getThisOutputs();




  }, [])


  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })



  
const allPpoints = allData;


let allPointsXYFiltered=[];
if (plane[2]==true) {
allPointsXYFiltered= allPpoints.filter((word) => parseFloat(word[2]) == parseFloat(zPosition));
}

let allPointsXZFiltered=[];
if (plane[1]==true) {
  allPointsXZFiltered= allPpoints.filter((word) => parseFloat(word[1]) == parseFloat(yPosition));
}

let allPointsYZFiltered=[];
if (plane[0]==true) {
  allPointsYZFiltered= allPpoints.filter((word) => parseFloat(word[0]) == parseFloat(xPosition));
}


const allPointsFiltered = allPointsXYFiltered.concat(allPointsXZFiltered).concat(allPointsYZFiltered);






  return <><Plot data=
  {[{
    x: allPointsFiltered.map(point => point[0]),
    y: allPointsFiltered.map(point => point[1]),
    z: allPointsFiltered.map(point => point[2]),
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 4,
      color: allPointsFiltered.map(point => point[3]),
      colorscale: 'Viridis',
      opacity: 0.7,
      colorbar: {
        title: 'f(x, y, z)'
      }
    }
  }]}  
  layout={{ 
    title: 'Combined Planes',
  
    scene:{
      aspectmode: "manual",
      aspectratio: {
        x: 1, y: 1, z: 1,
       },
    xaxis: {
    
     range: [-1, 1],
   },
    yaxis: {
    
     range: [-1, 1],
   },
    zaxis: {
   
    range: [-1, 1],
   }},
    
    }} />

<div>
<input 
onChange={(e)=> {
  if (e.target.checked)
{setPlane([true,plane[1],plane[2]])}
else {setPlane([false,plane[1],plane[2]])}
}}
type="checkbox" id="yz plane" name="yz plane"/>
<label for="yz plane"> YZ plane</label>
<input type="range" min="-1" max="1" step="0.2" defaultValue={xPosition}
onChange={(e)=>setXPosition(e.target.value)}
/>


<br/>

<input 
onChange={(e)=> {
  if (e.target.checked)
{setPlane([plane[0],true,plane[2]])}
else {setPlane([plane[0],false,plane[2]])}
}}
type="checkbox" id="xz plane" name="xz plane"/>
<label for="xz plane"> XZ plane</label>


<input type="range" min="-1" max="1" step="0.2"  defaultValue={yPosition}
onChange={(e)=>setYPosition(e.target.value)}
/>

<br/>

<input 
defaultChecked= {plane[2]}
onChange={(e)=> {
  if (e.target.checked)
{setPlane([plane[0],plane[1],true])}
else {setPlane([plane[0],plane[1],false])}
}}
type="checkbox" id="xy plane" name="xy plane"/>
<label for="xy plane"> XY plane</label>
<input type="range" min="-1" max="1" step="0.2" defaultValue={zPosition}
onChange={(e)=>setZPosition(e.target.value)}
/>
</div>

  </>
  
  ;
};

export default CombinedPlanesPlot;
