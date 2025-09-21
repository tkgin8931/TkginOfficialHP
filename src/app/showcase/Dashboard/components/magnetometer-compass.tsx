"use client"

import { useEffect, useRef } from "react"
import { Compass } from "lucide-react"

interface MagnetometerData {
  x: number
  y: number
  z: number
}

interface MagnetometerCompassProps {
  data?: MagnetometerData
}

export function MagnetometerCompass({ data }: MagnetometerCompassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスのサイズを設定
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 20

    // キャンバスをクリア
    ctx.clearRect(0, 0, width, height)

    // コンパスの背景を描画
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#f5f5f5"
    ctx.fill()
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 2
    ctx.stroke()

    // 方位を描画
    const directions = ["N", "E", "S", "W"]
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#333"

    directions.forEach((dir, i) => {
      const angle = (i * Math.PI) / 2
      const x = centerX + Math.sin(angle) * (radius - 30)
      const y = centerY - Math.cos(angle) * (radius - 30)
      ctx.fillText(dir, x, y)
    })

    // 目盛りを描画
    ctx.beginPath()
    for (let i = 0; i < 360; i += 15) {
      const angle = (i * Math.PI) / 180
      const length = i % 90 === 0 ? 15 : i % 45 === 0 ? 10 : 5

      const startX = centerX + Math.sin(angle) * (radius - length)
      const startY = centerY - Math.cos(angle) * (radius - length)
      const endX = centerX + Math.sin(angle) * radius
      const endY = centerY - Math.cos(angle) * radius

      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
    }
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1
    ctx.stroke()

    // 磁場データから方位角を計算
    // 実際の実装では、より正確な計算が必要です
    const heading = Math.atan2(data.y, data.x) * (180 / Math.PI)
    const headingDeg = (heading + 360) % 360

    // 針を描画
    const needleAngle = (headingDeg * Math.PI) / 180

    // 北向きの針（赤）
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + Math.sin(needleAngle) * (radius - 40), centerY - Math.cos(needleAngle) * (radius - 40))
    ctx.strokeStyle = "#e53935"
    ctx.lineWidth = 3
    ctx.stroke()

    // 南向きの針（青）
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(
      centerX + Math.sin(needleAngle + Math.PI) * (radius - 40),
      centerY - Math.cos(needleAngle + Math.PI) * (radius - 40),
    )
    ctx.strokeStyle = "#1e88e5"
    ctx.lineWidth = 3
    ctx.stroke()

    // 中心点
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
    ctx.fillStyle = "#333"
    ctx.fill()

    // 方位角を表示
    ctx.font = "bold 24px sans-serif"
    ctx.textAlign = "center"
    ctx.fillStyle = "#333"
    ctx.fillText(`${Math.round(headingDeg)}°`, centerX, centerY + radius + 30)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {data ? (
        <canvas ref={canvasRef} width={300} height={300} className="max-w-full max-h-full" />
      ) : (
        <div className="flex flex-col items-center text-muted-foreground">
          <Compass className="h-12 w-12 mb-2" />
          <p>データ待機中...</p>
        </div>
      )}
    </div>
  )
}
