import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import backIMG from '../img/download-Background.jpg';
import './Action.css';

const Action = () => {
	const [data, setData] = useState();
	const params = useParams();
	const id = params.id;
	useEffect( () => {
		const fetchData = async ( id ) => {
			try {
				const res = await axios.get( `${process.env.REACT_APP_API_URI}/files/${id}` );
				setData( res.data );
			} catch ( error ) {
				console.log( error );
			}
		};

		fetchData( id );
	}, [id] );


	const downloadData = () => {
		fetch( `${process.env.REACT_APP_API_URI}/files/download/${id}` ).then( ( response ) => {
			response.blob().then( ( blob ) => {
				let url = window.URL.createObjectURL( blob );
				let a = document.createElement( 'a' );
				a.href = url;
				a.download = response.filename;
				a.click();
			} );
			// window.location.href = response.url;
		} );
	};

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
					<h4>{data?.filename}</h4>
					<small>{parseInt( data?.fileSize / 1000 )} KB</small>
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
