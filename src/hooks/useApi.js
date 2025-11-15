import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

// Create axios instance with interceptor for global 401 handling
const apiClient = axios.create({
    baseURL: API_URL,
});

// Set up response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAuthHeader = useCallback(() => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, []);

    const get = useCallback(async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(endpoint, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            // 401 errors are handled by interceptor, but we still need to handle other errors
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'An error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const post = useCallback(async (endpoint, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post(endpoint, data, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'An error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const put = useCallback(async (endpoint, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put(endpoint, data, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'An error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const del = useCallback(async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.delete(endpoint, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'An error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del
    };
};

export default useApi; 