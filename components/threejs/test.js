import { Canvas, useFrame } from '@react-three/fiber';
import { useRef,useState } from 'react';
import classes from "./test.module.css";
import { PerspectiveCamera, PositionalAudio, OrbitControls } from '@react-three/drei';
import { AxesHelper } from 'three';
import * as THREE from "three";


export default function BoxesPage(props) {
        const layer=props.layer;
        const type=props.type;
        const noScat=props.noScat;
        const layersScaterrers =props.layersScaterrers;
        //const periodicBase=props.periodicBase;
        const a1=props.a1;
        const a2= props.a2
        const numberOfLayers=props.numberOfLayers;
        const dr=props.dr;

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

      
const ShowAllLayers= ()=> {
    let dradded=0;
    let td = [];
    for (let i=0; i<numberOfLayers;i++)
{   dradded=dradded+parseFloat(dr[i]);
    if (layersScaterrers[i] && layersScaterrers[i]!="")

    td.push( <>{kk(i,6,6,dradded)}</>)
}

    
    return <> {td}</>

}

const kk=(lay,N1,N2,dradded)=>
{   let td = [];
   
    for (let i=0; i<noScat[lay];i++)
{   
    if (layersScaterrers[lay][i] && layersScaterrers[lay][i]!="")

   { 
    
    for (let ii=0; ii<2*N1+1;ii++)
{   for (let jj=0; jj<2*N2+1;jj++)
   { let position=layersScaterrers[lay][i]["position"];
    let newPosition =
    [position[0]+(ii-N1)*a1[0]+(jj-N2)*a2[0],
    position[1]+(ii-N1)*a1[1]+(jj-N2)*a2[1],position[2]+dradded]
    let radius=layersScaterrers[lay][i]["rad"];
    td.push(<Sphere radius={radius} position={newPosition} 
    />)



}

}
}


}

    
    return <> {td}</>

}

  return (
    <div className={classes.page}>
  <Canvas camera={{fov:"40"}}>
<OrbitControls/>
    <ambientLight />
    <primitive object={new THREE.AxesHelper(10)} />
    <pointLight position={[15, 32, 16]}  />
   {ShowAllLayers()}
 {/*    <Sphere radius={layersScaterrers[0][0]["rad"]} position={layersScaterrers[0][0]["position"]} />
    <Sphere radius={0.4} position={[1, 0, 0]} /> */}
    
  </Canvas>
    </div>
  )
}
