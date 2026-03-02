import { FormEvent, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader";
import TextArea from "./TextArea";

export enum HtmlElementType {
	TEXT = "text",
	EMAIL = "email",
	PASSWORD = "password",
}

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
}

export interface FormField {
	field: FormFieldType;
	name: string;
	type: HtmlElementType;
	placeholder?: string;
	required?: boolean;
	valid?: boolean;
}

interface FormProps {
	className: string;
	fields: FormField[];
	onSubmit(data: FormData): void;
	processing: boolean;
	setError: (value: React.SetStateAction<string | undefined>) => void;
}

export default function Form({
	className,
	fields,
	onSubmit,
	processing,
	setError,
}: FormProps) {
	const [formFields, setFormFields] = useState(fields);

	function validate(data: FormData) {
		let errorMessage = "";
		let formValid = true;
		for (const field of formFields) {
			const value = data.get(field.name);
			let valid = true;

			if (field.required && (!value || !value.toString().length)) {
				valid = false;
				errorMessage += `Field ${field.name} is required. `;
			}
			if (!valid) {
				formValid = false;
				console.log(field);
				console.log(errorMessage);
			}
			updateField({ ...field, valid });
		}
		if (!formValid) {
			console.warn("Form invalid: " + errorMessage);
		}
		setError(errorMessage);

		return formValid;
	}

	function validateField(field: FormField) {
		return typeof field.valid !== "undefined" && !field.valid ? false : true;
	}

	function updateField(newField: FormField) {
		setFormFields(
			formFields.map((field) => {
				if (field.name === newField.name) {
					return { ...newField };
				}
				return field;
			}),
		);
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const valid = validate(data);
		if (!valid) {
			return;
		}
		onSubmit(data);
	}

	return (
		<form className={className} onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-4">
				{formFields &&
					formFields.map((field, idx) => {
						const valid = validateField(field);
						if (field.field === FormFieldType.INPUT) {
							return (
								<Input
									name={field.name}
									type={field.type}
									placeholder={field.placeholder}
									required={field.required ?? false}
									error={!valid}
									key={idx}
								/>
							);
						}
					})}
			</div>

			{formFields &&
				formFields.map((field, idx) => {
					const valid = validateField(field);
					if (field.field === FormFieldType.TEXTAREA) {
						return (
							<TextArea
								name={field.name}
								placeholder={field.placeholder}
								required={field.required ?? false}
								error={!valid}
								key={idx}
							/>
						);
					}
				})}

			{!processing && <Button label="Send Message" type="submit" />}
			{processing && <Loader label="Sending in progress" />}
		</form>
	);
}
