import { useEffect, useRef } from "react"

type directions = {
  yDirection: "up" | "down" | "ahead"
  xDirection: "left" | "right" | "ahead"
}

export function ConeModel({xDirection, yDirection}: directions) {
  const meshRef = useRef(null)
  
  useEffect(() => {

    if (yDirection === "up") {
      meshRef.current.rotation.x = - Math.PI * 0.3
    } else if (yDirection === "down") {
      meshRef.current.rotation.x = - Math.PI * 0.7
    } else if(yDirection === "ahead"){
      meshRef.current.rotation.x = - Math.PI * 0.5
    }
    
    if ( xDirection === "left" ) {
      meshRef.current.rotation.y = Math.PI * 0.8
    } else if (xDirection === "right") {
      meshRef.current.rotation.y = Math.PI * 1.2
    } else if (xDirection === "ahead") {
      meshRef.current.rotation.y = Math.PI * 1
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