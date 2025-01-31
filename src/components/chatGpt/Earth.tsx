import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'


export default function Earth() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.01
  })
  
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[2, 2, 0.5, 32]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
};