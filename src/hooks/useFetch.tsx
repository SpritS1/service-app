import { useCallback, useEffect, useState } from 'react';

interface State<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

const useFetch = <T,>(url: string): State<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(url, { credentials: 'include' });
            const data = await response.json();

            setData(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
