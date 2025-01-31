import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useThree } from "@react-three/fiber"
import * as THREE from 'three'


export default function Airplane() {

  const ref = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  useEffect(() => {

    function handleMouseMove(event: MouseEvent) {
      if (!ref.current) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(ref.current.position, {
        x: x * viewport.width * 0.5,
        y: y * viewport.height * 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [viewport]);
  
  return (
    <mesh ref={ref} position={[0, 0, 1]}>
      <coneGeometry args={[0.2, 0.5, 3]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  )
}