"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

interface AccelerometerData {
  x: number
  y: number
  z: number
}

interface AccelerometerVisualizerProps {
  data?: AccelerometerData
}

function DeviceModel({ data }: { data?: AccelerometerData }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current || !data) return

    // 加速度データに基づいて回転を計算
    // 実際のデバイスの傾きを正確に表現するには、より複雑な計算が必要です
    // これは簡易的な実装です
    const scale = 0.1 // 回転の感度調整
    meshRef.current.rotation.x = -data.y * scale
    meshRef.current.rotation.z = data.x * scale
  })

  return (
    <Box ref={meshRef} args={[1, 0.1, 2]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#1e88e5" />
    </Box>
  )
}

export function AccelerometerVisualizer({ data }: AccelerometerVisualizerProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DeviceModel data={data} />
        <gridHelper args={[10, 10]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
