import axios from 'axios';
import { useEffect, useState } from 'react';
import backIMG from '../img/download-Background.jpg';
import './Action.css';

const Action = () => {
	// let id = '8a664b8c-e6b5-4935-aae5-ac497b6b7ce4';
	// const [link, setLink] = useState('');

	const downloadData = () => {
		fetch(
			'http://localhost:5000/files/download/8a664b8c-e6b5-4935-aae5-ac497b6b7ce4',
		).then((response) => {
			response.blob().then((blob) => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				a.download = response.filename;
				a.click();
			});
			//window.location.href = response.url;
		});
	};

	// const downloadData = async () => {
	// 	try {
	// 		await axios.get(
	// 			`http://localhost:5000/files/download/8a664b8c-e6b5-4935-aae5-ac497b6b7ce4`,
	// 		);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div className='action'>
			<div className='download'>
				<img
					className='image'
					src={backIMG}
					alt='download'
				/>
			</div>
			<div className='container'>
				<h2>Your file is ready to download</h2>
				<p>Link expires in 24 hours</p>
				<div className='downloadInfo'>
					{/* <h4>{link?.filename}</h4>
					<small>{parseInt(link?.filename / 1000)} KB</small> */}
				</div>
				<button
					onClick={downloadData}
					className='btn'>
					Download
				</button>
			</div>
		</div>
	);
};

export default Action;
