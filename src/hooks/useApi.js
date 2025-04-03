import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

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
            const response = await axios.get(`${API_URL}${endpoint}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const post = useCallback(async (endpoint, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}${endpoint}`, data, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const put = useCallback(async (endpoint, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_URL}${endpoint}`, data, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    const del = useCallback(async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`${API_URL}${endpoint}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
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