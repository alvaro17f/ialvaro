import { cleanup, render, screen } from "@testing-library/react";
import { Testimonials } from "src/views/Testimonials";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Testimonials />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Testimonials />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Testimonials />);
		expect(container).toMatchSnapshot();
	});

	it("should render all testimonial quotes", () => {
		expect(screen.getByText(/exceptional technical depth/i)).toBeDefined();
		expect(screen.getByText(/most reliable developers/i)).toBeDefined();
		expect(screen.getByText(/clean code/i)).toBeDefined();
	});

	it("should render all names", () => {
		expect(screen.getByText(/María Fernández/i)).toBeDefined();
		expect(screen.getByText(/Carlos Ruíz/i)).toBeDefined();
		expect(screen.getByText(/Elena Torres/i)).toBeDefined();
	});

	it("should render avatars", () => {
		const avatars = screen.getAllByRole("img");
		expect(avatars.length).toBeGreaterThanOrEqual(3);
	});
});
