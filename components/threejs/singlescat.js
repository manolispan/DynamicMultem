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
        return (
          <mesh
            {...props}
            ref={ref}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry args={[props.radius, 20, 20]} />
            <meshStandardMaterial color="orange" />
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
            <cylinderGeometry args={[props.radius, props.radius, props.height,32]} />
            <meshStandardMaterial color="orange" />
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
  <Canvas>
<OrbitControls/>
    <ambientLight />
    <primitive object={new THREE.AxesHelper(50)} />
    <primitive object={new THREE.Vector3(0, 10, 3)} />
 
    <pointLight position={[3, 3, 1]}  />
{/*     <mesh
    position={[0,0,2]}
    >
            <planeBufferGeometry attach="geometry" args={[15, 15]} />
            <meshPhongMaterial attach="material" color="green" />
         </mesh> */}
  {/*  <Polyhedron /> */}
    {type=="sphere" && 
    <Sphere radius={scatterer.radius[0]} position={0} />}

    {type=="cylinder"&&
    <Cylinder radius={scatterer.radius[0]}
    height = {scatterer.height[0]}
    position={0}/>
    }

    
  </Canvas>
    </div>
  )
}
