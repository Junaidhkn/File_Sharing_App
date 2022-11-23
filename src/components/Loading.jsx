import './loading.css';

const Loading = () => {
	return (
		<div className='wrapper'>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;
