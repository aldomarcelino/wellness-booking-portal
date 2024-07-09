import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckSession() {
  const router = useRouter();
  let response: any;

  useEffect(() => {
    const checkSession = async () => {
      try {
        response = await axios.get("/api/auth/check-session");
        if (response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log("User is not logged in");
      }
    };

    checkSession();
  }, []);

  return (response && response.user_role) || "";
}
