import { Canvas} from '@react-three/fiber';
import { useRef,useState } from 'react';
import classes from "./test.module.css";
import { /* PerspectiveCamera, Tube, PositionalAudio, */ OrbitControls } from '@react-three/drei';
/* import { AxesHelper,Vector3, BufferGeometry, DoubleSide } from 'three'; */
import * as THREE from "three";


export default function BoxesPage(props) {
    const type = props.type;
    const scatterer = props.scatterer;
    const lightValues = props.lightValues;



    function Sphere(props) {

        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef()
        // Hold state for hovered and clicked events
        const [hovered, hover] = useState(false)
        const [clicked, click] = useState(false)
        // Subscribe this component to the render-loop, rotate the mesh every frame
       // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
        // Return the view, these are regular Threejs elements expressed in JSX
        const origin = new THREE.Vector3( 0, 4, 0 );
        const dir  = new THREE.Vector3( 1, -1, 0);
        dir.normalize();
        const length = 2;
        const hex = 0xffff00;
        return (
          <mesh
            {...props}
            ref={ref}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            scale={[1,props.ellipseratio,1]}
            >
            <sphereGeometry args={[props.radius[0]/props.radius[0], 20, 20]} 
            />
            <meshStandardMaterial color="rgb(100, 150, 100)" 
            transparent={true} side={THREE.DoubleSide} />
            
            {/* <arrowHelper args={[dir,origin,length]} /> */}

          </mesh>
        )
      }

      function SphereEl(props) {
        const radius= props.radius;
      
        const opacity = props.opacity;
        const anglecut = props.anglecut;
        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef()
        // Hold state for hovered and clicked events
        const [hovered, hover] = useState(false)
        const [clicked, click] = useState(false)
        // Subscribe this component to the render-loop, rotate the mesh every frame
       // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
        // Return the view, these are regular Threejs elements expressed in JSX
        let eps = props.color;
        if (eps > 14) {eps=14}
        else if (eps<1) {eps=1}
        
        let hslratio = parseFloat(eps/14);
        hslratio = parseFloat(hslratio*360)

        
        return (
          <mesh
            {...props}
            ref={ref}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            scale={[1,props.ellipseratio,1]}
            >
            <sphereGeometry args={[radius, 20, 20,0,anglecut]} 
            />
            <meshStandardMaterial color={`hsl(${hslratio}, 80%, 40%)` }
            transparent={true} side={THREE.DoubleSide} opacity={opacity}/>
          </mesh>
        )
      }


      function Cylinder(props) {

        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef()
        // Hold state for hovered and clicked events
        const [hovered, hover] = useState(false)
        const [clicked, click] = useState(false)
        // Subscribe this component to the render-loop, rotate the mesh every frame
       // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
        // Return the view, these are regular Threejs elements expressed in JSX
        return (
          <mesh
            {...props}
            ref={ref}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <cylinderGeometry args={[props.radius[0]/props.radius[0], props.radius[0]/props.radius[0], props.height[0]/props.radius[0],32]} />
            <meshStandardMaterial color="rgb(100, 150, 100)" 
            transparent={true} side={THREE.DoubleSide}/>
          </mesh>
        )
      }  


/*       function Polyhedron() {
        const geometry = useMemo(() => {
          let g = new BufferGeometry()
          const points = [
            new Vector3(-1, 1, -1), //c
            new Vector3(-1, 2, 1), //b
            new Vector3(1, 2, 1), //a
      
          ]
          g.setFromPoints(points)
          g.computeVertexNormals()
          return g
        }, [])
      

      
        return (
          <mesh geometry={geometry}>
            <meshNormalMaterial side={DoubleSide} />
          </mesh>
        )
      } */


      function Arrow(props) {
        // Original direction vector
        const originalDirection = new THREE.Vector3(0, -1, 0);
      
        // Calculate rotated direction vector for y-axis rotation
        const rotationAngleY = THREE.MathUtils.degToRad(lightValues.thetaIn[0]); // Convert rotation angle to radians
        const rotatedDirectionY = originalDirection.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationAngleY);
      
        // Calculate rotated direction vector for x-axis rotation
        const rotationAngleX = THREE.MathUtils.degToRad(lightValues.phiIn[0]); // Convert rotation angle to radians
        const rotatedDirection = rotatedDirectionY.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationAngleX);
      
     
        return (<>
          <arrowHelper
            args={[
              rotatedDirection, // Rotated direction vector
              new THREE.Vector3(props.x, props.y, props.z), // Origin at the midpoint
              props.length, // Length of the arrow shaft
              0xff2500, // Shaft color
              0.3, // Head length
              0.3, // Head width
            ]}
          />

  

          </>
        );
      }

      function ArrowPol(props) {
        // Original direction vector
        const originalDirection = new THREE.Vector3(0, 0, -1);
      
        // Calculate rotated direction vector for y-axis rotation
        const rotationAngleY = THREE.MathUtils.degToRad(lightValues.thetaIn[0]); // Convert rotation angle to radians
        const rotatedDirectionY = originalDirection.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationAngleY);
      
        // Calculate rotated direction vector for x-axis rotation
        const rotationAngleX = THREE.MathUtils.degToRad(lightValues.phiIn[0]); // Convert rotation angle to radians
        const rotatedDirection = rotatedDirectionY.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationAngleX);
      
     
        return (<>
          <arrowHelper
            args={[
              rotatedDirection, // Rotated direction vector
              new THREE.Vector3(props.x, props.y, props.z), // Origin at the midpoint
              props.length, // Length of the arrow shaft
              0xE49B0F, // Shaft color
              0.2, // Head length
              0.2, // Head width
            ]}
          />

  

          </>
        );
      }
      function ArrowPol2(props) {
        // Original direction vector
        const originalDirection = new THREE.Vector3(0, 0, 1);
      
        // Calculate rotated direction vector for y-axis rotation
        const rotationAngleY = THREE.MathUtils.degToRad(lightValues.thetaIn[0]); // Convert rotation angle to radians
        const rotatedDirectionY = originalDirection.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationAngleY);
      
        // Calculate rotated direction vector for x-axis rotation
        const rotationAngleX = THREE.MathUtils.degToRad(lightValues.phiIn[0]); // Convert rotation angle to radians
        const rotatedDirection = rotatedDirectionY.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationAngleX);
      
     
        return (<>
          <arrowHelper
            args={[
              rotatedDirection, // Rotated direction vector
              new THREE.Vector3(props.x, props.y, props.z), // Origin at the midpoint
              props.length, // Length of the arrow shaft
              0xE49B0F, // Shaft color
              0.2, // Head length
              0.2, // Head width
            ]}
          />

  

          </>
        );
      }

      function ArrowPPol(props) {
        // Original direction vector
        const originalDirection = new THREE.Vector3(1, 0, 0);
        // Calculate rotated direction vector for y-axis rotation
        const rotationAngleY = THREE.MathUtils.degToRad(lightValues.thetaIn[0]); // Convert rotation angle to radians
        const rotatedDirectionY = originalDirection.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationAngleY);
      
        // Calculate rotated direction vector for x-axis rotation
        const rotationAngleX = THREE.MathUtils.degToRad(lightValues.phiIn[0]); // Convert rotation angle to radians
        const rotatedDirection = rotatedDirectionY.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationAngleX);
      
     
        return (<>
          <arrowHelper
            args={[
              rotatedDirection, // Rotated direction vector
              new THREE.Vector3(props.x, props.y, props.z), // Origin at the midpoint
              props.length, // Length of the arrow shaft
              0xE49B0F, // Shaft color
              0.2, // Head length
              0.2, // Head width
            ]}
          />

  

          </>
        );
      }
      function ArrowPPol2(props) {
        // Original direction vector
        const originalDirection = new THREE.Vector3(-1, 0, 0);

                // Calculate rotated direction vector for y-axis rotation
                const rotationAngleY = THREE.MathUtils.degToRad(lightValues.thetaIn[0]); // Convert rotation angle to radians
                const rotatedDirectionY = originalDirection.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), rotationAngleY);
              
                // Calculate rotated direction vector for x-axis rotation
                const rotationAngleX = THREE.MathUtils.degToRad(lightValues.phiIn[0]); // Convert rotation angle to radians
                const rotatedDirection = rotatedDirectionY.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationAngleX);
              

        return (<>
          <arrowHelper
            args={[
              rotatedDirection, // Rotated direction vector
              new THREE.Vector3(props.x, props.y, props.z), // Origin at the midpoint
              props.length, // Length of the arrow shaft
              0xE49B0F, // Shaft color
              0.2, // Head length
              0.2, // Head width
            ]}
          />

  

          </>
        );
      }

      function ArrowsCylind () {
        let allSpheres=[];
        const y = 2*scatterer.height[0]/scatterer.radius[0]
        const R=2;
        const length= scatterer.height[0]/scatterer.radius[0]

        for (let i=0;i<1;i++)
          {
            const x= i*2*R/3;
           
            for (let j=-0;j<1;j++)

            { const z=j*2*R/3;
              allSpheres.push(<Arrow
              x={x-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={z+Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length}
              />

              )
            }
          }

          return <>
          {allSpheres}

          {lightValues.polarization=="S" &&
          <>
                 <ArrowPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}


          {lightValues.polarization=="P" &&
          <>
               <ArrowPPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}


          </>

      }



     function ArrowsSphere () {
        let allSpheres=[];
        const y = 3*scatterer.radius[0]/scatterer.radius[0]
        const R=2*scatterer.radius[0]/scatterer.radius[0];
        const length= scatterer.radius[0]/scatterer.radius[0]

        for (let i=0;i<1;i++)
          {
            const x= i*2*R/3;
           
            for (let j=0;j<1;j++)

            { const z=j*2*R/3;
              allSpheres.push(<Arrow
              x={x-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={z+Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length}
              />

              )
            }
          }

          return <>
          {allSpheres}
          {lightValues.polarization=="S" &&
          <>
                 <ArrowPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}


          {lightValues.polarization=="P" &&
          <>
               <ArrowPPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}
          </>

      }


      function ArrowsEl () {
        let allSpheres=[];
        const y = 3*scatterer.radius1[0]/scatterer.radius1[0]
        const R=2*scatterer.radius1[0]/scatterer.radius1[0];
        const length= scatterer.radius1[0]/scatterer.radius1[0]

        for (let i=0;i<1;i++)
          {
            const x= i*2*R/3;
           
            for (let j=0;j<1;j++)

            { const z=j*2*R/3;
              allSpheres.push(<Arrow
              x={x-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={z+Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length}
              />

              )
            }
          }

          return <>
          {allSpheres}
          {lightValues.polarization=="S" &&
          <>
                 <ArrowPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}


          {lightValues.polarization=="P" &&
          <>
               <ArrowPPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}
          </>

      }

      function ArrowsGen (props) {
        let allSpheres=[];
        const y = 3*props.length
        const R=2*props.length;
        const length= props.length;

        for (let i=0;i<1;i++)
          {
            const x= i*2*R/3;
           
            for (let j=0;j<1;j++)

            { const z=j*2*R/3;
              allSpheres.push(<Arrow
              x={x-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={z+Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length}
              />

              )
            }
          }

          return <>
          {allSpheres}
          {lightValues.polarization=="S" &&
          <>
                 <ArrowPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}


          {lightValues.polarization=="P" &&
          <>
               <ArrowPPol
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />
                    <ArrowPPol2
              x={-Math.sin(lightValues.thetaIn[0]*Math.PI/180)*length/2}
              z={Math.sin(lightValues.phiIn[0]*Math.PI/180)*length/2}
              y={y}
              length= {length/2}
              />   
          
          </>}
          </>

      }



  return (
    <div className={classes.page}>
  <Canvas camera={{fov:"40"}}>
<OrbitControls/>
    <ambientLight
    color="white"
    intensity={0.2}/>
    <primitive object={new THREE.AxesHelper(50)} />
    
 
    <pointLight position={[0, 10, 20]}  />

 
{/*      <Arrow
     x={0}
     y={0}
     z={0}
      />  */}



    {(type=="SPHERE" || type=="GYROELECTRICSPHERE" || type=="GYROMAGNETICSPHERE") &&  <>
    <Sphere radius={scatterer.radius[0]} position={0} 
    ellipseratio={1}
    />
    <ArrowsSphere/></>
    }

    {type=="CYLINDER" && <>
    <Cylinder radius={scatterer.radius[0]}
    height = {scatterer.height[0]}
    position={0}/>

    <ArrowsCylind/></>
    }


{type=="CORESHELL" && <>
    <SphereEl  
    radius={scatterer.coreRadius[0]/scatterer.coreRadius[0]}
    position={0}
    ellipseratio={1}
    opacity={1}
    anglecut= {5}
    color = {scatterer.epsReal[0]}
    />
     <SphereEl  
    radius={scatterer.radiusShell1[0]/scatterer.coreRadius[0]}
    position={0}
    ellipseratio={1}
    opacity={1}
    anglecut= {5}
    color ={scatterer.epsRealShell1[0]}
    /> 

{scatterer.NumOfShells[0]==1 && 
<ArrowsGen length= {scatterer.radiusShell1[0]/scatterer.coreRadius[0]}/>
} 


{scatterer.NumOfShells[0]==2 && 
<ArrowsGen length= {scatterer.radiusShell2[0]/scatterer.coreRadius[0]}/>
} 

{scatterer.NumOfShells[0]==3 && 
<ArrowsGen length= {scatterer.radiusShell3[0]/scatterer.coreRadius[0]}/>
} 

{scatterer.NumOfShells[0]==4 && 
<ArrowsGen length= {scatterer.radiusShell4[0]/scatterer.coreRadius[0]}/>
} 




{scatterer.NumOfShells[0]>1 &&
     <SphereEl  
     radius={scatterer.radiusShell2[0]/scatterer.coreRadius[0]}
     position={0}
     ellipseratio={1}
     opacity={1}
     anglecut= {5}
     color ={scatterer.epsRealShell2[0]}
     /> 
} 


{scatterer.NumOfShells[0]>2 &&
     <SphereEl  
     radius={scatterer.radiusShell3[0]/scatterer.coreRadius[0]}
     position={0}
     ellipseratio={1}
     opacity={1}
     anglecut= {5}
     color ={scatterer.epsRealShell3[0]}
     /> 
} 


{scatterer.NumOfShells[0]>3 &&
     <SphereEl  
     radius={scatterer.radiusShell4[0]/scatterer.coreRadius[0]}
     position={0}
     ellipseratio={1}
     opacity={1}
     anglecut= {5}
     color ={scatterer.epsRealShell4[0]}
     /> 
} 


    </>
    }

{type=="ELIPSE" && <>
<Sphere radius={scatterer.radius1[0]} position={0}
ellipseratio={scatterer.radius2[0]/scatterer.radius1[0]}
/>
<ArrowsEl/>
</>}
    
    
  </Canvas>
    </div>
  )
}