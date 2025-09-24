"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import API from "@/lib/api";
=======
>>>>>>> completed

const withAuth = (WrappedComponent, allowedRoles) => {
  return function AuthenticatedComponent(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
<<<<<<< HEAD
      let isMounted = true;
      const checkAuth = async () => {
        try {
          // Validate via backend cookie session
          const { data } = await API.get("/auth/profile");
          const userRole = data?.role || data?.user?.role;
          if (!allowedRoles.includes(String(userRole).toLowerCase())) {
            router.push("/unauthorized");
            return;
          }
          if (isMounted) setLoading(false);
        } catch (err) {
          router.push("/unauthorized");
        }
      };
      checkAuth();
      return () => {
        isMounted = false;
      };
=======
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      let userRole = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          userRole = parsedUser.role;
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      if (!token || !allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
>>>>>>> completed
    }, []);

    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
