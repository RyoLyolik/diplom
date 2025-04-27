"use client";
import Navigation from '@/components/NavBar';
import React, { useEffect, useRef, useState } from 'react';

export default function SomePage() {
  const iframeRef = useRef(null);
  const [gridLayoutContent, setGridLayoutContent] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const gridLayoutDiv = iframeDoc.querySelector('.react-grid-layout');
        
        if (gridLayoutDiv) {
          // Clone the div to avoid mutating the iframe's DOM
          const clonedDiv = gridLayoutDiv.cloneNode(true);
          setGridLayoutContent(clonedDiv.outerHTML);
        }
      } catch (error) {
        console.error("Error accessing iframe:", error);
      }
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hidden iframe (loads content but isn't displayed) */}
      <iframe
        ref={iframeRef}
        src="http://localhost:3000/d/cejrl5l01siyod/sila-toka-na-pdu-v-real-nom-vremeni?orgId=1&from=now-5m&to=now&timezone=browser"
        style={{ display: 'none' }}
        frameBorder="0"
      />
      {/* Render the extracted div */}
      {gridLayoutContent && (
        <div 
          dangerouslySetInnerHTML={{ __html: gridLayoutContent }} 
          className="embedded-grafana-grid"
        />
      )}
    </div>
  );
}