import './UploadFile.css';
import backgroundImg from '../img/img2.jpg';
import addSvg from '../img/add.svg';
import copy from '../img/copy.svg';
import { useState } from 'react';
import File from './File';
import Axios from 'axios';

const UploadFile = () => {
	const [uFiles, setUFiles] = useState({});
	const [emailTo, setEmailTo] = useState('');
	const [emailFrom, setEmailFrom] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const copyHandler = () => {
		var copyText = document.getElementById('myInput');
		copyText.select();
		copyText.setSelectionRange(0, 99999); /* For mobile devices */
		navigator.clipboard.writeText(copyText.value);
	};

	let formData = new FormData();

	const fileUploadHandler = (e) => {
		// const file = e.target.files[0];
		// console.log(file);
		// const options = {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data',
		// 	},
		// };
		// options.body = formData;
		// console.log(formData);
		// fetch('http://localhost:5000/api/files/', options)
		// 	.then((response) => response.json())
		// 	.then((response) => console.log(response))
		// 	.catch((err) => console.error(err));
		// // .then((response) => response.json())
		const form = new FormData();
		form.append('file', e.target.files[0]);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type':
					'multipart/form-data; boundary=---011000010111000001101001',
			},
		};

		options.body = form;

		fetch('http://localhost:5000/api/files/', options)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
		// console.log(e.target.files[0]);
		// console.log(e.target.value);
		// console.log(e.target.files[0].name);
		// console.log(e);
		// formData.append('file', e.target.files[0]);
		// formData.append('path', e.target.value);
		// formData.append('name', e.target.files[0].name);
		// fetch('http://localhost:5000/api/files/', {
		// 	method: 'POST',
		// 	body: formData,
		// })
		// 	.then((response) => response.json())
		// 	.then((response) => console.log(response))
		// 	.catch((err) => console.error(err));
	};
	// setDescription('');
	// setEmailFrom('');
	// setEmailTo('');
	// setTitle('');
	const formSubmitHandler = (e) => {
		e.preventDefault();
		const emailData = {
			uuid: 'e3c994cd-9b15-4a02-8aa8-a1f121f30609',
			emailTo,
			emailFrom,
			title,
			description,
		};

		fetch('http://localhost:5000/api/files/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(emailData),
		}).then(() => {
			console.log('Request sent!!');
			setDescription('');
			setEmailFrom('');
			setEmailTo('');
			setTitle('');
		});
	};

	return (
		<div className='main-section'>
			<div className='input-container-main'>
				<div className='input-container'>
					<div className='input'>
						<form
							method='post'
							encType='multipart/form-data'>
							<input
								id='file'
								type='file'
								name='file'
								onChange={fileUploadHandler}
								accept='*/*'
								className='custom-uploader'
							/>
						</form>

						<div className='upload-img'>
							<img
								src={addSvg}
								alt='upload-here'
							/>
						</div>
						<div className='upload-right'>
							<h3 className='title'>Upload File</h3>
							<button className='window-open-btn'>Or select a file</button>
						</div>
					</div>
					<hr />
					<div className='file_data'>
						<File file={uFiles} />
					</div>
					<div className='inputReadOnly'>
						<input
							type='text'
							value={'https://www.google.com'}
							id='myInput'
							className='read-form-control'
							placeholder='Download Link'
							readOnly
						/>
						<button
							className='copy-link'
							onClick={copyHandler}>
							<img
								className='copy-link-img'
								src={copy}
								alt='copy-link'
							/>
						</button>
					</div>
					<div className='form-container'>
						<form
							onSubmit={formSubmitHandler}
							method='post'>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='email'
									name='emailTo'
									id='emailTo'
									value={emailTo}
									onChange={(e) => {
										setEmailTo(e.target.value);
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='emailTo'>
									Email to
								</label>
							</div>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='email'
									name='email'
									id='email'
									value={emailFrom}
									onChange={(e) => {
										setEmailFrom(e.target.value);
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='email'>
									Your Email
								</label>
							</div>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='text'
									name='title'
									id='title'
									value={title}
									onChange={(e) => {
										setTitle(e.target.value);
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='title'>
									Title
								</label>
							</div>
							<div className='input-imp'>
								<textarea
									className='textField-input'
									type='text'
									name='message'
									id='message'
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
									required></textarea>
								<label
									className='textField-label'
									htmlFor='message'>
									Message
								</label>
							</div>
							<div className='action-trigger'>
								<button
									type='submit'
									className='action-button'>
									Transfer
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className='background'>
				<img
					src={backgroundImg}
					className='background-img'
					alt='background-img'
				/>
				<h1 className='tagline'>
					Transfer ideas.<span className='sp'>Transform the world.</span>
				</h1>
				<h2 className='tagline-2'>Share files upto 100MB with anyone.</h2>
				<p className='tagline-3'>
					<span className='asterisk'>*</span>
					We don't store any file or information on our servers.
				</p>
			</div>
		</div>
	);
};

export default UploadFile;
