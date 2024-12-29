'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const ResumePage = () => {
    const [blobUrl, setBlobUrl] = useState(process.env.RESUMENAME);
    return (
      <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}
>
  {
    blobUrl&&   <Viewer fileUrl={blobUrl}/>
  }
 
</div>
</Worker>
      </>
    );
};

export default ResumePage;
