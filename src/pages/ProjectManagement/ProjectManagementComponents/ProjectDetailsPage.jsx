import React, { useState, useContext } from "react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";
import { ArrowLeft, Calendar, DollarSign, Users, Plus } from "lucide-react";
import { Link } from "react-router";

const ProjectDetailsPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Notes state - Default kisu data rakha holo
  const [notes, setNotes] = useState([
    "AI development is the end-to-end process of designing, building, and deploying intelligent software capable of performing human-like cognitive tasks, such as learning, reasoning, and problem-solving.",
    "The redesign includes a simplified navigation system, improved product pages, and a streamlined checkout process.",
  ]);

  // Naya note add korar function
  const handleAddNote = () => {
    const newNoteText = prompt("Enter your new note:");
    if (newNoteText && newNoteText.trim() !== "") {
      setNotes([newNoteText, ...notes]);
    }
  };

  return (
    <div
      className={` transition-colors duration-300 ${isDark ? "bg-[#0B0F1A] text-white" : "bg-gray-50 text-gray-900"}`}
    >


      <div className="max-w-5xl mx-auto space-y-6">
   

   
        <div
          className={`p-6 rounded-2xl border ${isDark ? "bg-[#111827] border-gray-800" : "bg-white border-gray-200"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}
            >
              Notes
            </h2>
            <button
              onClick={handleAddNote}
              className={`p-1 rounded-md hover:bg-orange-500 hover:text-white transition-all ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                  isDark
                    ? "bg-[#1A1F2E] border-gray-800 text-gray-400 hover:border-orange-500/30"
                    : "bg-white border-gray-100 text-gray-600 hover:border-orange-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <p className="text-center text-gray-400 py-10 text-sm">
              No notes added yet. Click the + icon to add one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
