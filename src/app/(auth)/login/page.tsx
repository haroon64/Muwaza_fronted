"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const handleGoogleSignup = () => {
     window.location.href = "http://127.0.0.1:3300/api/v1/auth/google_oauth2";
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const router = useRouter(); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email/Phone and password are required");
      setLoading(false);
      return;
    }

   try {
  const response = await axios.post(
    "http://127.0.0.1:3300/api/v1/signin",
    {user:formData}
  );

  console.log("Response data:", response.data);

  if (response.data.status.code === 200) {
    console.log(response.data)
    const token = response.data.data.token;
    console.log("Token:", token);

    if (!token) {
      setError("Token is missing from response");
      return;
    }

    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", formData.role);

    router.push("/"); // navigate to homepage/dashboard
  } else {
    setError(response.data.status.message || "Login failed");
  }
} catch (err: any) {
  setError(err.response?.data?.status?.message || "Something went wrong");
  console.error("Login error:", err);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl text-black font-semibold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email or phone number"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
            <button
          onClick={handleGoogleSignup}
          className="mt-4 w-full flex items-center text-black justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        </form>
      </div>
    </div>
  );
}
