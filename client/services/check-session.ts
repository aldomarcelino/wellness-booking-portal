import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckSession() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/auth/check-session");

        setRole(response.data.user_role);
        if (response.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log("User is not logged in");
      }
    };

    checkSession();
  }, [router]);

  return { role };
}
