"use client"

import { useState } from "react"
import GyroscopeComponent from "../showcase/mobileSensor/gyroscope"
import SensorHomeComponent from "../showcase/mobileSensor/Home"
import SensorSettingsComponent from "../showcase/mobileSensor/Setting"

type TabType = 'home' |  'gyroscope' | 'settings'

export default function MobileShowcase() {
    const [activeTab, setActiveTab] = useState<TabType>('gyroscope')

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'home':
                return <SensorHomeComponent />
            case 'gyroscope':
                return <GyroscopeComponent />
            case 'settings':
                return <SensorSettingsComponent />
            default:
                return <GyroscopeComponent />
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* 左側: UIショーケース */}
                <div className="flex justify-center">
                    <div className="w-full max-w-sm">
                        <div className="bg-black rounded-[1.5rem] p-2 shadow-2xl">
                            <div className="bg-white rounded-[1rem] overflow-hidden relative">
                                {/* メインコンテンツ */}
                                <div className="h-[600px] overflow-hidden">
                                    {renderActiveComponent()}
                                </div>
                                
                                {/* 下部タブナビゲーション */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                                    <div className="flex">
                                        <button
                                            onClick={() => setActiveTab('home')}
                                            className={`flex-1 py-3 px-4 text-center ${
                                                activeTab === 'home' 
                                                    ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50' 
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <span className="text-xs">Home</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setActiveTab('gyroscope')}
                                            className={`flex-1 py-3 px-4 text-center ${
                                                activeTab === 'gyroscope' 
                                                    ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50' 
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                <span className="text-xs">Gyro</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setActiveTab('settings')}
                                            className={`flex-1 py-3 px-4 text-center ${
                                                activeTab === 'settings' 
                                                    ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50' 
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-1">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-xs">Settings</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 右側: 説明 */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            モバイルセンサーアプリ
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            モバイル端末内部の各種センサーを統合したリアルタイム監視アプリケーション。
                            {activeTab === 'gyroscope' && 'ジャイロスコープセンサーでデバイスの回転を検出します。'}
                            {activeTab === 'home' && '複数のセンサーデータをダッシュボード形式で表示します。'}
                            {activeTab === 'settings' && 'センサーの設定とキャリブレーションを行えます。'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">アプリ機能</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-300">
                                    <strong>Gyroscope:</strong> リアルタイムなデバイス回転の検出と表示
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-300">
                                    <strong>センサーダッシュボード:</strong> 加速度、磁力、気圧、GPSデータの統合表示
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-300">
                                    <strong>設定パネル:</strong> センサーキャリブレーションと表示設定
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-300">
                                    <strong>タブナビゲーション:</strong> 直感的なユーザーインターフェース
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-300">使用技術</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                React
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                Next.js
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                TypeScript
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                Tailwind CSS
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                Device APIs
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-black mb-2">使用方法</h4>
                        <ol className="space-y-2 text-sm text-black">
                            <li>1. モバイルデバイスでアクセス</li>
                            <li>2. センサーアクセス許可を選択</li>
                            <li>3. 下部タブで各機能を切り替え</li>
                            <li>4. 設定画面でセンサーをカスタマイズ</li>
                        </ol>
                    </div>

                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
                        <p className="text-sm text-yellow-800">
                            <strong>注意:</strong> このデモは実際のモバイルデバイスまたはデバイスシミュレーターでのみ完全に動作します。
                            デスクトップブラウザでは制限された表示となります。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}