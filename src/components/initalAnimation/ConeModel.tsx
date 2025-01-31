import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type directions = {
  yDirection: number
  xDirection: number
}

export function ConeModel({xDirection, yDirection}: directions) {
  const meshRef = useRef(null)
  
  useGSAP(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: - Math.PI * (0.1 + 0.4 * (Math.tanh(yDirection / 25) + 1)),
        y: Math.PI * (0.8 + ((xDirection + 100) * 0.4 / 200)),
        duration: 0.3,
        ease: ""
      })
    }

    }, [xDirection, yDirection])

  return (
    <mesh 
      ref={meshRef}
    >
      <coneGeometry args={[0.5, 2, 3]} />
      <meshStandardMaterial color="red" />
    </mesh >
  )
}