import React, { useState, useEffect } from "react";
import { IconCircleDashedCheck, IconProgressX } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = ({ onSwitch }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [resume, setResume] = useState(null);
  const [newPassSet, setNewPassSet] = useState(false);
  const [errors, setErrors] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });
  const [errors2, setErrors2] = useState({
    username: false,
    firstName: false,
    lastName: false,
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 4) {
      setLinkedin(addMissingHTTPStoURL(linkedin));
      setGithub(addMissingHTTPStoURL(github));
      setLeetcode(addMissingHTTPStoURL(leetcode));
    }
  }, [step]);

  const handleSwitchToLogin = () => {
    navigate("/auth?mode=login", { replace: true });
  };

  const validateStep2 = () => {
    const newErrors = {
      username: username.trim() === "",
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
    };
    setErrors2(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const validatePassword = (password) => {
    const newErrors = {
      minValueValidation: password.length >= 8,
      numberValidation: /\d/.test(password),
      capitalLetterValidation: /[A-Z]/.test(password),
      specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
    };

    setErrors(newErrors);
    setNewPassSet(Object.values(newErrors).every((isValid) => isValid));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (newPassSet) setStep(step + 1);
    } else if (step === 2) {
      const isValid = validateStep2();
      if (isValid) setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const addMissingHTTPStoURL = (url) => {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      console.log("Adding https:// to", url);
      return `https://${url}`;
    }
    return url;
  };

  const handleCreateAccount = () => {
    setIsRegistering(true);
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append(
      "linkedin_url",
      linkedin ? addMissingHTTPStoURL(linkedin) : ""
    );
    formdata.append("github_url", github || "");
    formdata.append("leetcode_url", leetcode || "");
    formdata.append("city", "Pune");
    formdata.append("college", "India");
    // axios
    //   .post("http://127.0.0.1:8000/auth/users/", formdata)
    //   .then((res) => {
    //     //  console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .post("http://127.0.0.1:8000/auth/users/", {
        email: email,
        password: password,
        username: username,
        first_name: firstName,
        last_name: lastName,
        linkedin_url: linkedin || "",
        github_url: github || "",
        leetcode_url: leetcode || "",
        city: "Pune",
        college: "India",
      })
      .then((res) => {
        toast.success(
          "Account created successfully. Please log in with the account.",
          {
            duration: 6000,
          }
        );
        navigate("/auth?mode=login", { replace: true });
      })
      .catch((err) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const renderFormContent = () => {
    switch (step) {
      case 1: // Step 1: Email and Password
        return (
          <>
            <input
              className="px-3 py-1 rounded-xl border border-gray-300 w-full"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <input
                className="px-3 py-1 rounded-xl border border-gray-300 w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div className=" flex items-center gap-2">
                {newPassSet ? (
                  <IconCircleDashedCheck className="h-12 w-12 md:w-18 md:h-18 text-green-500" />
                ) : (
                  <IconProgressX className="h-12 w-12 md:w-18 md:h-18 text-red-500" />
                )}
                <p
                  className={`text-[0.6rem] ${
                    newPassSet ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Password must contain
                  <span
                    className={
                      errors.minValueValidation
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    at least 8 characters,
                  </span>
                  <span
                    className={
                      errors.capitalLetterValidation
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    at least one capital letter,
                  </span>{" "}
                  <span
                    className={
                      errors.numberValidation
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    one number,
                  </span>
                  and{" "}
                  <span
                    className={
                      errors.specialCharacterValidation
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    one special character.
                  </span>
                </p>
              </div>
            </div>

            <input
              className="px-3 py-1 rounded-xl border border-gray-300 w-full"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        );
      case 2: // Step 2: Username and Name
        return (
          <>
            <div>
              <input
                className="p-3 rounded-xl border border-gray-300 w-full"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors2((prev) => ({ ...prev, username: false }));
                }}
                required
              />
              {errors2.username && (
                <p className="text-red-500 text-xs mt-1">
                  Username is required
                </p>
              )}
            </div>
            <div>
              <input
                className="p-3 rounded-xl border border-gray-300 w-full"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors2((prev) => ({ ...prev, firstName: false }));
                }}
                required
              />
              {errors2.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  First Name is required
                </p>
              )}
            </div>
            <div>
              <input
                className="p-3 rounded-xl border border-gray-300 w-full"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors2((prev) => ({ ...prev, lastName: false }));
                }}
                required
              />
              {errors2.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  Last Name is required
                </p>
              )}
            </div>
            <div className="min-h-[0.45rem]" />
          </>
        );
      case 3: // Step 3: Social Media Links
        return (
          <>
            <input
              className="p-3 rounded-xl border border-gray-300 w-full"
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <input
              className="p-3 rounded-xl border border-gray-300 w-full"
              type="url"
              name="github"
              placeholder="GitHub Profile URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <input
              className="p-3 rounded-xl border border-gray-300 w-full"
              type="url"
              name="leetcode"
              placeholder="LeetCode Profile URL"
              value={leetcode}
              onChange={(e) => setLeetcode(e.target.value)}
            />
            <div className="min-h-[0.45rem]" />
          </>
        );
      case 4: // Step 4: Resume Upload
        return (
          <>
            <p className="text-sm text-gray-600"> Upload your resume (PDF)</p>
            <input
              className="p-3 rounded-xl border border-gray-300 w-full"
              type="file"
              accept="application/pdf"
              name="resume"
              onChange={(e) => setResume(e.target.files[0])}
            />
            <div className="min-h-[8.65rem]" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:w-1/2 px-6 md:px-12 min-h-[34rem]">
      <h2 className="font-bold text-3xl text-gray-800">Register</h2>
      <p className="text-sm mt-4 text-gray-600">
        Create your account in four steps below.
      </p>

      <div className="flex justify-center mt-6 gap-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              step === s ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <form className="flex flex-col gap-4 mt-6">
        {renderFormContent()}

        <div className="flex justify-between items-center mt-4">
          {step > 1 && !isRegistering && (
            <button
              type="button"
              className="py-2 px-5 bg-gray-100 border rounded-xl hover:bg-blue-600 hover:text-white duration-300"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              className={`py-2 px-5 rounded-xl ${
                (step === 1 && newPassSet) || step !== 1
                  ? "bg-blue-600 text-white hover:scale-105"
                  : "bg-gray-300 cursor-not-allowed"
              } duration-300`}
              onClick={handleNextStep}
              disabled={step === 1 && !newPassSet}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className={`py-2 px-3 rounded-xl bg-green-600 text-white ${
                isRegistering ? "" : "hover:scale-105"
              } duration-300 flex items-center justify-center`}
              onClick={handleCreateAccount}
            >
              {isRegistering && (
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              Create Account
            </button>
          )}
        </div>
      </form>

      <div className="mt-5 text-xs border-b border-gray-300 py-4">
        <a href="#" className="text-gray-600">
          Forgot your password?
        </a>
      </div>

      <div className="mt-3 text-xs flex justify-between items-center text-gray-600">
        <p>Already a user?</p>
        <button
          className="py-2 px-5 bg-gray-100 border rounded-xl hover:bg-purple-600 hover:text-white duration-300"
          onClick={handleSwitchToLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;
