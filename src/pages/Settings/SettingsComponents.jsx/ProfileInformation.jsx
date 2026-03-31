import { useState, useRef, useEffect } from "react";

const SunIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const initialForm = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@company.com",
  phone: "+1 (555) 000-0000",
  department: "Operations",
  role: "System Administrator",
  bio: "",
};

export default function ProfileInformation() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [touched, setTouched] = useState({});
  const fileRef = useRef();

  const isDark = dark;

  // Validate single field
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        if (value.trim().length < 2) return "At least 2 characters.";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required.";
        if (value.trim().length < 2) return "At least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^[\d\s\+\-\(\)]{7,20}$/.test(value)) return "Enter a valid phone number.";
        return "";
      case "department":
        if (!value.trim()) return "Department is required.";
        return "";
      case "role":
        if (!value.trim()) return "Role is required.";
        return "";
      case "bio":
        if (value.length > 300) return "Bio must be under 300 characters.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      showToast("Only JPG, PNG or GIF allowed.", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("File size must be under 2MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
    showToast("Photo updated successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Save handler with mock API
  const handleSave = async () => {
    const allTouched = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const newErrors = validateAll();
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      showToast("Please fix the errors before saving.", "error");
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      // --- Mock API call (replace with your real endpoint) ---
      // const res = await fetch("/api/profile", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...form, photo }),
      // });
      // if (!res.ok) throw new Error("Server error");
      // const data = await res.json();

      // Simulated API delay
      await new Promise((r) => setTimeout(r, 1400));

      // Save to localStorage as persistence demo
      localStorage.setItem("profileData", JSON.stringify({ ...form, photo }));

      setSaveSuccess(true);
      showToast("Profile saved successfully! ✓", "success");
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      showToast("Failed to save. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm({
        firstName: parsed.firstName || initialForm.firstName,
        lastName: parsed.lastName || initialForm.lastName,
        email: parsed.email || initialForm.email,
        phone: parsed.phone || initialForm.phone,
        department: parsed.department || initialForm.department,
        role: parsed.role || initialForm.role,
        bio: parsed.bio || initialForm.bio,
      });
      if (parsed.photo) setPhoto(parsed.photo);
    }
  }, []);

  const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase();

  // Styles
  const bg = isDark ? "#0F172A" : "#F8FAFC";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const border = isDark ? "#334155" : "#E2E8F0";
  const label = isDark ? "#94A3B8" : "#64748B";
  const inputBg = isDark ? "#0F172A" : "#FFFFFF";
  const inputText = isDark ? "#F1F5F9" : "#1E293B";
  const inputBorder = isDark ? "#334155" : "#CBD5E1";
  const disabledBg = isDark ? "#1a2535" : "#F1F5F9";
  const headingColor = isDark ? "#F1F5F9" : "#1E293B";

  const inputStyle = (name, disabled = false) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1.5px solid ${errors[name] && touched[name] ? "#EF4444" : touched[name] && !errors[name] ? "#22C55E" : inputBorder}`,
    backgroundColor: disabled ? disabledBg : inputBg,
    color: disabled ? (isDark ? "#64748B" : "#94A3B8") : inputText,
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    cursor: disabled ? "not-allowed" : "text",
  });

  const iconInputWrap = {
    position: "relative",
    width: "100%",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: isDark ? "#64748B" : "#94A3B8",
    pointerEvents: "none",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bg, transition: "background 0.3s", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", zIndex: 9999,
          padding: "12px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 600,
          backgroundColor: toast.type === "success" ? "#22C55E" : "#EF4444",
          color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          animation: "slideIn 0.3s ease",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          {toast.type === "success" ? "✓" : "⚠"} {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <div style={{
        backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
        borderBottom: `1px solid ${border}`,
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: isDark ? "0 1px 12px rgba(0,0,0,0.3)" : "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: headingColor, letterSpacing: "-0.3px" }}>
          ⚙️ Account Settings
        </span>
        <button
          onClick={() => setDark(!dark)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 16px", borderRadius: "999px",
            border: `1.5px solid ${border}`,
            backgroundColor: isDark ? "#0F172A" : "#F1F5F9",
            color: isDark ? "#CBD5E1" : "#475569",
            cursor: "pointer", fontSize: "13px", fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
          {isDark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Page body */}
      <div style={{ maxWidth: "680px", margin: "32px auto", padding: "0 16px 60px" }}>

        {/* Card */}
        <div style={{
          backgroundColor: cardBg,
          borderRadius: "20px",
          border: `1px solid ${border}`,
          boxShadow: isDark ? "0 4px 32px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}>

          {/* Card header strip */}
          <div style={{
            background: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
            padding: "20px 28px 16px",
          }}>
            <h2 style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.3px" }}>
              Profile Information
            </h2>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              Manage your personal details and preferences
            </p>
          </div>

          <div style={{ padding: "28px" }}>

            {/* Avatar Section */}
            <div style={{
              display: "flex", alignItems: "center", gap: "20px",
              paddingBottom: "24px", marginBottom: "24px",
              borderBottom: `1px solid ${border}`,
              flexWrap: "wrap",
            }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  backgroundColor: "#F97316",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", fontWeight: 700, color: "#fff",
                  overflow: "hidden",
                  border: "3px solid #FB923C",
                  boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
                }}>
                  {photo ? (
                    <img src={photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : initials}
                </div>
                {/* Small camera overlay */}
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: "24px", height: "24px", borderRadius: "50%",
                    backgroundColor: "#F97316", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px solid " + cardBg,
                  }}
                >
                  <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4" fill="none" stroke="white" strokeWidth="2"/></svg>
                </div>
              </div>

              <div>
                <button
                  onClick={() => fileRef.current.click()}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    padding: "9px 18px", borderRadius: "10px",
                    backgroundColor: "#F97316", color: "#fff",
                    border: "none", cursor: "pointer",
                    fontSize: "13px", fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
                    transition: "all 0.2s",
                  }}
                >
                  <CameraIcon /> Change Photo
                </button>
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: label }}>
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* First + Last Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { name: "firstName", label: "First Name", placeholder: "First name" },
                  { name: "lastName", label: "Last Name", placeholder: "Last name" },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                      {f.label} <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={f.placeholder}
                      style={inputStyle(f.name)}
                    />
                    {touched[f.name] && errors[f.name] && (
                      <p style={{ margin: "5px 0 0", fontSize: "11.5px", color: "#EF4444" }}>⚠ {errors[f.name]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                  Email Address <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <div style={iconInputWrap}>
                  <span style={iconStyle}><MailIcon /></span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    style={{ ...inputStyle("email"), paddingLeft: "38px" }}
                  />
                </div>
                {touched.email && errors.email && (
                  <p style={{ margin: "5px 0 0", fontSize: "11.5px", color: "#EF4444" }}>⚠ {errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                  Phone Number <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <div style={iconInputWrap}>
                  <span style={iconStyle}><PhoneIcon /></span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+1 (555) 000-0000"
                    style={{ ...inputStyle("phone"), paddingLeft: "38px" }}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p style={{ margin: "5px 0 0", fontSize: "11.5px", color: "#EF4444" }}>⚠ {errors.phone}</p>
                )}
              </div>

              {/* Department (disabled) */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                  Department
                  <span style={{ marginLeft: "8px", fontSize: "10.5px", backgroundColor: isDark ? "#334155" : "#E2E8F0", color: label, padding: "2px 7px", borderRadius: "99px", fontWeight: 500 }}>
                    Read only
                  </span>
                </label>
                <input
                  name="department"
                  value={form.department}
                  disabled
                  style={inputStyle("department", true)}
                />
              </div>

              {/* Role (disabled) */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                  Role
                  <span style={{ marginLeft: "8px", fontSize: "10.5px", backgroundColor: isDark ? "#334155" : "#E2E8F0", color: label, padding: "2px 7px", borderRadius: "99px", fontWeight: 500 }}>
                    Read only
                  </span>
                </label>
                <input
                  name="role"
                  value={form.role}
                  disabled
                  style={inputStyle("role", true)}
                />
              </div>

              {/* Bio */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: label, marginBottom: "6px" }}>
                  Bio
                  <span style={{ float: "right", fontSize: "11px", color: form.bio.length > 280 ? "#EF4444" : label }}>
                    {form.bio.length}/300
                  </span>
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Write a short bio about yourself..."
                  rows={4}
                  style={{
                    ...inputStyle("bio"),
                    resize: "vertical",
                    minHeight: "100px",
                    fontFamily: "inherit",
                    lineHeight: "1.6",
                  }}
                />
                {touched.bio && errors.bio && (
                  <p style={{ margin: "5px 0 0", fontSize: "11.5px", color: "#EF4444" }}>⚠ {errors.bio}</p>
                )}
              </div>

              {/* Save Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "11px 32px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: saveSuccess ? "#22C55E" : saving ? "#FB923C" : "#F97316",
                    color: "#fff",
                    fontSize: "14px", fontWeight: 700,
                    cursor: saving ? "not-allowed" : "pointer",
                    boxShadow: `0 6px 20px rgba(249,115,22,0.4)`,
                    transition: "all 0.3s",
                    minWidth: "130px",
                    justifyContent: "center",
                  }}
                >
                  {saving ? (
                    <>
                      <span style={{
                        width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)",
                        borderTop: "2px solid #fff", borderRadius: "50%",
                        display: "inline-block", animation: "spin 0.8s linear infinite",
                      }} />
                      Saving...
                    </>
                  ) : saveSuccess ? (
                    <><CheckIcon /> Saved!</>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Info note */}
        <p style={{ textAlign: "center", fontSize: "12px", color: label, marginTop: "20px" }}>
          🔒 Your information is encrypted and stored securely.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform: translateX(0); } }
        input:focus, textarea:focus { box-shadow: 0 0 0 3px rgba(249,115,22,0.18) !important; border-color: #F97316 !important; }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        @media (max-width: 480px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}