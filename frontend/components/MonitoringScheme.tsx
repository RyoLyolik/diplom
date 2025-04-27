// Укажите путь к вашему файлу схемы
import schemeImage from '@/public/temp.png';

type MonitoringSchemeProps = {
  devicesData: {
    [key: string]: {
      timestamp: string;
      data: Array<{
        temperature?: number;
        humidity?: number;
      }>;
    };
  };
  onParamClick: (param: { type: string; position: number }) => void;
};

// Конфигурация элементов схемы с координатами для каждой позиции
const SCHEME_ELEMENTS = [
  {
    type: 'hot',
    positions: [
      { x: 480, y: 440},
      { x: 737, y: 440},
      { x: 1005, y: 440},
      { x: 1262, y: 440},
    ]
  },
  {
    type: 'cold',
    positions: [
      { x: 430, y: 150},
      { x: 545, y: 150},
      { x: 690, y: 150},
      { x: 805, y: 150},
      { x: 950, y: 150},
      { x: 1065, y: 150},
      { x: 1210, y: 150},
      { x: 1325, y: 150},

      { x: 430, y: 300},
      { x: 545, y: 300},
      { x: 690, y: 300},
      { x: 805, y: 300},
      { x: 950, y: 300},
      { x: 1065, y: 300},
      { x: 1210, y: 300},
      { x: 1325, y: 300},

      { x: 430, y: 595},
      { x: 545, y: 595},
      { x: 690, y: 595},
      { x: 805, y: 595},
      { x: 950, y: 595},
      { x: 1065, y: 595},
      { x: 1210, y: 595},
      { x: 1325, y: 595},

      { x: 430, y: 745},
      { x: 545, y: 745},
      { x: 690, y: 745},
      { x: 805, y: 745},
      { x: 950, y: 745},
      { x: 1065, y: 745},
      { x: 1210, y: 745},
      { x: 1325, y: 745},
    ]
  },
  {
    type: 'chiller',
    positions: [
      { x: 10, y: 10 }
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
                {deviceData.data[positionIdx].temperature !== undefined && (
                  <div className="text-blue-400 text-sm">
                    Темп: {Math.round(deviceData.data[positionIdx].temperature*10)/10}°C
                  </div>
                )}
                {deviceData.data[positionIdx].humidity !== undefined && (
                  <div className="text-blue-300 text-sm">
                    Влаж: {Math.round(deviceData.data[positionIdx].humidity*10)/10}%
                  </div>
                )}
              </div>
            )}
          </div>
        ));
      })}
    </div>
  );
}