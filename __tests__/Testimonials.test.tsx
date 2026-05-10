import { act, cleanup, render, screen } from "@testing-library/react";
import { Testimonials } from "src/views/Testimonials";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Testimonials />", () => {
	let observerCallback: (entries: { isIntersecting: boolean }[]) => void;

	beforeEach(() => {
		window.IntersectionObserver = class {
			observe = vi.fn();
			unobserve = vi.fn();
			disconnect = vi.fn();
			constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
				observerCallback = cb;
			}
		} as unknown as typeof window.IntersectionObserver;
	});
	afterEach(cleanup);

	it("should render all testimonial quotes", () => {
		render(<Testimonials />);
		expect(screen.getByText(/exceptional technical depth/i)).toBeDefined();
		expect(screen.getByText(/most reliable developers/i)).toBeDefined();
		expect(screen.getByText(/clean code/i)).toBeDefined();
	});

	it("should render all names", () => {
		render(<Testimonials />);
		expect(screen.getByText(/María Fernández/i)).toBeDefined();
		expect(screen.getByText(/Carlos Ruíz/i)).toBeDefined();
		expect(screen.getByText(/Elena Torres/i)).toBeDefined();
	});

	it("should render avatars", () => {
		render(<Testimonials />);
		const avatars = screen.getAllByRole("img");
		expect(avatars.length).toBeGreaterThanOrEqual(3);
	});

	it("cards start hidden and reveal when intersecting", () => {
		render(<Testimonials />);
		const cards = screen.getAllByText(/Fernández|Ruíz|Torres/i);
		expect(cards[0].closest(".spotlight-card")?.className).toContain("opacity-0");

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		expect(cards[0].closest(".spotlight-card")?.className).toContain("opacity-100");
	});

	it("matches snapshot", () => {
		const { container } = render(<Testimonials />);
		expect(container).toMatchSnapshot();
	});
});
