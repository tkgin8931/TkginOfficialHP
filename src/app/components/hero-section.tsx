"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import CreateHP from "../showcase/create-hp/create-hp"
import MichelHPShowcase from "../showcase/michel-hp/Michel-hp"
import Image from "next/image"
import { AudioEquipmentCard } from "./equipment-card"
import { Button } from "./button"
import { Plus } from "lucide-react"
import DashBorad from "../showcase/Dashboard/app/components/dashboard"
import Terminal from "../showcase/terminalTalk/Terminal"

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const [selectedCard, setSelectedCard] = useState("03") // Default to card 03

  // 選択中カードの画像パスを取得
  const selectedImage = audioEquipment.find(e => e.id === selectedCard)?.image || "/valveTerminal.png";

  // カード表示時のアニメーション
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }
      )
    }
  }, [])

  // 選択カードの拡大アニメーション
  useEffect(() => {
    const selectedIdx = audioEquipment.findIndex(e => e.id === selectedCard)
    const el = cardsRef.current[selectedIdx]
    if (el) {
      gsap.to(el, { scale: 1.13, boxShadow: "0 0 32px #38bdf8", duration: 0.4, ease: "power2.out" })
      setTimeout(() => {
        gsap.to(el, { scale: 1.1, boxShadow: "0 0 16px #38bdf8", duration: 0.3, ease: "power2.inOut" })
      }, 400)
    }
  }, [selectedCard])

  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/10 to-background py-8">
      {/* 実際のショーケースUIを埋め込む。カードで切り替え */}
      <div className="relative z-20 w-full flex flex-col items-center py-16">
        <div className="w-full max-w-6xl rounded-xl shadow-xl bg-black/70 mx-auto border">
          {selectedCard === "06" && <CreateHP />}
          {selectedCard === "03" && <MichelHPShowcase />}
          {selectedCard === "05" && <DashBorad />}
          {selectedCard === "02" && <Terminal />}
          {["01","04"].includes(selectedCard) && (
            <div className="flex items-center justify-center min-h-[600px]">
              <Image
                src={selectedImage}
                alt={audioEquipment.find(e => e.id === selectedCard)?.title || "Showcase"}
                width={900}
                height={600}
                className="object-contain rounded-xl mx-auto"
              />
            </div>
          )}
        </div>
        {/* カードグリッド（ショーケース切り替えUI） */}
  <div className="mt-8 flex gap-4 flex-row flex-wrap justify-center z-30 w-full">
          {audioEquipment.map((equipment, idx) => (
            <div key={equipment.id} ref={el => { cardsRef.current[idx] = el }}>
              <AudioEquipmentCard
                id={equipment.id}
                number={equipment.number}
                title={equipment.title}
                isSelected={selectedCard === equipment.id}
                onSelect={setSelectedCard}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Button (Top Right) */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-8 right-8 z-30 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </section>
  )
}
