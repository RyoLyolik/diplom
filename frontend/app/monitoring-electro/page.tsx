'use client';

import { useState, useEffect } from 'react';
import GraphModal from '@/components/GraphModal';
import MonitoringSchemeEl from '@/components/MonitoringSchemeEl';

type DeviceData = {
  [key: string]: {
    timestamp: string;
    data: Array<{
      temperature?: number;
      humidity?: number;
      temperatureIn?: number;
      temperatureOut?: number;
      voltage?: number,
      current?: number,
      fuel?: number,
      load?: number,
      charge?: number,
      activePower?: number,
      coefficient?: number,
    }>;
  };
};

export default function MonitoringPage() {
  const [devicesData, setDevicesData] = useState<DeviceData>({});
  const [selectedParam, setSelectedParam] = useState<{
    type: string;
    position: number;
  } | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:2114/ws');
    
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDevicesData(prev => ({
        ...prev,
        [newData.type]: {
          timestamp: newData.timestamp,
          data: newData.data
        }
      }));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="relative">
      <h1 className="text-2xl mb-4 text-green-400">Мониторинг оборудования</h1>
      
      <div className="border border-gray-700 rounded-lg p-2">
        <MonitoringSchemeEl 
          devicesData={devicesData} 
          onParamClick={setSelectedParam} 
        />
      </div>

      {selectedParam && (
        <GraphModal 
          param={selectedParam.type} 
          position={selectedParam.position}
          onClose={() => setSelectedParam(null)}
        />
      )}
    </div>
  );
}
