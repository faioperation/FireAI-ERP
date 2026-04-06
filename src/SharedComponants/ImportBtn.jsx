import React, { useRef } from 'react';
import * as XLSX from 'xlsx'; // excel library
import { FileDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ImportBtn({ onDataImported }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      
      // Prothom sheet theke data neya
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Excel ke JSON (Array) banano
      const json = XLSX.utils.sheet_to_json(worksheet);
      
      // Parent component-e data pathano
      if (onDataImported) {
        onDataImported(json);
      }
      
      // Reset input
      e.target.value = null;
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".xlsx, .xls" 
        className="hidden" 
      />

      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current.click()} // Button-e click korle input trigger hobe
        className="flex-1 sm:flex-none border-orange-500/50 dark:border-teal-500/50 text-orange-600 dark:text-teal-400 font-bold h-11 rounded-xl px-6"
      >
        <FileDown className="mr-2 h-4 w-4" /> Import From Excel
      </Button>
    </div>
  )
}