import { useState, useContext } from "react";
import { ChevronDown, X } from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const initialForm = {
  meetingTitle: "",
  meetingType: "",
  client: "",
  clientType: "",
  dateTime: "",
  project: "",
  location: "",
  participants: "",
  agenda: "",
};

const meetingTypes = [
  "Internal",
  "External",
  "Client Call",
  "Team Sync",
  "Interview",
];
const clientTypes = ["Retail", "Corporate", "Government", "Startup", "NGO"];
const projects = [
  "FireAI ERP",
  "Project Alpha",
  "Project Beta",
  "Project Gamma",
];

const MeetingCreateModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.meetingTitle.trim()) e.meetingTitle = "Meeting title is required";
    if (!form.meetingType) e.meetingType = "Meeting type is required";
    if (!form.client.trim()) e.client = "Client name is required";
    if (!form.clientType) e.clientType = "Client type is required";
    if (!form.dateTime) e.dateTime = "Date & time is required";
    if (!form.project) e.project = "Project is required";
    if (!form.location.trim()) e.location = "Location / Platform is required";
    if (!form.participants.trim())
      e.participants = "At least one participant is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    console.log("Meeting Data:", form);
    handleClose();
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const borderColor = isDark ? "border-gray-700" : "border-gray-100";
  const labelColor = isDark ? "text-gray-400" : "text-gray-500";

  const inputBase =
    "w-full rounded-xl text-sm outline-none transition-all duration-150 border px-3 py-2.5";
  const inputNormal = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#00d2ff]"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:bg-white";
  const inputErr = isDark
    ? "bg-red-950/40 border-red-500 text-white"
    : "bg-red-50 border-red-400";

  const getInputClass = (field) =>
    `${inputBase} ${errors[field] ? inputErr : inputNormal}`;

  const dateClass = `${getInputClass("dateTime")} ${
    !form.dateTime
      ? isDark
        ? "text-gray-500"
        : "text-gray-400"
      : isDark
        ? "text-white"
        : "text-gray-900"
  }`;

  const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className={`text-xs font-medium ${labelColor}`}>{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );

  const SelectField = ({ field, label, placeholder, options }) => (
    <Field label={label} error={errors[field]}>
      <div className="relative">
        <select
          className={`${getInputClass(field)} pr-8 appearance-none cursor-pointer ${
            !form[field]
              ? isDark
                ? "text-gray-500"
                : "text-gray-400"
              : isDark
                ? "text-white"
                : "text-gray-900"
          }`}
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((o) => (
            <option
              key={o}
              className={
                isDark ? "text-white bg-gray-800" : "text-gray-900 bg-white"
              }
            >
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
        />
      </div>
    </Field>
  );

  return (
    <>
      {/* scrollbar hide style */}
      <style>{`
        .modal-scroll::-webkit-scrollbar { display: none; }
        .modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        style={{ background: "rgba(0,0,0,0.55)" }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div
          className={`modal-scroll w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto
          ${isDark ? "bg-[#111827] text-white" : "bg-white text-gray-900"}`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-5 sm:px-6 py-4 ${borderColor}`}
          >
            <h2 className="text-base sm:text-lg font-semibold">
              Schedule New Meeting
            </h2>
            <button
              onClick={handleClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer
                ${
                  isDark
                    ? "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                }`}
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-6 py-5 space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Meeting Title" error={errors.meetingTitle}>
                <input
                  type="text"
                  placeholder="Enter meeting title"
                  className={getInputClass("meetingTitle")}
                  value={form.meetingTitle}
                  onChange={(e) => handleChange("meetingTitle", e.target.value)}
                />
              </Field>
              <SelectField
                field="meetingType"
                label="Meeting Type"
                placeholder="Select meeting type"
                options={meetingTypes}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client" error={errors.client}>
                <input
                  type="text"
                  placeholder="Enter client name"
                  className={getInputClass("client")}
                  value={form.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                />
              </Field>
              <SelectField
                field="clientType"
                label="Client Type"
                placeholder="Select client type"
                options={clientTypes}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date & Time" error={errors.dateTime}>
                <input
                  type="date"
                  className={dateClass}
                  value={form.dateTime}
                  onChange={(e) => handleChange("dateTime", e.target.value)}
                />
              </Field>
              <SelectField
                field="project"
                label="Project"
                placeholder="Select project"
                options={projects}
              />
            </div>

            {/* Location */}
            <Field label="Location / Platform *" error={errors.location}>
              <input
                type="text"
                placeholder="e.g., Zoom, Google Meet, Conference Room A"
                className={getInputClass("location")}
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </Field>

            {/* Participants */}
            <Field label="Participants" error={errors.participants}>
              <input
                type="text"
                placeholder="Select/search participant"
                className={getInputClass("participants")}
                value={form.participants}
                onChange={(e) => handleChange("participants", e.target.value)}
              />
            </Field>

            {/* Agenda */}
            <Field label="Agenda / Notes">
              <textarea
                rows={4}
                placeholder="Enter meeting agenda or notes"
                className={`${inputBase} ${inputNormal} resize-none`}
                value={form.agenda}
                onChange={(e) => handleChange("agenda", e.target.value)}
              />
            </Field>
          </div>

          {/* Footer */}
          <div
            className={`flex flex-col-reverse sm:flex-row justify-end gap-3 px-5 sm:px-6 py-4 ${borderColor}`}
          >
            <button
              onClick={handleClose}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer
                ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-all cursor-pointer ${
                isDark
                  ? "bg-black text-[#00d2ff] border border-[#00d2ff]/30 hover:border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                  : "bg-[#F97316] text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
              }`}
            >
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingCreateModal;
