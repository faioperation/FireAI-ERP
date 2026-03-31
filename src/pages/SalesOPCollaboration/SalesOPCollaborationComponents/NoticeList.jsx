import React, { useState } from "react";

const noticesData = [
  {
    id: 1,
    title: "Q1 Performance Review Schedule",
    description:
      "Performance reviews for Q1 will be conducted from March 15-30. Please prepare your self-assessment forms and submit them to your team leads by March 10.",
    tag: "HR",
    author: "md",
    date: "Feb 27, 2026",
    isPinned: true,
    attachments: ["Q1_Review_Guidelines.pdf", "Self_Assessment_Form.docx"],
  },
  {
    id: 2,
    title: "System Maintenance - March 5",
    description:
      "Our development servers will undergo scheduled maintenance on March 5 from 2 AM to 6 AM. All services will be temporarily unavailable during this time.",
    tag: "IT",
    author: "md",
    date: "Feb 26, 2026",
    isPinned: true,
    attachments: ["Maintenance_Schedule.pdf"],
  },
  {
    id: 3,
    title: "New Project Management Tool",
    description:
      "We are introducing a new project management tool starting next week. Training sessions will be held on March 3-4. Please register for your preferred time slot.",
    tag: "Operations",
    author: "md",
    date: "Feb 25, 2026",
    isPinned: false,
    attachments: [],
  },
];

const NoticeList = () => {
  const [darkMode, setDarkMode] = useState(false);

  const pinnedNotices = noticesData.filter((n) => n.isPinned);
  const allNotices = noticesData.filter((n) => !n.isPinned);

  return (
    <div>
      <div className="min-h-screen transition-colors duration-300 font-sans">
        <div className="space-y-10">
          {/* Pinned Notices Section */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-300">
              <span className="text-orange-500 font-bold text-xl">📌</span>
              <h2 className="text-lg font-bold">Pinned Notices</h2>
            </div>

            <div className="space-y-4">
              {pinnedNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </section>

          {/* All Notices Section */}
          <section>
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
              All Notices
            </h2>
            <div className="space-y-4">
              {allNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const NoticeCard = ({ notice }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        {notice.isPinned && <span className="text-slate-400 mt-1">📌</span>}
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          {notice.title}
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {notice.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs border-t border-slate-100 dark:border-slate-800 pt-4 mb-4">
        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded font-bold uppercase tracking-wider">
          {notice.tag}
        </span>
        <span className="text-slate-500 dark:text-slate-500">
          Author <span className="font-semibold">{notice.author}</span>
        </span>
        <span className="text-slate-400 dark:text-slate-600">
          {notice.date}
        </span>
      </div>

      {/* Attachments Section */}
      {notice.attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300">
            Attached Files:
          </p>
          {notice.attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer transition"
            >
              <span className="text-orange-500 text-sm">📄</span>
              <span className="underline">{file}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeList;
