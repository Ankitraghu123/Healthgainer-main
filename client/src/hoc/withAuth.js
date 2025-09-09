"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

const withAuth = (WrappedComponent, allowedRoles) => {
  return function AuthenticatedComponent(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
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
    }, []);

    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
