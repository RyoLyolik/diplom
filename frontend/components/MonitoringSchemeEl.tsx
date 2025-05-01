// Укажите путь к вашему файлу схемы
import schemeImage from '@/public/temp2.png';

type MonitoringSchemeProps = {
  devicesData: {
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
  onParamClick: (param: { type: string; position: number }) => void;
};

// Конфигурация элементов схемы с координатами для каждой позиции
const SCHEME_ELEMENTS = [
  {
    type: 'DGU',
    positions: [
      { x: -10, y: 345},
      { x: -10, y: 548},
    ]
  },
  {
    type: 'GRSCH',
    positions: [
        { x: 160, y: 345 },
        { x: 160, y: 548 },
    ]
  },
  {
    type: 'IBP',
    positions: [
        { x: 380, y: 345 },
        { x: 380, y: 548 },
    ]
  },
  {
    type: 'SCHR',
    positions: [
        { x: 590, y: 143 },
        { x: 590, y: 345 },
        { x: 590, y: 548 },
        { x: 590, y: 750 },

        { x: 1340, y: 143 },
        { x: 1340, y: 345 },
        { x: 1340, y: 548 },
        { x: 1340, y: 750 },
    ]
  },
  {
    type: 'PDU',
    positions: [
        { x: 857, y: 25 },
        { x: 857, y: 25 + 102*1 },
        { x: 857, y: 25 + 102*2 },
        { x: 857, y: 25 + 102*3 },
        { x: 857, y: 25 + 102*4 },
        { x: 857, y: 25 + 102*5 },
        { x: 857, y: 25 + 102*6 },
        { x: 857, y: 25 + 102*7 },

        { x: 857 + 135*1, y: 25 },
        { x: 857 + 135*1, y: 25 + 102*1 },
        { x: 857 + 135*1, y: 25 + 102*2 },
        { x: 857 + 135*1, y: 25 + 102*3 },
        { x: 857 + 135*1, y: 25 + 102*4 },
        { x: 857 + 135*1, y: 25 + 102*5 },
        { x: 857 + 135*1, y: 25 + 102*6 },
        { x: 857 + 135*1, y: 25 + 102*7 },

        { x: 857 + 135*2, y: 25 },
        { x: 857 + 135*2, y: 25 + 102*1 },
        { x: 857 + 135*2, y: 25 + 102*2 },
        { x: 857 + 135*2, y: 25 + 102*3 },
        { x: 857 + 135*2, y: 25 + 102*4 },
        { x: 857 + 135*2, y: 25 + 102*5 },
        { x: 857 + 135*2, y: 25 + 102*6 },
        { x: 857 + 135*2, y: 25 + 102*7 },
    
        { x: 857 + 135*3, y: 25 },
        { x: 857 + 135*3, y: 25 + 102*1 },
        { x: 857 + 135*3, y: 25 + 102*2 },
        { x: 857 + 135*3, y: 25 + 102*3 },
        { x: 857 + 135*3, y: 25 + 102*4 },
        { x: 857 + 135*3, y: 25 + 102*5 },
        { x: 857 + 135*3, y: 25 + 102*6 },
        { x: 857 + 135*3, y: 25 + 102*7 },

        { x: 1600, y: 25 },
        { x: 1600, y: 25 + 102*1 },
        { x: 1600, y: 25 + 102*2 },
        { x: 1600, y: 25 + 102*3 },
        { x: 1600, y: 25 + 102*4 },
        { x: 1600, y: 25 + 102*5 },
        { x: 1600, y: 25 + 102*6 },
        { x: 1600, y: 25 + 102*7 },
        { x: 1600 + 135*1, y: 25 },
        { x: 1600 + 135*1, y: 25 + 102*1 },
        { x: 1600 + 135*1, y: 25 + 102*2 },
        { x: 1600 + 135*1, y: 25 + 102*3 },
        { x: 1600 + 135*1, y: 25 + 102*4 },
        { x: 1600 + 135*1, y: 25 + 102*5 },
        { x: 1600 + 135*1, y: 25 + 102*6 },
        { x: 1600 + 135*1, y: 25 + 102*7 },
        { x: 1600 + 135*2, y: 25 },
        { x: 1600 + 135*2, y: 25 + 102*1 },
        { x: 1600 + 135*2, y: 25 + 102*2 },
        { x: 1600 + 135*2, y: 25 + 102*3 },
        { x: 1600 + 135*2, y: 25 + 102*4 },
        { x: 1600 + 135*2, y: 25 + 102*5 },
        { x: 1600 + 135*2, y: 25 + 102*6 },
        { x: 1600 + 135*2, y: 25 + 102*7 },
        { x: 1600 + 135*3, y: 25 },
        { x: 1600 + 135*3, y: 25 + 102*1 },
        { x: 1600 + 135*3, y: 25 + 102*2 },
        { x: 1600 + 135*3, y: 25 + 102*3 },
        { x: 1600 + 135*3, y: 25 + 102*4 },
        { x: 1600 + 135*3, y: 25 + 102*5 },
        { x: 1600 + 135*3, y: 25 + 102*6 },
        { x: 1600 + 135*3, y: 25 + 102*7 },
    ]
  }
  // Добавьте другие устройства по аналогии
];

export default function MonitoringScheme({
  devicesData,
  onParamClick
}: MonitoringSchemeProps) {
  return (
    <div className="relative">
      <img 
        src={schemeImage.src} 
        alt="Схема мониторинга" 
        className="w-full" 
      />
      
      {SCHEME_ELEMENTS.map((device) => {
        const deviceData = devicesData[device.type];
        return device.positions.map((pos, positionIdx) => (
          <div
            key={`${device.type}-${positionIdx}`}
            className="absolute p-2 rounded"
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
          >
            
            {deviceData?.data[positionIdx] && (
              <div 
                className="cursor-pointer hover:bg-gray-700 p-1 rounded"
                onClick={() => onParamClick({ 
                  type: device.type, 
                  position: positionIdx 
                })}
              >
                {(deviceData.data[positionIdx].current !== undefined) && (device.type=='PDU') && (
                <div className="text-blue-400 text-sm">
                    I: {Math.round(deviceData.data[positionIdx].current*10)/10}А
                </div>)}
                {(deviceData.data[positionIdx].voltage !== undefined) && (device.type=='DGU' || device.type=='GRSCH' || device.type=='IBP' || device.type=='SCHR' || device.type=='PDU') && (
                <div className="text-blue-400 text-sm">
                    U: {Math.round(deviceData.data[positionIdx].voltage*10)/10}В
                </div>)}
                {(deviceData.data[positionIdx].activePower !== undefined) && (device.type=='DGU' || device.type=='GRSCH' || device.type=='IBP' || device.type=='SCHR') && (
                <div className="text-blue-400 text-sm">
                    P: {Math.round(deviceData.data[positionIdx].activePower*10)/10}кВт
                </div>)}
                {(deviceData.data[positionIdx].coefficient !== undefined) && (device.type=='DGU' || device.type=='GRSCH' || device.type=='IBP' || device.type=='SCHR') && (
                <div className="text-blue-400 text-sm">
                    К: {Math.round(deviceData.data[positionIdx].coefficient*100)/100}
                </div>)}
                {(deviceData.data[positionIdx].fuel !== undefined) && (device.type=='DGU') && (
                <div className="text-blue-400 text-sm">
                    Топливо: {Math.round(deviceData.data[positionIdx].fuel*100)/100}
                </div>)}
                {(deviceData.data[positionIdx].charge !== undefined) && (device.type=='IBP') && (
                <div className="text-blue-400 text-sm">
                    Топливо: {Math.round(deviceData.data[positionIdx].charge*100)/100}
                </div>)}
                {(deviceData.data[positionIdx].load !== undefined) && (device.type=='IBP') && (
                <div className="text-blue-400 text-sm">
                    Топливо: {Math.round(deviceData.data[positionIdx].load*100)/100}
                </div>)}
              </div>
            )}
          </div>
        ));
      })}
    </div>
  );
}