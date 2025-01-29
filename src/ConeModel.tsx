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
      //console.log((0.3 + ((yDirection + 200) * 0.4 / 400)))

      gsap.to(meshRef.current.rotation, {
        x: - Math.PI * (0.3 + ((yDirection + 50) * 0.4 / 100)),
        y: Math.PI * (0.8 + ((xDirection + 100) * 0.4 / 200)),
        
        ease: "power2.out"
      })
    }

    // if (yDirection === "up") {
    //   //meshRef.current.rotation.x = - Math.PI * 0.3
    //   gsap.to(meshRef.current.rotation, {
    //     x: - Math.PI * 0.3,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // } else if (yDirection === "down") {
    //   //meshRef.current.rotation.x = - Math.PI * 0.7
    //   gsap.to(meshRef.current.rotation, {
    //     x: - Math.PI * 0.7,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // } else if(yDirection === "ahead"){
    //   //meshRef.current.rotation.x = - Math.PI * 0.5
    //   gsap.to(meshRef.current.rotation, {
    //     x: - Math.PI * 0.5,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // }
    
    // if ( xDirection === "left" ) {
    //   //meshRef.current.rotation.y = Math.PI * 0.8
    //   gsap.to(meshRef.current.rotation, {
    //     y: Math.PI * 0.8,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // } else if (xDirection === "right") {
    //   //meshRef.current.rotation.y = Math.PI * 1.2
    //   gsap.to(meshRef.current.rotation, {
    //     y: Math.PI * 1.2,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // } else if (xDirection === "ahead") {
    //   //meshRef.current.rotation.y = Math.PI * 1
    //   gsap.to(meshRef.current.rotation, {
    //     y: Math.PI * 1,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    // }
    
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