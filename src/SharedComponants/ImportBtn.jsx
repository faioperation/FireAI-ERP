import React from 'react'
import {  FileDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
export default function ImportBtn() {
  return (
    <div>
      <Button variant="outline" className="flex-1 sm:flex-none border-orange-500/50 dark:border-teal-500/50 text-orange-600 dark:text-teal-400 font-bold h-11 rounded-xl px-6">
            <FileDown className="mr-2 h-4 w-4" /> Import From Excel
          </Button>
    </div>
  )
}
