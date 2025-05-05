//get all the albums of a specific user

import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

interface Album {
    _id: string;
    name: string;
    images: [{ _id: string; title: string; url: string }];
}

function useAlbums() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get("/album/")
        .then((response) => {
            setAlbums(response.data?.data?.albums);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return { albums, loading, error };
}

export default useAlbums