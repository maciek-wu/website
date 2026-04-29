import { useState } from "react";

interface TextAreaProps {
	name: string;
	id?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	error?: boolean;
}

export default function TextArea({
	name,
	label,
	placeholder = "Additional informations",
	required,
	readonly,
	error,
}: TextAreaProps) {
	const isError = error ?? false;
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [valid, setValid] = useState(!isError);
	const style = error
		? "ring-red-400 focus:ring-red-500 focus-visible:ring-red-500"
		: "ring-slate-700 focus:ring-slate-600 focus-visible:ring-slate-600";

	function handleOnChange(value: string) {
		validate(value);
		if (!valid) {
			return;
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
			<textarea
				className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-800 focus:border-theme-blue focus:outline-none focus:ring-0 peer ${style}`}
				name={name}
				rows={4}
				placeholder=""
				required={required}
				readOnly={readonly}
				onChange={(e) => handleOnChange(e.target.value)}
			></textarea>
			<label
				htmlFor={name}
				className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:left-0 peer-focus:text-theme-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
