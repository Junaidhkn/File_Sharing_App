import './UploadFile.css';
import backgroundImg from '../img/img2.jpg';
import addSvg from '../img/add.svg';
import copy from '../img/copy.svg';
import { useState } from 'react';
import axios from 'axios';
const UploadFile = () => {
	const [id, setId] = useState( '' );
	const [name, setName] = useState( '' );
	const [size, setsize] = useState();
	const [show, setShow] = useState( false );
	const [emailto, setEmailTo] = useState( '' );
	const [emailfrom, setEmailFrom] = useState( '' );
	const [title, setTitle] = useState( '' );
	const [description, setDescription] = useState( '' );
	const [data, setData] = useState();
	const [loading, setLoading] = useState( false );
	const [error, setError] = useState( false );
	const [modalOpen, setModalOpen] = useState( false );

	const copyHandler = () => {
		var copyText = document.getElementById( 'myInput' );
		copyText.select();
		copyText.setSelectionRange( 0, 99999 ); /* For mobile devices */
		navigator.clipboard.writeText( copyText.value );
	};

	const fileUploadHandler = ( e ) => {
		const options = {
			method: 'POST',
			url: `${process.env.REACT_APP_API_URI}/api/files/`,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: { file: e.target.files[0] },
		};

		axios
			.request( options )
			.then( ( response ) => {
				setId( response.data.id );
				setName( response.data.name );
				setsize( response.data.size );
				setShow( true );
				fetchData( response.data.id );
			} )
			.catch( ( error ) => {
				console.error( error );
			} );
	};

	const fetchData = async ( id ) => {
		setLoading( true );
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URI}/files/${id}`,
			);
			setData( res.data.downloadLink );
		} catch ( error ) {
			setError( error );
		}
	};
	const formSubmitHandler = ( e ) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			url: `${process.env.REACT_APP_API_URI}/api/files/send`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				uuid: id,
				emailto,
				emailfrom,
				title,
				description,
			},
		};

		axios
			.request( options )
			.then( ( response ) => {
				// console.log(response.data);
				setModalOpen( true )
				setDescription( '' );
				setEmailFrom( '' );
				setEmailTo( '' );
				setTitle( '' );
				setLoading( false );
			} )
			.catch( ( error ) => {
				console.error( error );
			} );
	};

	const modalHandler = () => {
		setModalOpen( false )
	}
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
					{show && (
						<>
							<div className='file_data'>
								<p>{name}</p>
								<p>{Math.floor( size / 1000 )}KB</p>
							</div>
						</>
					)}
					{loading && (
						<div className='inputReadOnly'>
							<input
								type='text'
								value={data ? data : ''}
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
					)}
					<div className='form-container'>
						<form
							onSubmit={formSubmitHandler}
							method='post'>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='email'
									name='emailto'
									id='emailto'
									value={emailto}
									onChange={( e ) => {
										setEmailTo( e.target.value );
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='emailto'>
									Email to :
								</label>
							</div>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='email'
									name='emailfrom'
									id='emailfrom'
									value={emailfrom}
									onChange={( e ) => {
										setEmailFrom( e.target.value );
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='emailfrom'>
									Your Email :
								</label>
							</div>
							<div className='input-imp'>
								<input
									className='textField-input'
									type='text'
									name='title'
									id='title'
									value={title}
									onChange={( e ) => {
										setTitle( e.target.value );
									}}
									required
								/>
								<label
									className='textField-label'
									htmlFor='title'>
									Title :
								</label>
							</div>
							<div className='input-imp'>
								<textarea
									className='textField-input'
									type='text'
									name='description'
									id='description'
									value={description}
									onChange={( e ) => {
										setDescription( e.target.value );
									}}
									required></textarea>
								<label
									className='textField-label'
									htmlFor='description'>
									Message :
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
				<div className="text_background">
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
			{modalOpen && emailto && <div className="modal">
				<p className='modal_para'>Download link of the file has been sent to '{emailto}' via Email</p>
				<button onClick={modalHandler} className="modal_btn">OK!</button>
			</div>}
		</div>
	);
};

export default UploadFile;
