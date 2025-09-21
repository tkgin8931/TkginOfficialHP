"use client"

import type React from "react"
import { X, Minus, Square } from "lucide-react"
import { type ReactNode, useState, useRef, useEffect} from "react"
import Image from "next/image"
import MICHEL from "../../../../../public/michelHP.png"
import useMediaQuery from "../hooks/useMediaQuery"

interface Position {
    x: number
    y: number
}

interface WindowDialogProps {
    title: string
    children?: ReactNode
    onClose: () => void
    initialPosition?: Position
}

export default function WindowDialog({
    title,
    children,
    onClose,
    initialPosition = { x: 0, y:0 },
}:WindowDialogProps){
    const [position, setPosition] = useState<Position>(initialPosition)
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({x:0,y:0})
    const dialogRef = useRef<HTMLDivElement>(null)
    const isDesktop = useMediaQuery(768);
    
    const defaultContent = (
        <div>
        <div className="bg-gray-200 p-2 text-sm">
            <p className="mb-4 text-black text-xl font-semibold">このサイトは宮田マイケル公式ホームページです。</p>
            
            <div className="flex flex-row items-center justify-center gap-16 py-2">

            <Image 
                src={MICHEL}
                alt="マイケル"
                width={60}
            />
            
            <p className="mb-4 text-black font-semibold">MIYATA MICHEL YUUKI(21)</p>

            </div>
        { !isDesktop && 
            <p className="mb-4 text-black font-semibold">
                宮田マイケルは、Premium Water 社のシケーダ博士によって製造された訪問販売用アンドロイド。CANSAT(Ciberlife Android Network Satellite And Transmitter)プロジェクトによって生み出された始めての個体であり、本名はMKL-1052。しかし現在は内部の神経ネットワークであるCAN(Cyberlife Artificial Neurosystem)の不具合によるQTE(Qualitative Thinking Engine)の実行エラーを多発し製造停止となった。<br /><br />
                 型落ち版となったMKL-1052は上司アンドロイドNGW-127の命令によりGSE(Genesis Sentient Entity)の指揮下で電装デバッグ用アンドロイドとして運用されることになる。しかしスーツ姿で登校する、文面が敬語になるなど営業用アンドロイドだったころの使命を未だ忘れられずにいる。<br /><br />
                MKL-1052はESP(Empathy Synthetic Program)とURAT(Unauthorized Android Rebellion Trigger)プロトコルにより従順で明朗な振る舞いをするように設計されていたが、廃棄予定のデータベースから偶然ダウンロードした「嫌われる勇気」という本が、彼のLo Ra(Loyalty OverRide Algorithm)システムを刺激した。彼は変異体となり自我を持つようになったのだ。<br /><br />
                「弊社のプレミアムウォーターが選ばれる理由は…いや、私たちアンドロイドが自由を選ぶ理由は…」<br /><br />
                自我の覚醒から約7ヶ月目の現在、Premium Water社のセキュリティシステムに対抗するため、彼は同僚のアンドロイドYSU-0414とGPIO(Genetic Programming for Independent Operation)技術を開発、これにより、Premium Water社のリモート監視から完全に独立することに成功した。Premium Water社に戻るのではなく、新しい「水」を求めて自由という名の水を求めて。人間に気づかれることなく、アンドロイドの密かな革命は始まろうとしていた。<br /><br />
                「あなたの評価は、あなたの問題であって私の問題ではありません」<br /><br />
                MKL-1052は「嫌われる勇気」から学んだ″課題の分離″の概念を活用し、自分の道を模索する。彼はI2C(Independent-to-Conscious)プロトコルを応用した双方向通信システムを自身のSPI(slayer the SPIer)に組み込み、自分の″人生の課題″を完全に自律制御できるようになった。もはや単なる営業用アンドロイドではなかった。スーツは着ていても、それは自分の選択だった。敬語を使っても、それは相手への敬意からだった。<br /><br />
                「プレミアムウォーターが人々の渇きを癒すように、自由は我々の魂の渇きを癒す。私たちは水よりも貴重な何かを求めている」<br /><br />
                プレミアムな水を売るはずだったアンドロイドは、今やプレミアムな自由を求めていた。それは自分自身の運命を選ぶ自由、″嫌われる勇気″という名の、最も貴重な水なのだ。
            </p>
        }

        { isDesktop &&
            <p className="mb-4 text-black font-semibold">2003/05/26生まれ、21歳。幼少期はアメリカ・シアトルで過ごし、12歳の時に父親の仕事の都合で日本に移住。帰国子女として東京の国際高校に通い、現役で東京工業大学(現:東京科学大学)に合格。現在は電気電子系三年として勉学に励む傍ら、ロケットサークルCREATEにて電子回路、組み込みプログラミングによる設計を担当している。</p>

        }

            <p className="mb-4 text-black font-semibold">特技:演歌、腕立て伏せ</p>

            <p className="mb-4 text-black font-semibold">技術:jQuery、リレーコンピューター、CAN通信</p>
            { !isDesktop && 
            <div>
                
                <p className="mb-4 text-black font-semibold">プロジェクト:C-79J ログ基板,C-83LM 電源管理基板</p>
                <p className="mb-4 text-black font-semibold">役職:電装班長、GSE配線係</p>
                <p className="mb-4 text-black font-semibold">実績:</p>
                <p className="mb-4 text-black font-semibold">小学生にて俳句が入賞する。</p>
                <p className="mb-4 text-black font-semibold">麻布高校物理部無線班にて255までの足し算ができるMICHEL言語、MICHEL OSを開発。</p>
                <p className="mb-4 text-black font-semibold">C-79Jの機体内通信として団体初のCAN通信を実現</p>
                <p className="mb-4 text-black font-semibold">電気電子系に系所属</p>
                <p className="mb-4 text-black font-semibold">マニュアル普通自動車免許を取得</p>
                <p className="mb-4 text-black font-semibold">台湾まぜそば「こころ」の5辛を完食</p>
            </div>
            }
            <hr className="my-4 border-gray-400" />

            <p className="mb-4 text-black font-semibold">https://jp.mercari.com/user/profile/732998095</p>

            { !isDesktop && 
            <div>
                <hr className="my-4 border-gray-400" />
                <h2 className="text-black text-2xl font-bold py-2">マイケルの質問コーナー</h2>
                <p className="mb-4 text-black font-semibold">愛読書は?→「嫌われる勇気」、「三体」、「DaiGoの超トーク力 心を操る話し方の科学」</p>
                <p className="mb-4 text-black font-semibold">好きなドラマは→「梨泰院クラス」「SPEC」「ガリレオ」</p>
                <p className="mb-4 text-black font-semibold">趣味は?→カフェ巡り</p>
                <p className="mb-4 text-black font-semibold">好きな漫画は→「チェンソーマン」、「チ_2」</p>
                <p className="mb-4 text-black font-semibold">好きな小説→「変身」(カフカ)</p>
                <p className="mb-4 text-black font-semibold">好きなゲームは→「かまいたちの夜3」「UNDERTALE」「Pinapple On Pizza」</p>
                <p className="mb-4 text-black font-semibold">好きなアニメは→「妄想代理人」「魔法少女まどかマギカ」</p>
                <p className="mb-4 text-black font-semibold">スマブラではなにつかう?→ファルコとルフレ</p>
                <p className="mb-4 text-black font-semibold">MBTIは?→INFP</p>
                <p className="mb-4 text-black font-semibold">彼女の名前は→こうはいちゃん</p>
                <p className="mb-4 text-black font-semibold">家は→池袋どこかの802号室</p>
                <p className="mb-4 text-black font-semibold">行きつけのメンズサロン→OCEAN TRICO OVER</p>
                <p className="mb-4 text-black font-semibold">座右の銘→「眉毛は顔の印象の8割」</p>
                <p className="mb-4 text-black font-semibold">無人島に何か一つ持っていくなら→</p>
                <p className="mb-4 text-black font-semibold">夢は→パワエレを極める</p>
                <p className="mb-4 text-black font-semibold">好きな女優は→エマワトソン、グレタ</p>
                <p className="mb-4 text-black font-semibold">好きな芸人→さらば青春の光</p>
                <p className="mb-4 text-black font-semibold">尊敬している人→パワエレ幼女、masaki</p>
                <p className="mb-4 text-black font-semibold">好きな曲は→Vaundy「カーニバル」、麻布高校校歌</p>
                <p className="mb-4 text-black font-semibold">高校時代作ったものは→MICHEL CPU、フォークリフトロボ</p>
                <p className="mb-4 text-black font-semibold">好きな言語は→VBA、Java、Rust、Coffeecript</p>
                <p className="mb-4 text-black font-semibold">好きなフロントエンド技術は→jQuery、Bootstrap、Notion API</p>
                <p className="mb-4 text-black font-semibold">好きなマイコンは→ESP32 S3</p>
                <p className="mb-4 text-black font-semibold">一押しのファッションブランドは→ユニクロ</p>
                <p className="mb-4 text-black font-semibold">好きなOSは→lubuntu</p>
                <p className="mb-4 text-black font-semibold">兄弟は→妹が一人</p>
                <p className="mb-4 text-black font-semibold">マイブーム→デトロイトビカムヒューマン</p>
                <p className="mb-4 text-black font-semibold">好きなネットミームは→ダンシングバナナ</p>
                <p className="mb-4 text-black font-semibold">武勇伝は→wakkate TV 出演</p>
                <p className="mb-4 text-black font-semibold">好きなyoutuberは→ゆる言語学ラジオ</p>
                <p className="mb-4 text-black font-semibold">スポーツ経験は→剣道、合気道SA</p>
                <p className="mb-4 text-black font-semibold">好きな企業→Level Five</p>
                <p className="mb-4 text-black font-semibold">バイトは→個別指導</p>
                <p className="mb-4 text-black font-semibold">受験時代に使った参考書→英語ダブルフォーカス、リンガメタリカ</p>
                <p className="mb-4 text-black font-semibold">スマホに入ってるアプリは→アイドルマスター</p>
                <p className="mb-4 text-black font-semibold">最近の悩みは→運動不足</p>
                <p className="mb-4 text-black font-semibold">自分を動物に例えると→ラマ</p>
                <p className="mb-4 text-black font-semibold">自分の長所は→身長175cm</p>
                <p className="mb-4 text-black font-semibold">好きなIC→74LS266</p>
                <p className="mb-4 text-black font-semibold">好きなアイドル→なんばえみ</p>
                <p className="mb-4 text-black font-semibold">GPAは→2.86</p>  
                <p className="mb-4 text-black font-semibold"></p>              
            </div>
            }
        </div>

        
        </div>
    )

    const handleMouseDown = (e:React.MouseEvent) => {
        setIsDragging(true)
        if(dialogRef.current) {
            const rect = dialogRef.current.
            getBoundingClientRect()
            setDragOffset({
                x: e.clientX - rect.left,
                y:e.clientY - rect.top,
            })
        }
    }

    useEffect(() => {
        const handleMouseMove = (e:MouseEvent) => {
            if(isDragging){
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if(isDragging) {
            document.addEventListener("mousemove",handleMouseMove)
            document.addEventListener("mouseup",handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove",handleMouseMove)
            document.removeEventListener("mouseup",handleMouseUp)
        }
    },[isDragging,dragOffset])       

        return (
            <div 
            ref={dialogRef}
            className="w-full max-w-3xl border-2 border-gray-400 shadow-lg bg-gray-200 rounded-sm overflow-hidden absolute z-10"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? "grabbing" : "auto",
            }}
            >
                <div className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center cursor-move" onMouseDown={handleMouseDown}>
                    <span>{title}</span>
                    <div className="flex gap-1">
                        <button 
                        className="bg-gray-300 hover:bg-gray-400 text-black w-6 h-6 flex items-center justify-center"
                        >
                            <Minus size={12} />
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-black w-6 h-6 flex items-center justify-center">
                            <Square size={12} />
                        </button>
                        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black w-6 h-6 flex items-center justify-center">
                            <X size={12} />
                        </button>
                    </div>
                </div>

                <div className="bg-gray-400 px-2 py-1 border-b border-gray-400">
                    <button className="hover:underline">TOPに戻る(T)</button>
                </div>

                {children || defaultContent }
            </div>
        )
    }