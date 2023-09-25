import Contact from "src/views/Contact";
import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import {
	render,
	screen,
	cleanup,
	fireEvent,
	getByLabelText,
} from "@testing-library/react";

describe("<Contact />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(<Contact />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Contact />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /contact/i }),
		).toBeDefined();
	});

	it("should render the form", () => {
		expect(screen.getByLabelText(/contact-form/i)).toBeDefined();
		expect(screen.getByLabelText(/name/i)).toBeDefined();
		expect(screen.getByLabelText(/email/i)).toBeDefined();
		expect(screen.getByLabelText(/phone/i)).toBeDefined();
		expect(screen.getByLabelText(/message/i)).toBeDefined();
		expect(screen.getByLabelText(/submit/i)).toBeDefined();
	});

	it("should render the submitted message", () => {
		// fireEvent.change(screen.getByLabelText(/name/i), {
		// 	target: { value: "Alex Turner" },
		// });
		// fireEvent.change(screen.getByLabelText(/email/i), {
		// 	target: { value: "alex@arcticmonkeys.com" },
		// });
		// fireEvent.change(screen.getByLabelText(/phone/i), {
		// 	target: { value: "666666666" },
		// });
		// fireEvent.change(screen.getByLabelText(/message/i), {
		// 	target: { value: "I'm going back to 505..." },
		// });
		// fireEvent.click(screen.getByLabelText(/submit/i));
	});

	it("should render <Spinner /> component on loading", () => {});
});
