'use client';

import { useState, useEffect } from 'react';

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:2114/ws/alert');
    
    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications(prev => [...prev, newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== newNotification));
      }, 10000);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification, i) => (
        <div 
          key={i}
          className="bg-gray-800 border-l-4 border-red-500 p-4 rounded shadow-lg w-80"
        >
          <h3 className="font-bold text-red-400">{notification.Title}</h3>
          <p className="text-sm mt-1">{notification.Detail}</p>
          <button 
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            onClick={() => window.location.href = '/incidents/create'}
          >
            Завести инцидент
          </button>
        </div>
      ))}
    </div>
  );
}