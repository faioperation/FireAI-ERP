import { X } from "lucide-react";
import { useRef, useState } from "react";

export  const PostNewNoticeModal = ({ isOpen, onClose, theme }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [department, setDepartment] = useState("");
  const [pinned, setPinned] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const isDark = theme === "dark";

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(f.type),
    );
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleFileInput = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (idx) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    // handle submit logic here
    console.log({ title, content, department, pinned, files });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    /* Backdrop */
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Modal box */}
      <div
        className={`relative w-full rounded-2xl shadow-2xl transition-colors duration-200
          ${isDark ? "bg-[#111827] text-white" : "bg-white text-gray-900"}
        `}
        style={{ maxWidth: 680 }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b
            ${isDark ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <h2 className="text-base font-semibold">Post New Notice</h2>
          <button
            onClick={onClose}
            className={`w-7 h-7 flex items-center justify-center rounded-full text-lg leading-none transition-colors
              ${isDark ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}
            `}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Notice Title */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Notice Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${
                  isDark
                    ? "bg-[#1f2937] border-gray-600 text-white placeholder-gray-500 focus:border-orange-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400"
                }
              `}
            />
          </div>

          {/* Content */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter notice content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-none
                ${
                  isDark
                    ? "bg-[#1f2937] border-gray-600 text-white placeholder-gray-500 focus:border-orange-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400"
                }
              `}
            />
          </div>

          {/* Department + Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Department <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-colors
                    ${
                      isDark
                        ? "bg-[#1f2937] border-gray-600 text-gray-400 focus:border-orange-400"
                        : "bg-white border-gray-300 text-gray-500 focus:border-orange-400"
                    }
                    ${department ? (isDark ? "text-white" : "text-gray-900") : ""}
                  `}
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                </select>
                {/* Dropdown chevron */}
                <span
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs
                  ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  ▾
                </span>
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Author
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                readOnly
                className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none cursor-default
                  ${
                    isDark
                      ? "bg-[#1f2937] border-gray-600 text-gray-300"
                      : "bg-gray-50 border-gray-300 text-gray-700"
                  }
                `}
              />
            </div>
          </div>

          {/* Attach Files */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Attach Files (PDF, PNG, DOC)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`w-full rounded-lg border-2 border-dashed cursor-pointer transition-colors
                flex flex-col items-center justify-center py-7 gap-1
                ${
                  dragOver
                    ? "border-orange-400 bg-orange-50"
                    : isDark
                      ? "border-gray-600 hover:border-gray-500 bg-[#1f2937]"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                }
              `}
            >
              {/* Upload icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDark ? "#9ca3af" : "#6b7280"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p
                className={`text-sm font-medium mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Click to upload or drag and drop
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                PDF, PNG, JPG, DOC (MAX. 10MB)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />

            {/* File chips */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((f, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border
                      ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-gray-100 border-gray-200 text-gray-700"
                      }
                    `}
                  >
                    {f.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      className="ml-0.5 opacity-60 hover:opacity-100 leading-none "
                    >
                      <X size={12}/>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pin toggle */}
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border
              ${isDark ? "border-gray-700 bg-[#1f2937]" : "border-gray-200 bg-gray-50"}
            `}
          >
            {/* Toggle switch */}
            <button
              onClick={() => setPinned(!pinned)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0
                ${pinned ? "bg-orange-500" : isDark ? "bg-gray-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                  ${pinned ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
            <span
              className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Pin this notice to the top
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-3 px-6 py-4 border-t
            ${isDark ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors
              ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 active:scale-95 transition-all duration-150"
          >
            Post Notice
          </button>
        </div>
      </div>
    </div>
  );
};


