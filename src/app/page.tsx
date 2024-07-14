'use client'
import { useApiCall } from "@/hooks/useApiCall";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const { apiCall, loading, error } = useApiCall();

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall('/posts');
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <p>Data fetched successfully.</p>}
    </div>
  );

}
