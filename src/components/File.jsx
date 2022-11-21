import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const File = (props) => {
	const [result, setResult] = useState();
	// useEffect(() => {
	// 	fetch('http://localhost:5000/files/e3c994cd-9b15-4a02-8aa8-a1f121f30609')
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setResult(data);
	// 		});
	// }, []);
	return (
		<>
			{/* <p>{result?.filename}</p>
			<p>{Math.floor(result?.fileSize / 1000)} KB</p>
			<p>{result?.downloadLink}</p> */}
			<p className='fileName'>{props.name}</p>
			<p className='fileSize'>{props.size}</p>
			<p></p>
		</>
	);
};

export default File;
