import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

type AlbumDetails = {
    _id: string;
    name: string;
    images: [{_id: string, title: string, url: string}];
    createdAt: string;
    updatedAt: string;
}

function useAlbumDetails({ albumID }: { albumID: string | undefined }) {
    const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        axiosInstance.get(`/album/${albumID}`)
        .then((response) => {
            console.log(response?.data?.data?.album);
            setAlbumDetails(response.data?.data?.album);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [albumID])
    
    return {albumDetails, loading, error}
}

export default useAlbumDetails