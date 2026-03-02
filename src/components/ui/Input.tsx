import { useState } from "react";
import { HtmlElementType } from "./Form";

interface InputProps {
	name: string;
	type?: HtmlElementType;
	id?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	error?: boolean;
	onChange?: (value: string) => void;
}

export default function Input({
	name,
	type = HtmlElementType.TEXT,
	id,
	label,
	placeholder,
	required,
	readonly,
	error,
	onChange,
}: InputProps) {
	const isError = error ?? false;
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [valid, setValid] = useState(!isError);
	const style = !valid
		? "ring-red-400 focus:ring-red-500 focus-visible:ring-red-500"
		: "ring-slate-700 focus:ring-slate-600 focus-visible:ring-slate-600";

	function handleOnChange(value: string) {
		validate(value);
		if (!valid) {
			return;
		}

		if (onChange) {
			onChange(value);
		}
	}

	function validate(value: string) {
		if (required && !value.trim().length) {
			setErrorMessage(`Field required`);
			setValid(false);
		} else {
			setErrorMessage(undefined);
			setValid(true);
		}
	}

	return (
		<div className="relative z-0 mb-6 w-full group">
			<input
				className={`block py-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-800 focus:border-theme-blue focus:outline-none focus:ring-0 autofill:bg-transparent! peer ${style}`}
				name={name}
				type={type}
				id={`${id}-input`}
				placeholder=""
				required={required}
				readOnly={readonly}
				onChange={(e) => handleOnChange(e.target.value)}
			/>
			<label
				htmlFor={name}
				className="absolute top-0 -z-10 text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 origin-left peer-focus:left-0 peer-focus:text-theme-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{label ?? placeholder}
			</label>
			{errorMessage && (
				<div className="absolute -bottom-4 left-0 text-xs text-theme-orange">
					* {errorMessage}
				</div>
			)}
		</div>
	);
}
