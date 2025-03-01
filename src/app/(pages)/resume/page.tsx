"use client";
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function ResumePage() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resumePath = process.env.NEXT_PUBLIC_RESUME_PATH;
    
    if (!resumePath) {
      setError("Resume is currently unavailable.");
      setLoading(false);
      return;
    }

    // Fetch and create a Blob URL
    fetch(resumePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download resume");
        }
        return response.blob();
      })
      .then((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        setResumeUrl(fileUrl);
      })
      .catch((err) => {
        console.error(err);
        setError("Resume could not be loaded. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Loading Resume...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center mt-6">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && resumeUrl && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div className="w-full max-w-3xl">
            <Viewer fileUrl={resumeUrl} />
          </div>
        </Worker>
      )}
    </main>
  );
}
