import React, { useState } from "react";

function InputCustom({ placeholder, field, setField, name }) {
	return (
		<input
			onChange={(event) => {
				setField({ ...field, [name]: event.target.value });
			}}
			value={field[name]}
			name={name}
			className="input-box pl-8 text-left font-sans font-normal md:w-1/2 w-full text-[#543F9D] my-2 focus:placeholder-transparent placeholder-[#543F9D] py-2 text-2xl bg-transparent outline-none rounded-3xl  border-2 border-[#543F9D]"
			placeholder={`${placeholder}`}
		></input>
	);
}

export default InputCustom;
