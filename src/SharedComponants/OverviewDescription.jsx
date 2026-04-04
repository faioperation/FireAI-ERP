import { useState } from "react";

const OverviewDescription = () => {
  const [text, setText] = useState("");

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex gap-1">
        Add Overview Description
        <span className="text-red-500">*</span>
      </label>
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#0B1220] focus-within:ring-2  transition-all">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          placeholder="Write add overview description"
          className="w-full resize-none min-h-[140px]  bg-transparent text-gray-800 dark:text-gray-200 text-sm p-4 pb-2 outline-none rounded-t-xl placeholder:text-center placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default OverviewDescription;
