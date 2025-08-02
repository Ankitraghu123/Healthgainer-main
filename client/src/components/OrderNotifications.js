import { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";

const OrderNotifications = () => {
    const [newOrders, setNewOrders] = useState([]);
    const eventSourceRef = useRef(null); // 👈 Store reference

    useEffect(() => {
        if (!eventSourceRef.current) {
          eventSourceRef.current = new EventSource("https://healthgainer-main.onrender.com/api/v1/orders/notifications");

          eventSourceRef.current.onmessage = (event) => {
            console.log("🎯 SSE Event Received:", event.data);

            if (event.data !== "{}") { // ❌ Ignore empty keep-alive messages
              const newOrder = JSON.parse(event.data);
              setNewOrders((prev) => [...prev, newOrder]);
              alert("🎉 New Order Arrived!");
            }
          };

          eventSourceRef.current.onerror = (error) => {
            console.error("❌ SSE Connection Error:", error);
          };
        }

        return () => {
          console.log("Closing SSE Connection...");
          eventSourceRef.current?.close();
          eventSourceRef.current = null;
        };
      }, []);


    return <div>

        <button className="p-1 rounded-full hover:bg-gray-100 relative">
            <FaBell className="text-gray-500 h-6 w-6" />
            <span className="absolute top-0 right-0 left-4 h-5 w-5 p-1 text-white rounded-full bg-red-500 flex items-center justify-center">{newOrders.length > 0 ? <p>{newOrders.length }</p> : "0"}</span>
        </button>
    </div>;
};

export default OrderNotifications;
