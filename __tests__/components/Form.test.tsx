import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	render,
	screen,
	within,
	fireEvent,
	cleanup,
	waitFor,
} from "@testing-library/react";
import Form from "@/app/components/Form";

describe("<Form />", () => {
	beforeEach(() => {
		render(<Form />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Form />);
		expect(container).toMatchSnapshot();
	});

	it("should render the heading", () => {
		screen.getByRole("heading", { level: 2, name: /contact/i });
	});

	it("should render an exact number of inputs", () => {
		const form = within(screen.getByLabelText("contact-form"));
		expect(form).toBeDefined();
		expect(form.getByRole("textbox", { name: /name/i })).toBeDefined();
		expect(form.getByRole("textbox", { name: /email/i })).toBeDefined();
		expect(form.getByRole("textbox", { name: /phone/i })).toBeDefined();
		expect(form.getByRole("textbox", { name: /message/i })).toBeDefined();
		expect(form.getAllByRole("textbox").length).toBe(4);
	});

	it("should show a loading button on form submission", async () => {
		const form = within(screen.getByLabelText("contact-form"));
		const name = form.getByRole("textbox", { name: /name/i });
		const email = form.getByRole("textbox", { name: /email/i });
		const phone = form.getByRole("textbox", { name: /phone/i });
		const message = form.getByRole("textbox", { name: /message/i });

		fireEvent.change(name, { target: { value: "Alex Turner" } });
		fireEvent.change(email, { target: { value: "arctic@monkeys.com" } });
		fireEvent.change(phone, { target: { value: "66666666" } });
		fireEvent.change(message, {
			target: { value: "Hello World" },
		});

		fireEvent.submit(screen.getByLabelText("submit"));
		await screen.findByText(/loading/i);
	});

	it("should show a 'thank you' message after form submission", async () => {
		const form = within(screen.getByLabelText("contact-form"));
		const name = form.getByRole("textbox", { name: /name/i });
		const email = form.getByRole("textbox", { name: /email/i });
		const phone = form.getByRole("textbox", { name: /phone/i });
		const message = form.getByRole("textbox", { name: /message/i });

		fireEvent.change(name, { target: { value: "Alex Turner" } });
		fireEvent.change(email, { target: { value: "arctic@monkeys.com" } });
		fireEvent.change(phone, { target: { value: "66666666" } });
		fireEvent.change(message, {
			target: { value: "Hello World" },
		});

		fireEvent.submit(screen.getByLabelText("submit"));
		await waitFor(() => {
			screen.getByText(/thank you/i);
		}, {timeout: 2000});
	});
});
