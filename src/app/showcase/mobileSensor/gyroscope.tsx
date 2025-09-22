'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

declare global {
  interface Window {
    DeviceOrientationEvent: {
      new (): DeviceOrientationEvent;
      requestPermission?: () => Promise<string>;
    };
  }
}

const GyroscopeComponent: React.FC = () => {
  const [gyroData, setGyroData] = useState<GyroscopeData>({ x: 0, y: 0, z: 0 });
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setGyroData({
      x: event.alpha || 0, // Z-axis rotation
      y: event.beta || 0,  // X-axis rotation
      z: event.gamma || 0  // Y-axis rotation
    });
  }, []);

  const startGyroscope = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  }, [handleOrientation]);

  const requestPermission = useCallback(async () => {
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent?.requestPermission) {
      try {
        const permissionState = await window.DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          setHasPermission(true);
          startGyroscope();
        }
      } catch (error) {
        console.error('Permission request failed:', error);
      }
    } else {
      // For non-iOS devices or older iOS versions
      setHasPermission(true);
      startGyroscope();
    }
  }, [startGyroscope]);

  useEffect(() => {
    // Check if device orientation is supported
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      requestPermission();
    }
  }, [requestPermission]);

  const handleZero = () => {
    setGyroData({ x: 0, y: 0, z: 0 });
  };

  const handleUnits = () => {
    // Toggle between different units if needed
    console.log('Units button clicked');
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 justify-between group/design-root overflow-x-hidden rounded-lg"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
          <div className="text-[#0d141c] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Gyroscope
          </h2>
        </div>

        {/* Angular Velocity Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Angular Velocity
        </h2>
        
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e7edf4]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">X-axis</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {gyroData.x.toFixed(2)} rad/s
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e7edf4]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Y-axis</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {gyroData.y.toFixed(2)} rad/s
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e7edf4]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Z-axis</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {gyroData.z.toFixed(2)} rad/s
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex flex-wrap gap-4 px-4 py-6">
          <div className="flex min-w-72 flex-1 flex-col gap-2">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Gyroscope Data</p>
            <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
              <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                  fill="url(#paint0_linear_1131_5935)"
                />
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#49739c"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e7edf4" />
                    <stop offset="1" stopColor="#e7edf4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-around">
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">0s</p>
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">1s</p>
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">2s</p>
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">3s</p>
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">4s</p>
                <p className="text-[#49739c] text-[13px] font-bold leading-normal tracking-[0.015em]">5s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <button
              onClick={handleZero}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d1d9e0] transition-colors"
            >
              <span className="truncate">Zero</span>
            </button>
            <button
              onClick={handleUnits}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0b6fd1] transition-colors"
            >
              <span className="truncate">Units</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-[#e7edf4] bg-slate-50 px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#49739c] hover:text-[#0d141c] transition-colors" href="#">
            <div className="text-[#49739c] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
              </svg>
            </div>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0d141c]" href="#">
            <div className="text-[#0d141c] flex h-8 items-center justify-center" data-icon="ChartLine" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z" />
              </svg>
            </div>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#49739c] hover:text-[#0d141c] transition-colors" href="#">
            <div className="text-[#49739c] flex h-8 items-center justify-center" data-icon="Gear" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
              </svg>
            </div>
          </a>
        </div>
        <div className="h-5 bg-slate-50"></div>
      </div>

      {/* Permission Request Overlay */}
      {!hasPermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">センサー許可が必要です</h3>
            <p className="text-sm text-gray-600 mb-4">
              ジャイロスコープデータを取得するためにデバイスの向きセンサーへのアクセス許可が必要です。
            </p>
            <button
              onClick={requestPermission}
              className="w-full bg-[#0c7ff2] text-white py-2 px-4 rounded hover:bg-[#0b6fd1] transition-colors"
            >
              許可する
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GyroscopeComponent;