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
            const [boundaries,setBoundaries]=useState([]);
            const [colors,setColors]=useState([])
        
      useEffect(() => {
    
        const getThisOutputs = async () => {
          const scs = await Axios.get('http://localhost:3001/loadfield/fieldplot.dat');
    
    
    const data = scs.data;
    const length = Math.pow(data.x.length,1/3).toFixed(0);

    if (data.RSph)
    {setBoundaries[3*data.RSph[0]/2,3*data.RSph[0]/2,3*data.RSph[0]/2]}
 
    let allData=[];

    for (let i=0; i<data.x.length; i++) {
      allData.push([data.x[i],data.y[i],data.z[i],data.ReEx[i]])
    }

    /* analoga ti 8eleis na kaneis filter to allazeis */
    const allPointsFiltered= allData.filter((word) => parseFloat(word[1]) == parseFloat(0));

    const differentValues = data.x.slice(0,length);
    

    setX(differentValues);

    /* Opoio 8es na krathseis sta8ero toy kaneis to parakatw alliws to 8eteis differentValues */
    let test=[]
    for (let i=0;i<length;i++)
    {test.push(0)}
    setY(test);



  

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
    setZ(z)
    
        };
    
    
    
    
        getThisOutputs();
    
    
    
    
      }, [])
    
    


        
            // Define data
            const data = [{
                type: 'surface',
                x: x,
                y: y,
                z: z,
                surfacecolor: colors,
                colorscale: 'Viridis', // Use the Viridis colorscale
                showscale: false
            }];
        
            // Define layout
            const layout = {
                title: 'Plane at z=0',
                scene: {
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    zaxis: { title: 'Z' },
                    aspectmode: "manual",
      aspectratio: {
        x: 1, y: 1, z: 1,
       },
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
        
            return (
                <Plot
                    data={data}
                    layout={layout}
                />
            );
        };
        
      
    
    

    
/*     const PlanePlot = () => {
        // Define grid
        const [x, setX] = useState([]);
        const [y, setY] = useState([]);
        const [z, setZ] = useState([]);
    
        useEffect(() => {
            const generateGrid = () => {
        setX([-1,0,1])
        setY([-1,0,1])
         setZ([
            [
                1,
                1,
                1
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ])   
            
            };
    
            generateGrid();
        }, []);
    
        // Define the function to determine the color based on x and y
        const getColor = (x, y) => {
            // Example function: z = sin(x) + cos(y)
            return Math.sin(x) + Math.cos(y);
        };
    
        // Define colors based on the function value at each (x, y) point
        // const colors = x.map((_, i) => {
        //     return y.map((_, j) => {
        //         const value = getColor(x[i], y[j]);
        //         return value; // Use the function value directly
        //     });
        // });

        const colors= [
            
               
            [
                1,
                1,
                1
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ]
    
        // Define data
        const data = [{
            type: 'surface',
            x: x,
            y: y,
            z: z,
            surfacecolor: colors,
            colorscale: 'Viridis', // Use the Viridis colorscale
            showscale: false
        }];
    
        // Define layout
        const layout = {
            title: 'Plane at z=0',
            scene: {
                xaxis: { title: 'X' },
                yaxis: { title: 'Y' },
                zaxis: { title: 'Z' }
            }
        };
    
        return (
            <Plot
                data={data}
                layout={layout}
            />
        );
    };  export default PlanePlot;
*/
    
   
