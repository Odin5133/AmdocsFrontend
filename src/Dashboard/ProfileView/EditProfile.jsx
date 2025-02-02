import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string(),
  // Other fields don't need validation
});

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/users/me",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: profileData,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Handle URL formatting
        const formattedValues = { ...values };
        ["linkedin_url", "github_url", "leetcode_url"].forEach((field) => {
          if (
            formattedValues[field] &&
            !formattedValues[field].startsWith("https://")
          ) {
            formattedValues[field] = `https://${formattedValues[field]}`;
          }
        });

        // Don't send password if it's empty
        if (!formattedValues.password) {
          delete formattedValues.password;
        }

        await axios.put(
          "http://127.0.0.1:8000/auth/users/me/",
          formattedValues,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          }
        );
        setSuccess("Profile updated successfully");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to update profile");
        setTimeout(() => setError(""), 3000);
      }
    },
  });

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md max-h-[90vh] overflow-y-scroll">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Edit Profile
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(profileData).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field === "password" ? "Enter new password" : ""}
                className={`mt-1 block w-full rounded-md border ${
                  formik.errors[field] ? "border-red-500" : "border-gray-300"
                } p-2`}
                value={formik.values[field] || ""}
                onChange={formik.handleChange}
                disabled={field === "password" ? false : formik.isSubmitting}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-sm">
                  {formik.errors[field]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
