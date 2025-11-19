// app/auth/callback/page.tsx  (Next.js 14+ app router)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Get token from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (token) {
      // Save JWT in localStorage
      localStorage.setItem("token", token);

      // Optional: redirect to home or dashboard
      router.replace("/"); // change to your protected page
    } else if (error) {
      console.error("OAuth Error:", error);
      // Optional: redirect to login page or show error
      router.replace(`/login?error=${encodeURIComponent(error)}`);
    }
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Processing authentication...</h2>
      <p>Please wait, you will be redirected shortly.</p>
    </div>
  );
}
