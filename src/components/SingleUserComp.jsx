import React from 'react';

const SingleUserComp = ({user, onClick}) => {

	const handleClick = () => {
		onClick(user.name)
	}

	return (
		<>
			<div
				className="z-0 select-none group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden shadow-md"
			>
				<img
					className="w-28 h-28 object-cover bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 duration-500"
					src={user.avatar} alt="avatar"/>
				<div className="group-hover:-translate-y-10 duration-500">
					<span
						style={{cursor: 'pointer'}}
						onClick={handleClick}
						className="text-2xl font-semibold">{user.name}</span>
				</div>
				<button className="btn btn-outline z-10 w-1/2 z-10">Send message</button>
			</div>
		</>
	);
};

export default SingleUserComp;