"use client";
 
import { useState } from "react";
import bcrypt from "bcryptjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [genOtpHash, setGenOtpHash] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isDisabled = !(
    credentials.username &&
    credentials.email &&
    password &&
    confirmPassword &&
    otpVerified
  );

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const generateOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = await bcrypt.hash(otp, 10);
    setGenOtpHash(hash);
    return { otp, hash };
  };

  const handleEmailVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(credentials.email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }

    const { otp } = await generateOtp();

    try {
      const res = await axios.post("/api/sendmail", {
        email: credentials.email,
        otp: otp,
      });

      if (res.status === 200) {
        toast.success("OTP sent successfully");
        setIsOtpSent(true);
      } else {
        throw new Error(res.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
      setIsOtpSent(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    const isMatch = await bcrypt.compare(otp, genOtpHash);
    if (isMatch) {
      toast.success("OTP verified successfully");
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username: credentials.username,
        email: credentials.email,
        password: password,
      });

      if (res.status === 201) {
        toast.success("Registration successful");
        // Redirect to home page
        router.push("/home");
      } else {
        throw new Error(res.data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register");
    }
  };

  return (
    <div className="auth_container">
      <h1>Register</h1>
      <Toaster />
      <div>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleRegister} className="auth_form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
            required
          />

          <label htmlFor="email">Email</label>
          <div className="email_verification">
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email}
              required
            />
            <button
              type="button"
              onClick={handleEmailVerify}
              disabled={loading}
            >
              {loading ? "Sending..." : "Verify"}
            </button>
          </div>

          {isOtpSent && (
            <div className="otp_verification">
              <label htmlFor="otp">OTP</label>
              <input
                type="number"
                id="otp"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
              <button type="button" onClick={handleOtpVerify}>
                Verify OTP
              </button>
            </div>
          )}

          {otpVerified && (
            <div className="password_inputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
          )}

          <button type="submit" disabled={isDisabled} className="submit_button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
