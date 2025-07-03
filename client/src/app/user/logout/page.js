"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
// import { loadUserFromStorage } from '@/redux/slices/authSlice';
import { clearUser } from '@/redux/slices/authSlice';


const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
   

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await dispatch(logout()).unwrap(); // ✅ Ensure Redux state clears
                // dispatch(loadUserFromStorage());
                dispatch(clearUser());

                // Navigate after clearing everything
                setTimeout(() => router.push("/login"), 500);
            } catch (error) {
                console.error("Error during logout:", error);
            }
        };

        handleLogout();
    }, [dispatch, router]);

    return (
        <div className="flex items-center justify-center min-h-80 bg-gray-100">
            <h1 className="text-2xl font-semibold">Logging out...</h1>
        </div>
    );
};

export default Logout;
