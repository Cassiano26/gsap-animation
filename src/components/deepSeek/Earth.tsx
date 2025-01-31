import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function Earth() {
  const meshRef = useRef<THREE.Mesh>(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    
    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1 
      pos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: - pos.current.y  * 2 - 5 ,
        duration: 2,
        ease: 'power2.out'
      })
      
      // Continuous rotation
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <mesh receiveShadow ref={meshRef} position={[0, -5, -2]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[4, 4, 50, 200]} />
      <meshStandardMaterial color="gray"  />
    </mesh>
  )
}