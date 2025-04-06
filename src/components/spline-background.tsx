"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import type * as THREE from "three"

function Particles({ count = 200, currentTheme }: { count: number; currentTheme: string | undefined }) {
  const mesh = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array | null>(null)

  useEffect(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    setPositions(positions)
  }, [count])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.0005
      mesh.current.rotation.y += 0.0005
    }
  })

  if (!positions) return null

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={currentTheme === "dark" ? "#14b8a6" : "#0d9488"}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  )
}

export function SplineBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-0 opacity-50"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles count={200} currentTheme={resolvedTheme} />
      </Canvas>
    </motion.div>
  )
}

