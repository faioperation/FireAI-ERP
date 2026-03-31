import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Password = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!passwords.current) {
      newErrors.current = "Current password is required";
    }

    if (passwords.new.length < 8) {
      newErrors.new = "Password should be at least 8 characters";
    }

    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Password updated successfully", passwords);
      alert("Password updated successfully!");
    }
  };

  const inputFields = [
    { label: "Current Password", name: "current", state: showPassword.current },
    { label: "New Password", name: "new", state: showPassword.new },
    {
      label: "Confirm New Password",
      name: "confirm",
      state: showPassword.confirm,
    },
  ];

  return (
    <div className="max-w-3xl p-4 rounded-2xl bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.state ? "text" : "password"}
                name={field.name}
                value={passwords[field.name]}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none transition-all
                  ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500"
                  } 
                  dark:text-white text-gray-900`}
              />
              <button
                type="button"
                onClick={() => toggleVisibility(field.name)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {field.state ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors[field.name] && (
              <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium rounded-lg transition-colors shadow-sm active:scale-95"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
