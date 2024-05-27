import React from 'react';
import dynamic from 'next/dynamic';
import { useState,useEffect } from 'react';
import Axios from "axios";


    
        
export default function PlanePlot() {


    const Plot = dynamic(import('react-plotly.js'), {
        ssr: false
      })

            // Define grid
            const [x, setX] = useState([]);
            const [y, setY] = useState([]);
            const [z, setZ] = useState([]);
            const [boundaries,setBoundaries]=useState([1,1,1]);
            const [colors,setColors]=useState([]);
            const [fortranData,setFortranData]=useState();
            const [plane,setPlane]=useState(2);
            const [fieldToDisplay,setFieldToDisplay]=useState("normE");
            const [planePos,setPlanePos]=useState(0);        
      useEffect(() => {
    
        const getThisOutputs = async () => {
          const scs = await Axios.get('http://localhost:3001/loadfield/fieldplot.dat');
    
    
     data = scs.data;
    setFortranData(data);
   
    
        };
    
    
    
    
        getThisOutputs();
    
    
    
    
      }, [])
    
    
      useEffect(()=>{
        let allPointsFiltered;
        if (fortranData)
      {  const length = Math.pow(fortranData.x.length,1/3).toFixed(0);
    

        if (fortranData.Rsph)
        {setBoundaries([2*fortranData.Rsph[0],2*fortranData.Rsph[0],2*fortranData.Rsph[0]])}
    
    
        else if (fortranData.Rcyl)
        {setBoundaries([2*fortranData.Rcyl[0],2*fortranData.Rcyl[0],2*fortranData.Hcyl[0]])}
    
        else if (fortranData.Ra)
        {setBoundaries([2*fortranData.Ra[0],2*fortranData.Ra[0],2*fortranData.Rb[0]])}
     
        let allData=[];
    
        for (let i=0; i<fortranData.x.length; i++) {
            
            if (fortranData.x[i]!=0 || fortranData.y[i]!=0 )

          allData.push([fortranData.x[i],fortranData.y[i],fortranData.z[i],fortranData[fieldToDisplay][i]])

          else allData.push([fortranData.x[i],fortranData.y[i],fortranData.z[i],fortranData[fieldToDisplay][i+1]/2+fortranData[fieldToDisplay][i-1]/2])

        }
    



        if (plane==0) {
            /* analoga ti 8eleis na kaneis filter to allazeis */
            const differentValues = fortranData.x.slice(0,length);
            allPointsFiltered= allData.filter((word) => parseFloat(word[plane]) == parseFloat(planePos));
        
          
            
        allPointsFiltered.sort((a,b)=>{
            const ya=a[1]
            const yb=b[1]
            return ya-yb
        })
          
            setY(differentValues)
        
            /* Opoio 8es na krathseis sta8ero toy kaneis to parakatw alliws to 8eteis differentValues */
            let test=[]
            for (let i=0;i<length;i++)
            {test.push(planePos)}
            setX(test);
        
        }


        else if (plane==1) {
        /* analoga ti 8eleis na kaneis filter to allazeis */
        allPointsFiltered= allData.filter((word) => parseFloat(word[plane]) == parseFloat(planePos));
    
        const differentValues = fortranData.x.slice(0,length);
        
    
        setX(differentValues);
    
        /* Opoio 8es na krathseis sta8ero toy kaneis to parakatw alliws to 8eteis differentValues */
        let test=[]
        for (let i=0;i<length;i++)
        {test.push(planePos)}
        setY(test);
    
    }
    

    else if (plane==2) {
        /* analoga ti 8eleis na kaneis filter to allazeis */
        allPointsFiltered= allData.filter((word) => parseFloat(word[plane]) == parseFloat(planePos));
    
        const differentValues = fortranData.x.slice(0,length);
        
    
        setX(differentValues);
        setY(differentValues);

    
    }
      
    
        let z=[];
        let colors1=[];
                let tempz=[];
            let tempcolors=[];
        for (let i=0;i<length;i++) {
            tempz=[];
            tempcolors=[]
                
            for (let j=0;j<length;j++) {
            
    
    
            tempz.push(allPointsFiltered[(i)*length+j][2])
            tempcolors.push(allPointsFiltered[(i)*length+j][3])
        }
    
            z.push(tempz);
            colors1.push(tempcolors);
    
        }

        setColors(colors1);
        setZ(z)}
      },[fortranData,plane,planePos])


            // Define data
            const data = [{
                type: 'surface',
                x: x,
                y: y,
                z: z,
                surfacecolor: colors,
                colorscale: 'Viridis', // Use the Viridis colorscale
                showscale: true,
            
            }];
        
            // Define layout
            const layout = {
                title: 'Field Plot',
                scene: {

                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    zaxis: { title: 'Z' },
                    aspectmode: "manual",
    //   aspectratio: {
    //     x: 1, y: 1, z: 1,
    //    },
    xaxis: {
    
     range: [-boundaries[0], boundaries[0]],
   },
    yaxis: {
    
     range: [-boundaries[1], boundaries[1]],
   },
    zaxis: {
   
    range: [-boundaries[2], boundaries[2]],
   }
                }
            };
        
            return (<div className='bg-white'>
                <Plot
                    data={data}
                    layout={layout}
                />
                <div className='text-black p-2'>Select plane to display:
                    <select
                    onChange={(e)=>{setPlanePos(0) ; setPlane(e.target.value)}}
                    >
                        <option value={2}>xy</option>
                        <option value={1}>xz</option>
                        <option value={0}>yz</option>
                    </select>
{/* 
                    {-boundaries[plane]}<input type="range" min={-boundaries[plane]} max={boundaries[plane]} step={2*boundaries[plane]/(x.length-1)} defaultValue={0}
onChange={(e)=>setPlanePos(e.target.value)}
/>{boundaries[plane]} */}
                </div>
                </div>
            );
        };
        
      

