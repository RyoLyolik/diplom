'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function GraphModal({
  param,
  position,
  onClose
}: {
  param: string;
  position: number;
  onClose: () => void;
}) {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:9999/api/data/?parameter=${param}&position=${position+1}`)
      .then(response => {
        // Преобразуем данные для Recharts
        const formattedData = response.data.times.map((time: string, i: number) => ({
          time,
          ...Object.fromEntries(
            Object.entries(response.data.data).map(([key, val]: [string, any]) => [
              key + ' ' + val.uof, 
              val.values[i]
            ])
          )
        }));
        setGraphData(formattedData);
      });
  }, [param, position]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-green-400">
            Графики для {param} (позиция {position})
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        {graphData && (
          <div className="space-y-8">
            {Object.keys(graphData[0]).filter(k => k !== 'time').map((key) => (
              <div key={key} className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg mb-2">{key}</h3>
                <LineChart
                  width={800}
                  height={300}
                  data={graphData}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={key}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}