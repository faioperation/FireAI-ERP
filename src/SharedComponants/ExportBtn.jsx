import React from 'react';
import * as XLSX from 'xlsx'; // Puran style e import
import { FileUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ExportBtn({ data, fileName = "Exported_Data" }) {
  
  const handleExport = () => {
    // 1. Jodi data na thake tahole export hobe na
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }

    // 2. Data ke Worksheet e convert kora
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // 3. Ekta Workbook banano
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
    // 4. File download kora
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div>
      <Button 
        variant="outline" 
        onClick={handleExport}
        className="flex-1 sm:flex-none border-orange-500/50 dark:border-teal-500/50 text-orange-600 dark:text-teal-400 font-bold h-11 rounded-xl px-6"
      >
        <FileUp className="mr-2 h-4 w-4" /> Export To Excel
      </Button>
    </div>
  );
}