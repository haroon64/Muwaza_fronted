import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user_id: number;
     // user id


  exp: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      // optional: check expiration
      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expired");
        setUser(null);
        return;
      }

      setUser(decoded);

    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }
  }, []);

  return user;
};
