import { useState } from "react";
import imgDots1 from "../assets/img/dots1.svg";
import imgDots2 from "../assets/img/dots2.svg";
import imgIconLinkedin from "../assets/img/icons/linkedin.png";
import imgTriangle from "../assets/img/triangle.svg";
import { sendEmail } from "../utils/api.service";
import { AppComponents } from "../utils/definitions";
import Form, { FormField, FormFieldType, HtmlElementType } from "./ui/Form";
import Header from "./ui/Header";
import Logo from "./ui/Logo";
import Section from "./ui/Section";
import Text from "./ui/Text";

export default function Contact() {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const formFields: FormField[] = [
		{
			field: FormFieldType.INPUT,
			name: "name",
			type: HtmlElementType.TEXT,
			placeholder: "Name",
			required: true,
			valid: true,
		},
		{
			field: FormFieldType.INPUT,
			name: "email",
			type: HtmlElementType.EMAIL,
			placeholder: "Email",
			required: true,
			valid: true,
		},
		{
			field: FormFieldType.TEXTAREA,
			name: "message",
			type: HtmlElementType.TEXT,
			placeholder: "Message",
			required: true,
			valid: true,
		},
	];

	async function handleSubmit(formData: FormData) {
		setLoading(true);
		setSuccess(false);
		setError(undefined);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const message = formData.get("message") as string;

		const result = await sendEmail(name, email, message);
		setLoading(false);

		if (!result.success) {
			setError(
				result.result.error || "An error occurred while sending the email.",
			);
			return;
		}
		setSuccess(true);
	}

	return (
		<Section
			id={AppComponents.contact}
			bgColor="bg-grid bg-no-repeat bg-bottom bg-cover"
			style="pb-40 !mb-0"
		>
			<div className="text-left">
				<div className="w-full">
					<Header message="Contact" />
					<div className="lg:grid lg:grid-cols-3 lg:gap-10 w-full">
						<div className="relative w-full">
							<Text content="Whether you have a question or a project idea, feel free to reach out. You can contact me throught contact form, via LinkedIn profile page or directly via email." />
							<h4 className="w-full my-6 text-lg">
								<a href="mailto:hello@maciejwasiak.com">
									hello@maciejwasiak.com
								</a>
							</h4>
							<div className="mt-6 lg:mb-0 mb-6">
								<a
									className="h-10 w-10 shadow-lg hover:shadow-xl font-normal items-center justify-center align-center outline-none"
									href="https://www.linkedin.com/in/maciejwasiak/"
									target="_blank"
									rel="noreferrer"
									title="Check my LinkedIn profile"
								>
									<img
										className="inline-block w-10 mb-1"
										src={imgIconLinkedin}
										alt="In"
									/>
								</a>
							</div>
							<div className="hidden md:block absolute bottom-0 left-0 w-full">
								<Logo />
							</div>
						</div>
						<div className="relative w-full lg:col-span-2">
							<img
								src={imgDots1}
								alt=""
								className="absolute -top-20 -right-10 w-40 h-auto drop-shadow-xl"
							/>

							<img
								src={imgDots2}
								alt=""
								className="absolute -bottom-10 -right-20 w-60 h-auto drop-shadow-xl"
							/>
							<img
								src={imgTriangle}
								alt=""
								className="absolute -bottom-32 right-40 lg:-bottom-52 lg:right-52 w-96 h-auto drop-shadow-xl"
							/>
							<div className="relative p-4 bg-theme-dark border border-gray-900 shadow-lg shadow-black rounded-lg sm:p-10">
								<Form
									className="block w-full"
									fields={formFields}
									onSubmit={handleSubmit}
									processing={loading}
									setError={setError}
								/>
								<div className="mt-4 text-sm ">
									{error && <p className="text-theme-orange">{error}</p>}
									{success && (
										<p className="text-theme-green">
											Thank you for your message. I will get back to you soon.
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
