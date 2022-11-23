import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (id) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`http://localhost:5000/api/files/${id}`);
				setData(res.data);
			} catch (error) {
				setError(error);
			}
			setLoading(false);
		};
		fetchData();
	}, [id]);

	const refetchData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`http://localhost:5000/api/files/${id}`);
			setData(res.data);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};
	return { data, loading, error, refetchData };
};

export const useDownload = (id) => {
	const [link, setLink] = useState('');
	const [error, setError] = useState(false);

	useEffect(() => {
		const downloadData = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/files/download/${id}`,
				);
				setLink(res.data);
			} catch (error) {
				setError(error);
			}
		};
		downloadData();
	}, [id]);
	return { link, error };
};
