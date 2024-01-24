import { Canvas, useFrame } from '@react-three/fiber';
import { useRef,useState,useMemo } from 'react';
import classes from "./test.module.css";
import { PerspectiveCamera, PositionalAudio, OrbitControls, Tube } from '@react-three/drei';
import { AxesHelper,Vector3, BufferGeometry, DoubleSide } from 'three';
import * as THREE from "three";


export default function BoxesPage(props) {
    const type = props.type;
    const scatterer = props.scatterer;

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

  return (
    <div className={classes.page}>
  <Canvas camera={{fov:"40"}}>
<OrbitControls/>
    <ambientLight
    color="white"
    intensity={0.2}/>
    <primitive object={new THREE.AxesHelper(50)} />
    
 
    <pointLight position={[0, 10, 20]}  />

 
    {type=="SPHERE" && 
    <Sphere radius={scatterer.radius[0]} position={0} 
    ellipseratio={1}
    />

    }

    {type=="CYLINDER" &&
    <Cylinder radius={scatterer.radius[0]}
    height = {scatterer.height[0]}
    position={0}/>
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

{type=="ELIPSE" &&
<Sphere radius={scatterer.radius1[0]} position={0}
ellipseratio={scatterer.radius2[0]/scatterer.radius1[0]}
/>}
    
    
  </Canvas>
    </div>
  )
}