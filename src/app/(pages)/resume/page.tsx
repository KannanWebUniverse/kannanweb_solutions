"use client";

import dynamic from "next/dynamic";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Dynamic import to prevent SSR issues
const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

export default function ResumePage() {
  return (
    <main>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div>
          <Viewer fileUrl={process.env.NEXT_PUBLIC_RESUME_PATH || ""} />
        </div>
      </Worker>
    </main>
  );
}
