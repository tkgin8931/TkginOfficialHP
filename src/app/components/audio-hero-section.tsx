"use client"

import { useState } from "react"
import Image from "next/image"
import { AudioEquipmentCard } from "./audio-equipment-card"
import { Button } from "./button"
import { Plus } from "lucide-react"

const audioEquipment = [
  {
    id: "01",
    number: "01",
    title: "Valve  Terminal",
    image: "/valveTerminal2.png",
  },
  {
    id: "02",
    number: "02",
    title: "Terminal  Talk",
    image: "/terminalTalk.png",
  },
  {
    id: "03",
    number: "03",
    title: "michelHP",
    image: "/michelHP.png",
  },
  {
    id: "04",
    number: "04",
    title: "Slack2",
    image: "/PLC.png",
  },
  {
    id: "05",
    number: "05",
    title: "Dash  Board",
    image: "/DashBoard.png",
  },
  {
    id: "06",
    number: "06",
    title: "CREATE  HP",
    image: "/Hero-cansat.png",
  },
]

export function AudioHeroSection() {
  const [selectedCard, setSelectedCard] = useState("03") // Default to card 03 as shown in image

  const handleCardSelect = (id: string) => {
    setSelectedCard(id)
  }

  // 選択中カードの画像パスを取得
  const selectedImage = audioEquipment.find(e => e.id === selectedCard)?.image || "/valveTerminal.png";

  return (
  <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - 中央に小さく表示（選択カードで切り替え） */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src={selectedImage}
          alt="Background"
          width={1200}
          height={800}
          className="object-contain rounded-xl shadow-lg"
        />
      </div>

      {/* Equipment Cards Grid - 左下に小さく絶対配置（画像に重ならないようz-10に変更） */}
  <div className="absolute left-8 bottom-0 z-10 flex gap-2 flex-row flex-wrap pb-4">
        {audioEquipment.map((equipment) => (
          <div className="w-32 h-24" key={equipment.id}>
            <AudioEquipmentCard
              id={equipment.id}
              number={equipment.number}
              title={equipment.title}
              isSelected={selectedCard === equipment.id}
              onSelect={handleCardSelect}
            />
          </div>
        ))}
      </div>

      {/* Add Button (Top Right) */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-8 right-8 z-20 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
      >
        <Plus className="h-5 w-5" />
      </Button>

      {/* Brand Logo (Bottom Left) */}
      {/* <div className="absolute bottom-8 left-8 z-20">
        <div className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-foreground/10" />
        </div>
      </div> */}
    </section>
  )
}
