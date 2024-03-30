import React from 'react';
import dynamic from 'next/dynamic';
import { useState,useEffect } from 'react';
import Axios from "axios";

const CombinedPlanesPlot = () => {

  const [xPosition,setXPosition]= useState(0);
  const [yPosition,setYPosition]= useState(0);
  const [zPosition,setZPosition]= useState(0);
  const [allData,setAllData] = useState([])
  // Define your function f(x, y, z)
  const f = (x, y, z) => {
    // Example function: f(x, y, z) = sin(x) + cos(y) + z
    return Math.sin(x) + Math.cos(y) -z;
  };

  useEffect(() => {
    let outputs = {};
    let list = {};

    const getThisOutputs = async () => {
      const scs = await Axios.get('http://localhost:3001/loadfield/gpl_one_w0.83_.dat');


const data = scs.data;
/* console.log(data) */
    let allData=[];

    for (let i=0;i<data.length;i++) {
      allData.push([data[i].x,data[i].y,data[i].ReEx,])
    }

setAllData(allData)

    };




    getThisOutputs();




  }, [])


  const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  })

  const generateAllPlaneData = (numPoints) => {
    const planeData = [];
    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        for (let k = 0; k < numPoints; k++) {
        let x, y, z;      
          x = i / numPoints * 10;
          y = j / numPoints * 10;
          z = k / numPoints * 10;    
        planeData.push([x, y, z]); 
      }}
    }

    return planeData
  };

const allPpoints = generateAllPlaneData(50);

const allPointsXYFiltered= allPpoints.filter((word) => word[2] == zPosition);
const allPointsXZFiltered= allPpoints.filter((word) => word[1] == yPosition);
const allPointsYZFiltered= allPpoints.filter((word) => word[0] == xPosition);

const allPointsFiltered = allPointsXYFiltered.concat(allPointsXZFiltered).concat(allPointsYZFiltered);

let allColorsFiltered = [];



for (let i=0; i<allPointsFiltered.length ; i++)
{
  allColorsFiltered.push(f(allPointsFiltered[i][0],allPointsFiltered[i][1],allPointsFiltered[i][2]))
}

const MyLayout =
[{
  x: allPointsFiltered.map(point => point[0]),
  y: allPointsFiltered.map(point => point[1]),
  z: allPointsFiltered.map(point => point[2]),
  mode: 'markers',
  type: 'scatter3d',
  marker: {
    size: 5,
    color: allColorsFiltered,
    colorscale: 'Viridis',
    opacity: 0.8,
    colorbar: {
      title: 'f(x, y, z)'
    }
  }
}]

  // Function to generate data for a plane
  const generatePlaneData = (plane, numPoints, f) => {
    const planeData = [];
    const colors = [];

    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        let x, y, z;

        if (plane === 'xy') {
          x = i / numPoints * 10;
          y = j / numPoints * 10;
          z = 5;
        } else if (plane === 'yz') {
          x = 5;
          y = i / numPoints * 10;
          z = j / numPoints * 10;
        } else if (plane === 'xz') {
          x = i / numPoints * 10;
          y = 5;
          z = j / numPoints * 10;
        }

        const color = f(x, y, z);
        planeData.push([x, y, z]);
        colors.push(color);
      }
    }

    return [{
      x: planeData.map(point => point[0]),
      y: planeData.map(point => point[1]),
      z: planeData.map(point => point[2]),
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 5,
        color: colors,
        colorscale: 'Viridis',
        opacity: 0.8,
        colorbar: {
          title: 'f(x, y, z)'
        }
      }
    }];
  };

    // Generate data for a grid in the XY plane
    const xyData = generatePlaneData('xy', 50, f);

    // Generate data for a grid in the YZ plane
    const yzData = generatePlaneData('yz', 50, f);

    // Generate data for a grid in the XZ plane
    const xzData = generatePlaneData('xz', 50, f);

    // Combine data for all planes
    const combinedData = xyData.concat(yzData).concat(xzData);


  return <><Plot data=
  {[{
    x: allPointsFiltered.map(point => point[0]),
    y: allPointsFiltered.map(point => point[1]),
    z: allPointsFiltered.map(point => point[2]),
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 4,
      color: allColorsFiltered,
      colorscale: 'Viridis',
      opacity: 0.7,
      colorbar: {
        title: 'f(x, y, z)'
      }
    }
  }]}  
  layout={{ title: 'Combined Planes' }} />

<div>
<input type="range" min="0" max="10" defaultValue={xPosition}
onChange={(e)=>setXPosition(e.target.value)}
/>

<input type="range" min="0" max="10" defaultValue={yPosition}
onChange={(e)=>setYPosition(e.target.value)}
/>

<input type="range" min="0" max="10" defaultValue={zPosition}
onChange={(e)=>setZPosition(e.target.value)}
/>
</div>
{/*        <Slider
       value={xPosition}
       onChange={(e)=>setXPosition(e.target.value)}
        aria-label="Temperature"
        defaultValue={xPosition}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={1}
        marks
        min={0}
        max={10}
      /> */}
  </>
  
  ;
};

export default CombinedPlanesPlot;
