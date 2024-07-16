import  { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const useApiCall  = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const apiCall = async (path : string) => {
        setLoading(true);
        setError(false);

        try {
            const { data } = await axios.get(`${BASE_URL}/${path}`);
            setLoading(false);
            return data;
        } catch (err) {
            setError(true);
            setLoading(false);
            return null;
        }
    };

    return { apiCall, loading, error };
};
