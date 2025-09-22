'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface SensorData {
  accelerometer: {
    x: number;
    y: number;
    z: number;
  };
  gyroscope: {
    x: number;
    y: number;
    z: number;
  };
  barometer: {
    pressure: number;
  };
  magnetometer: {
    x: number;
    y: number;
    z: number;
  };
  gps: {
    latitude: number;
    longitude: number;
  };
}

declare global {
  interface Window {
    DeviceOrientationEvent: {
      new (): DeviceOrientationEvent;
      requestPermission?: () => Promise<string>;
    };
  }
}

const SensorHomeComponent: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    accelerometer: { x: 1.2, y: 0.8, z: 9.8 },
    gyroscope: { x: 0.1, y: 0.2, z: 0.05 },
    barometer: { pressure: 1013 },
    magnetometer: { x: 20, y: 30, z: 40 },
    gps: { latitude: 35.6762, longitude: 139.6503 }
  });

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setSensorData(prevData => ({
      ...prevData,
      gyroscope: {
        x: (event.alpha || 0) / 100, // Convert to smaller values for rad/s
        y: (event.beta || 0) / 100,
        z: (event.gamma || 0) / 100
      }
    }));
  }, []);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    if (event.acceleration) {
      setSensorData(prevData => ({
        ...prevData,
        accelerometer: {
          x: event.acceleration?.x || 0,
          y: event.acceleration?.y || 0,
          z: event.acceleration?.z || 9.8
        }
      }));
    }
  }, []);

  const startSensors = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation);
      window.addEventListener('devicemotion', handleMotion);
    }
  }, [handleOrientation, handleMotion]);

  const requestPermission = useCallback(async () => {
    if (typeof window !== 'undefined') {
      // Check for iOS permission
      if (typeof window.DeviceOrientationEvent?.requestPermission === 'function') {
        try {
          const permissionState = await window.DeviceOrientationEvent.requestPermission();
          if (permissionState === 'granted') {
            setHasPermission(true);
            startSensors();
          }
        } catch (error) {
          console.error('Permission request failed:', error);
        }
      } else {
        // For non-iOS devices
        setHasPermission(true);
        startSensors();
      }

      // Get GPS location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setSensorData(prevData => ({
              ...prevData,
              gps: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            }));
          },
          (error) => {
            console.error('GPS error:', error);
          }
        );
      }
    }
  }, [startSensors]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>


        {/* Accelerometer Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Accelerometer
        </h2>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">X</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.accelerometer.x.toFixed(1)} m/s²
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Y</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.accelerometer.y.toFixed(1)} m/s²
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Z</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.accelerometer.z.toFixed(1)} m/s²
            </p>
          </div>
        </div>

        {/* Gyroscope Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Gyroscope
        </h2>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">X</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.gyroscope.x.toFixed(2)} rad/s
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Y</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.gyroscope.y.toFixed(2)} rad/s
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Z</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.gyroscope.z.toFixed(2)} rad/s
            </p>
          </div>
        </div>

        {/* Barometer Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Barometer
        </h2>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Pressure</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.barometer.pressure} hPa
            </p>
          </div>
        </div>

        {/* Magnetometer Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Magnetometer
        </h2>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">X</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.magnetometer.x} µT
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Y</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.magnetometer.y} µT
            </p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#cedbe8]">
            <p className="text-[#0d141c] text-base font-medium leading-normal">Z</p>
            <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">
              {sensorData.magnetometer.z} µT
            </p>
          </div>
        </div>

        {/* GPS Section */}
        <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          GPS
        </h2>
        <div className="flex px-4 py-3">
          <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p className="text-sm font-medium">Current Location</p>
              <p className="text-xs mt-1">
                Lat: {sensorData.gps.latitude.toFixed(4)}, Lng: {sensorData.gps.longitude.toFixed(4)}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                Map integration available with API key
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="h-5 bg-slate-50"></div>
      </div>

    </div>
  );
};

export default SensorHomeComponent;
