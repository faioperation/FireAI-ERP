import { useState, useRef } from "react";

// ─────────────────────────────────────────────
//  Validation Rules
// ─────────────────────────────────────────────
const validators = {
  firstName: (v) =>
    !v.trim() ? "First name is required" : v.trim().length < 2 ? "Minimum 2 characters" : "",
  lastName: (v) =>
    !v.trim() ? "Last name is required" : v.trim().length < 2 ? "Minimum 2 characters" : "",
  email: (v) =>
    !v.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email" : "",
  phone: (v) =>
    v && !/^\+?[\d\s\-().]{7,15}$/.test(v) ? "Enter a valid phone number" : "",
  department: () => "",
  role: () => "",
  bio: (v) => (v.length > 300 ? `Bio too long (${v.length}/300)` : ""),
};

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "Operations",
  role: "System Administrator",
  bio: "",
};

function getInitials(first, last) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "AD";
}

function Field({ label, error, touched, children, required, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
        {required && <span className="text-orange-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !(touched && error) && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
      {touched && error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(error, touched, disabled = false) {
  const base = "w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 placeholder-slate-400";
  if (disabled) return `${base} bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed`;
  if (touched && error) return `${base} border-red-400 bg-red-50/60 text-slate-800 focus:ring-red-200 focus:border-red-400`;
  return `${base} bg-white border-slate-200 text-slate-800 hover:border-orange-300 focus:ring-orange-200 focus:border-orange-400`;
}

export default function ProfileSettings() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [touched, setTouched] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const fileInputRef = useRef(null);

  const errors = Object.fromEntries(
    Object.entries(validators).map(([k, fn]) => [k, fn(form[k] ?? "")])
  );

  const isFormValid = Object.values(errors).every((e) => !e);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please pick a JPG, PNG or GIF.");
    if (file.size > 2 * 1024 * 1024) return alert("Max file size is 2MB.");
    setAvatarPreview(URL.createObjectURL(file));
  }

  // ── REFACTORED SAVE HANDLER ──
  async function handleSave(e) {
    if (e) e.preventDefault();

    const allFieldsTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allFieldsTouched);

    if (!isFormValid) return;

    setSaveStatus("saving");

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));

      if (fileInputRef.current?.files[0]) {
        formData.append("avatar", fileInputRef.current.files[0]);
      }


      console.log("Form State Data:", form);


      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // ------------------------------------------------

      // Simulated API call
      await new Promise((r) => setTimeout(r, 1500));

      setSaveStatus("success");

      setTimeout(() => {
        setForm(INITIAL_FORM_STATE);
        setAvatarPreview(null);
        setTouched({});
        setSaveStatus("idle");
      }, 2000);

    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50/40 to-slate-50 flex items-start justify-center px-4 py-8 sm:py-12">
      {/* wrapping in form for keyboard support */}
      <form onSubmit={handleSave} className="w-full max-w-2xl space-y-4">

        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

          <div className="p-5 sm:p-8 space-y-6">
            {/* AVATAR SECTION */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-slate-100">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center overflow-hidden shadow">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-orange-500 select-none">
                      {getInitials(form.firstName, form.lastName)}
                    </span>
                  )}
                </div>
                <button
                  type="button" // Important: prevents form submit on click
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              <div className="text-center sm:text-left">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all"
                >
                  Change Photo
                </button>
                <p className="text-xs text-slate-400 mt-1.5">JPG, PNG or GIF · Max 2MB</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* NAME FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="First Name" error={errors.firstName} touched={touched.firstName} required>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="firstName"
                  className={inputCls(errors.firstName, touched.firstName)}
                />
              </Field>

              <Field label="Last Name" error={errors.lastName} touched={touched.lastName} required>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="lastName"
                  className={inputCls(errors.lastName, touched.lastName)}
                />
              </Field>
            </div>

            {/* EMAIL */}
            <Field label="Email Address" error={errors.email} touched={touched.email} required>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="email"
                  className={`${inputCls(errors.email, touched.email)} pl-10`}
                />
              </div>
            </Field>

            {/* PHONE */}
            <Field label="Phone Number" error={errors.phone} touched={touched.phone} hint="Optional · Country code included">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+880 1..."
                  className={`${inputCls(errors.phone, touched.phone)} pl-10`}
                />
              </div>
            </Field>

            {/* DEPT & ROLE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Department" hint="Admin managed">
                <input type="text" value={form.department} disabled className={inputCls("", false, true)} />
              </Field>
              <Field label="Role" hint="Admin assigned">
                <input type="text" value={form.role} disabled className={inputCls("", false, true)} />
              </Field>
            </div>

            {/* BIO */}
            <Field label="Bio" error={errors.bio} touched={touched.bio}>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us about yourself..."
                rows={4}
                className={`${inputCls(errors.bio, touched.bio)} resize-none leading-relaxed`}
              />
              <div className="flex justify-end">
                <span className={`text-xs tabular-nums ${form.bio.length > 280 ? "text-red-400" : "text-slate-400"}`}>
                  {form.bio.length} / 300
                </span>
              </div>
            </Field>

            {/* FOOTER */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="text-sm text-center sm:text-left min-h-[20px]">
                {saveStatus === "success" && (
                  <span className="text-emerald-600 font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved & Form Reset!
                  </span>
                )}
                {saveStatus === "error" && <span className="text-red-500 font-medium">Failed to save.</span>}
                {saveStatus === "idle" && !isFormValid && Object.values(touched).some(Boolean) && (
                  <span className="text-amber-500 text-xs">Please fix errors above.</span>
                )}
              </div>

              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className={`w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${saveStatus === "saving" ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-md"
                  }`}
              >
                {saveStatus === "saving" ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 pb-6">
          Fields marked <span className="text-orange-500">*</span> are required.
        </p>
      </form>
    </div>
  );
}