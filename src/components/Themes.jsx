import React, {useEffect, useState} from 'react';

const Themes = () => {

	return (
		<>
			<div className="dropdown dropdown-end">
				<div tabIndex={0} role="button" className="btn btn-outline shadow-md">
					Theme
					<svg
						width="12px"
						height="12px"
						className="inline-block h-2 w-2 fill-current opacity-60"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048">
						<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
					</svg>
				</div>
				<ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl mt-1 space-y-1 shadow-md">
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:shadow-md"
							aria-label="Default"
							value="default"/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:shadow-md"
							aria-label="Retro"
							value="retro"/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:shadow-md"
							aria-label="Cyberpunk"
							value="cyberpunk"/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:shadow-md"
							aria-label="Valentine"
							value="valentine"/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start hover:shadow-md"
							aria-label="Aqua"
							value="aqua"/>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Themes;