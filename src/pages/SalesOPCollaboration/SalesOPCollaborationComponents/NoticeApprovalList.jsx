import { useState, useContext } from "react";
import {
  Eye,
  Check,
  X,
  User,
  Calendar,
  FileText,
  ChevronDown,
} from "lucide-react";
import { ThemeContext } from "@/Componants/Themes/ThemeContext";

const NOTICES = [
  {
    id: 1,
    title: "Q1 Performance Review Schedule",
    description: "Performance reviews for Q1 will be conducted",
    author: "Sarah Johnson",
    initials: "SJ",
    department: "HR",
    createdDate: "Mar 4, 2026",
    status: "pending",
    content:
      "Performance reviews for Q1 will be conducted from March 15-30. Please prepare your self-assessment forms and submit them to your team leads by March 10.",
    attachments: [
      { name: "Q1_Review_Guidelines.pdf", size: "245 KB", type: "PDF" },
    ],
  },
  {
    id: 2,
    title: "New Project Kickoff Meeting",
    description: "Kickoff meeting for the Finance Dashboard",
    author: "Sarah Johnson",
    initials: "SJ",
    department: "Operations",
    createdDate: "Mar 4, 2026",
    status: "pending",
    content:
      "The kickoff meeting for the new Finance Dashboard project will be held on March 10 at 10:00 AM in Conference Room B. All stakeholders are required to attend.",
    attachments: [],
  },
  {
    id: 3,
    title: "Office Closure - Public Holiday",
    description: "Our office will be closed on March 15 for a public",
    author: "Sarah Johnson",
    initials: "SJ",
    department: "General",
    createdDate: "Mar 4, 2026",
    status: "pending",
    content:
      "Our office will be closed on March 15 for a public holiday. All employees are requested to plan their work accordingly. Emergency contacts are available on the intranet.",
    attachments: [],
  },
  {
    id: 4,
    title: "Annual Budget Review Approved",
    description: "The annual budget review has been approved",
    author: "Sarah Johnson",
    initials: "SJ",
    department: "Finance",
    createdDate: "Mar 3, 2026",
    status: "approved",
    content:
      "The annual budget review for FY2026 has been approved by the board.",
    attachments: [],
  },
  {
    id: 5,
    title: "Old Policy Update",
    description: "This policy update has been rejected",
    author: "Sarah Johnson",
    initials: "SJ",
    department: "HR",
    createdDate: "Mar 2, 2026",
    status: "rejected",
    content: "The proposed policy update did not meet compliance requirements.",
    attachments: [],
  },
];

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-orange-100 text-orange-600 border border-orange-200",
    approved: "bg-green-100 text-green-600 border border-green-200",
    rejected: "bg-red-100 text-red-500 border border-red-200",
  };
  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

/* ── Review Modal (2nd image) ── */
const ReviewModal = ({ notice, onClose, onApprove, onReject, isDark }) => {
  if (!notice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`w-full rounded-2xl shadow-2xl transition-colors
          ${isDark ? "bg-[#1a1d27] text-white" : "bg-white text-gray-900"}
        `}
        style={{ maxWidth: 520 }}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-base font-semibold">Review Notice</h2>
          <button
            onClick={onClose}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors
              ${isDark ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Title + meta */}
          <div>
            <h3 className="text-base font-semibold mb-2">{notice.title}</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <span
                className={`flex items-center gap-1.5 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                <User size={12} /> {notice.author}
              </span>
              <span
                className={`flex items-center gap-1.5 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                <Calendar size={12} /> {notice.createdDate}
              </span>
            </div>
          </div>

          {/* Dept + Status row */}
          <div
            className={`grid grid-cols-2 gap-3 rounded-lg p-3 ${isDark ? "bg-[#111827]" : "bg-gray-50"}`}
          >
            <div>
              <p
                className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Department
              </p>
              <p className="text-sm font-medium">{notice.department}</p>
            </div>
            <div>
              <p
                className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Status
              </p>
              <StatusBadge status={notice.status} />
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className={`text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Content
            </p>
            <div
              className={`rounded-lg p-3 text-sm leading-relaxed ${isDark ? "bg-[#111827] text-gray-300" : "bg-gray-50 text-gray-700"}`}
            >
              {notice.content}
            </div>
          </div>

          {/* Attachments */}
          {notice.attachments.length > 0 && (
            <div>
              <p
                className={`text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Attachments ({notice.attachments.length})
              </p>
              <div className="space-y-2">
                {notice.attachments.map((att, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 border
                      ${isDark ? "bg-[#111827] border-gray-700" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[9px] font-bold">
                        {att.type}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{att.name}</p>
                      <p
                        className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {att.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className={`h-px mx-6 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
        />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button
            onClick={() => {
              onReject(notice.id);
              onClose();
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors
              ${
                isDark
                  ? "border-gray-600 text-red-400 hover:bg-red-900/20"
                  : "border-gray-300 text-red-500 hover:bg-red-50"
              }`}
          >
            <X size={14} /> Reject
          </button>
          <button
            onClick={() => {
              onApprove(notice.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 active:scale-95 transition-all"
          >
            <Check size={14} /> Approve & Publish
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const NoticeApprovalList = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [notices, setNotices] = useState(NOTICES);
  const [activeFilter, setActiveFilter] = useState("All");
  const [reviewNotice, setReviewNotice] = useState(null);

  const filters = [
    { label: "All", count: notices.length },
    {
      label: "Pending",
      count: notices.filter((n) => n.status === "pending").length,
    },
    {
      label: "Approved",
      count: notices.filter((n) => n.status === "approved").length,
    },
    {
      label: "Rejected",
      count: notices.filter((n) => n.status === "rejected").length,
    },
  ];

  const filtered =
    activeFilter === "All"
      ? notices
      : notices.filter((n) => n.status === activeFilter.toLowerCase());

  const handleApprove = (id) =>
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "approved" } : n)),
    );

  const handleReject = (id) =>
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "rejected" } : n)),
    );

  const handleDelete = (id) =>
    setNotices((prev) => prev.filter((n) => n.id !== id));

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {filters.map((f) => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95
                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : isDark
                        ? "bg-[#1e2130] text-gray-300 border border-gray-700 hover:border-gray-500"
                        : "bg-black text-white "
                  }`}
              >
                {f.label} ({f.count})
              </button>
            );
          })}
        </div>

        {/* Table Card */}
        <div
          className={`rounded-xl overflow-hidden border shadow-sm
          ${isDark ? "bg-[#1a1d27] border-gray-700" : "bg-white border-gray-700 text-black"}`}
        >
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              {/* Head */}
              <thead>
                <tr className={isDark ? "bg-[#111827]" : "bg-black"}>
                  {[
                    "Title",
                    "Author",
                    "Department",
                    "Created Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-xs font-medium text-gray-400 tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-gray-400 text-sm"
                    >
                      No notices found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((notice, idx) => (
                    <tr
                      key={notice.id}
                      className={`border-t transition-colors
                        ${
                          isDark
                            ? "border-gray-700/60 hover:bg-[#111827]/50"
                            : "border-gray-600/40 bg-white "
                        }`}
                    >
                      {/* Title */}
                      <td className="px-5 py-3.5 max-w-[220px]">
                        <p className="text-sm font-semibold text-black leading-snug">
                          {notice.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                          {notice.description}
                        </p>
                      </td>

                      {/* Author */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {notice.initials}
                          </span>
                          <span className="text-sm text-gray-600">
                            {notice.author}
                          </span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-gray-600">
                          {notice.department}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar
                            size={13}
                            className="text-gray-600 flex-shrink-0"
                          />
                          {notice.createdDate}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge status={notice.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {/* Eye — open review modal */}
                          <button
                            onClick={() => setReviewNotice(notice)}
                            title="View details"
                            className="text-cyan-400 hover:text-cyan-600 transition-colors active:scale-90 cursor-pointer"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Approve */}
                          <button
                            onClick={() => handleApprove(notice.id)}
                            title="Approve"
                            className="text-green-400 hover:text-green-600 transition-colors active:scale-90 cursor-pointer"
                          >
                            <Check size={16} />
                          </button>

                          {/* Reject / Delete */}
                          <button
                            onClick={() => handleDelete(notice.id)}
                            title="Delete"
                            className="text-red-400 hover:text-red-600 transition-colors active:scale-90 cursor-pointer"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        notice={reviewNotice}
        onClose={() => setReviewNotice(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        isDark={isDark}
      />
    </div>
  );
};

export default NoticeApprovalList;
