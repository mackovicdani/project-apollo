import axios from "axios";
import { useEffect, useState } from "react";

export default function useUser() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/auth/user",
          config
        );

        if (data) {
          console.log(data.data.email);
          localStorage.setItem("username", data.data.name);
          localStorage.setItem("email", data.data.email);
          setUsername(localStorage.getItem("username"));
          setEmail(localStorage.getItem("email"));
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (!localStorage.getItem("username")) {
      fetchUser();
    }
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
  }, []);
  return { username, email };
}
