'use client';

import React, { useState } from 'react';

interface SettingsState {
  units: {
    altitude: string;
    acceleration: string;
    pressure: string;
    angularVelocity: string;
  };
  display: {
    altitude: boolean;
    acceleration: boolean;
    pressure: boolean;
    angularVelocity: boolean;
  };
}

const SensorSettingsComponent: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    units: {
      altitude: 'Meters',
      acceleration: 'm/s²',
      pressure: 'hPa',
      angularVelocity: 'rad/s'
    },
    display: {
      altitude: false,
      acceleration: true,
      pressure: true,
      angularVelocity: true
    }
  });

  const handleDisplayToggle = (key: keyof SettingsState['display']) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: !prev.display[key]
      }
    }));
  };

  const handleCalibration = (sensor: string) => {
    console.log(`Calibrating ${sensor}...`);
    // Here you would implement the actual calibration logic
  };

  const handleHelp = () => {
    console.log('Opening help...');
  };

  const handleReportIssue = () => {
    console.log('Opening issue reporter...');
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gray-50 justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-gray-50 p-4 pb-2 justify-between">
          <div className="text-[#101518] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Settings
          </h2>
        </div>

        {/* Units Section */}
        <h3 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Units
        </h3>
        
        {/* Altitude Unit Setting */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M164,80a28,28,0,1,0-28-28A28,28,0,0,0,164,80Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,40Zm90.88,155.92-54.56-92.08A15.87,15.87,0,0,0,186.55,96h0a15.85,15.85,0,0,0-13.76,7.84L146.63,148l-44.84-76.1a16,16,0,0,0-27.58,0L1.11,195.94A8,8,0,0,0,8,208H248a8,8,0,0,0,6.88-12.08ZM88,80l23.57,40H64.43ZM22,192l33-56h66l18.74,31.8,0,0L154,192Zm150.57,0-16.66-28.28L186.55,112,234,192Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Altitude</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">{settings.units.altitude}</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Acceleration Unit Setting */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Acceleration</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">{settings.units.acceleration}</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Pressure Unit Setting */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M207.06,80.67A111.24,111.24,0,0,0,128,48h-.4C66.07,48.21,16,99,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM224,184H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,184H32V161.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V88a8,8,0,0,0,16,0V64.33A96.14,96.14,0,0,1,221,136H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Pressure</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">{settings.units.pressure}</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Angular Velocity Unit Setting */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Angular Velocity</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">{settings.units.angularVelocity}</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <h3 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Display
        </h3>

        {/* Altitude Display Toggle */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M164,80a28,28,0,1,0-28-28A28,28,0,0,0,164,80Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,40Zm90.88,155.92-54.56-92.08A15.87,15.87,0,0,0,186.55,96h0a15.85,15.85,0,0,0-13.76,7.84L146.63,148l-44.84-76.1a16,16,0,0,0-27.58,0L1.11,195.94A8,8,0,0,0,8,208H248a8,8,0,0,0,6.88-12.08ZM88,80l23.57,40H64.43ZM22,192l33-56h66l18.74,31.8,0,0L154,192Zm150.57,0-16.66-28.28L186.55,112,234,192Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Altitude</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Show altitude data on the overview screen</p>
            </div>
          </div>
          <div className="shrink-0">
            <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${settings.display.altitude ? 'justify-end bg-[#dce8f3]' : 'bg-[#eaedf1]'}`}>
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transition-transform"></div>
              <input 
                type="checkbox" 
                className="invisible absolute" 
                checked={settings.display.altitude}
                onChange={() => handleDisplayToggle('altitude')}
              />
            </label>
          </div>
        </div>

        {/* Acceleration Display Toggle */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Acceleration</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Show acceleration data on the overview screen</p>
            </div>
          </div>
          <div className="shrink-0">
            <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${settings.display.acceleration ? 'justify-end bg-[#dce8f3]' : 'bg-[#eaedf1]'}`}>
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transition-transform"></div>
              <input 
                type="checkbox" 
                className="invisible absolute" 
                checked={settings.display.acceleration}
                onChange={() => handleDisplayToggle('acceleration')}
              />
            </label>
          </div>
        </div>

        {/* Pressure Display Toggle */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M207.06,80.67A111.24,111.24,0,0,0,128,48h-.4C66.07,48.21,16,99,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM224,184H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,184H32V161.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V88a8,8,0,0,0,16,0V64.33A96.14,96.14,0,0,1,221,136H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Pressure</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Show pressure data on the overview screen</p>
            </div>
          </div>
          <div className="shrink-0">
            <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${settings.display.pressure ? 'justify-end bg-[#dce8f3]' : 'bg-[#eaedf1]'}`}>
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transition-transform"></div>
              <input 
                type="checkbox" 
                className="invisible absolute" 
                checked={settings.display.pressure}
                onChange={() => handleDisplayToggle('pressure')}
              />
            </label>
          </div>
        </div>

        {/* Angular Velocity Display Toggle */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Angular Velocity</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Show angular velocity data on the overview screen</p>
            </div>
          </div>
          <div className="shrink-0">
            <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${settings.display.angularVelocity ? 'justify-end bg-[#dce8f3]' : 'bg-[#eaedf1]'}`}>
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transition-transform"></div>
              <input 
                type="checkbox" 
                className="invisible absolute" 
                checked={settings.display.angularVelocity}
                onChange={() => handleDisplayToggle('angularVelocity')}
              />
            </label>
          </div>
        </div>

        {/* Graph Display Setting */}
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Graph Display</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Adjust graph display settings</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Calibration Section */}
        <h3 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Calibration
        </h3>

        {/* Barometer Calibration */}
        <div 
          className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleCalibration('Barometer')}
        >
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M207.06,80.67A111.24,111.24,0,0,0,128,48h-.4C66.07,48.21,16,99,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM224,184H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,184H32V161.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V88a8,8,0,0,0,16,0V64.33A96.14,96.14,0,0,1,221,136H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Barometer</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Calibrate barometer</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Magnetometer Calibration */}
        <div 
          className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => handleCalibration('Magnetometer')}
        >
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#101518] text-base font-medium leading-normal line-clamp-1">Magnetometer</p>
              <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">Calibrate magnetometer</p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* About Section */}
        <h3 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          About
        </h3>
        
        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-14">
          <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
            </svg>
          </div>
          <p className="text-[#101518] text-base font-normal leading-normal flex-1 truncate">Version 0.2.3</p>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-14">
          <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
            </svg>
          </div>
          <p className="text-[#101518] text-base font-normal leading-normal flex-1 truncate">Developed by Tkgin.</p>
        </div>

        {/* Help & Feedback Section */}
        <h3 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Help &amp; Feedback
        </h3>
        
        <div 
          className="flex items-center gap-4 bg-gray-50 px-4 min-h-14 justify-between cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleHelp}
        >
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
            </div>
            <p className="text-[#101518] text-base font-normal leading-normal flex-1 truncate">Help</p>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div 
          className="flex items-center gap-4 bg-gray-50 px-4 min-h-14 justify-between cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleReportIssue}
        >
          <div className="flex items-center gap-4">
            <div className="text-[#101518] flex items-center justify-center rounded-lg bg-[#eaedf1] shrink-0 size-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M144,92a12,12,0,1,1,12,12A12,12,0,0,1,144,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216ZM56,120H200v-8a72,72,0,0,0-144,0Zm64,95.54V136H56v8A72.08,72.08,0,0,0,120,215.54ZM200,144v-8H136v79.54A72.08,72.08,0,0,0,200,144Z"></path>
              </svg>
            </div>
            <p className="text-[#101518] text-base font-normal leading-normal flex-1 truncate">Report an Issue</p>
          </div>
          <div className="shrink-0">
            <div className="text-[#101518] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="h-5 bg-gray-50"></div>
      </div>
    </div>
  );
};

export default SensorSettingsComponent;
        