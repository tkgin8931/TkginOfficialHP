"use client"

import { useState } from "react"
import Image from "next/image"
import CreateHP from "../showcase/create-hp/create-hp"
import MichelHPShowcase from "../showcase/michel-hp/Michel-hp"
import { Plus, X, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import DashBorad from "../showcase/Dashboard/app/components/dashboard"
import Terminal from "../showcase/terminalTalk/Terminal"

const audioEquipment = [
  {
    id: "01",
    number: "01",
    title: "CREATE HP",
    image: "/Hero-cansat.png",
    url: "create-hp.com"
  },
  {
    id: "02",
    number: "02",
    title: "Dashboard",
    image: "/DashBoard.png",
    url: "sensor-dashboard.io"
  },
  {
    id: "03",
    number: "03",
    title: "michelHP",
    image: "/michelHP.png",
    url: "michel-portfolio.dev"
  },
  {
    id: "04",
    number: "04",
    title: "Terminal Talk",
    image: "/terminalTalk.png",
    url: "terminal-chat.app"
  }
]

export function HeroSection() {
  const [selectedCard, setSelectedCard] = useState("01")

  const selectedProject = audioEquipment.find(eq => eq.id === selectedCard)

  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/10 to-background py-0 rounded-md">
      {/* ブラウザ風ショーケース */}
      <div className="relative z-20 w-full flex flex-col items-center py-16">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* ブラウザウィンドウ */}
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200">
            
            {/* ブラウザヘッダー */}
            <div className="bg-gray-100 rounded-t-lg border-b border-gray-200">
              {/* トラフィックライト */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                {/* ナビゲーションボタン */}
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* アドレスバー */}
              <div className="px-4 pb-3">
                <div className="bg-white rounded-full border border-gray-300 px-4 py-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-mono">
                    https://{selectedProject?.url}
                  </span>
                </div>
              </div>
              
              {/* タブバー */}
              <div className="flex items-end px-4 -mb-px">
                {audioEquipment.map((equipment) => (
                  <button
                    key={equipment.id}
                    onClick={() => setSelectedCard(equipment.id)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-t border-l border-r transition-all duration-200
                      ${selectedCard === equipment.id 
                        ? 'bg-white border-gray-200 text-gray-900 z-10' 
                        : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                      }
                    `}
                    style={{
                      marginLeft: equipment.id !== "01" ? "-1px" : "0"
                    }}
                  >
                    <Image 
                      src={equipment.image} 
                      alt={equipment.title}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover rounded"
                    />
                    <span className="truncate max-w-24">
                      {equipment.title}
                    </span>
                    {selectedCard === equipment.id && (
                      <button className="ml-1 p-0.5 rounded hover:bg-gray-200 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </button>
                ))}
                
                {/* 新しいタブボタン */}
                <button className="ml-2 p-2 rounded-t-lg hover:bg-gray-100 transition-colors">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* コンテンツエリア */}
            <div className="bg-white rounded-lg overflow-hidden">
              {selectedCard === "01" && <CreateHP />}
              {selectedCard === "02" && <DashBorad />}
              {selectedCard === "03" && <MichelHPShowcase />}
              {selectedCard === "04" && <Terminal />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
