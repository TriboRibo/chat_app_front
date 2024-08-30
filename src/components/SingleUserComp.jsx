import React from 'react';

const SingleUserComp = ({user, onClick}) => {

	const handleClick = () => {
		onClick(user.name)
	}

	return (
		<>
			<div
				className="select-none group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
				<img
					className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
					src={user.avatar} alt="avatar"/>
				<div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
					<span
						style={{cursor: 'pointer'}}
						onClick={handleClick}
						className="text-2xl font-semibold">{user.name}</span>
					<p>Some text or title</p>
				</div>
				<button className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500">Send message</button>
			</div>
		</>
	);
};

export default SingleUserComp;