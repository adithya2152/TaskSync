"use client"; 
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";

export default function Register() {
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

 
  const isDisabled =!username ||!password;
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", {
        username: username,
        email: email,
        password: password,
      });

      if (res.status === 200) {
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
      <h1>Login</h1>
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
               setUsername(e.target.value)
            }
            value={username}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

         
  
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
            </div>

          <button type="submit" disabled={isDisabled} className="submit_button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
