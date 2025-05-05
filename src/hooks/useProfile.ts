import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

type Profile = {
    username: string, 
    email: string
}
function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get("/auth/profile")
        .then((response) => {
            setProfile(response.data?.data);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
    }, [])

    return { profile, error };
}

export default useProfile