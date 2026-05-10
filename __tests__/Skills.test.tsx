import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Skills } from "src/views/Skills";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Skills />", () => {
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

	it("should render a heading", () => {
		render(<Skills />);
		expect(screen.getByRole("heading", { name: /skills/i })).toBeDefined();
	});

	it("should show first 12 skills by default", () => {
		render(<Skills />);
		expect(screen.getAllByLabelText(/skill/i).length).toBe(12);
	});

	it("should show 'Show more' button when there are hidden skills", () => {
		render(<Skills />);
		expect(screen.getByText(/show more/i)).toBeDefined();
	});

	it("should reveal all skills when clicking Show more", () => {
		render(<Skills />);
		fireEvent.click(screen.getByText(/show more/i));
		expect(screen.getAllByLabelText(/skill/i).length).toBe(17);
		expect(screen.getByText(/show less/i)).toBeDefined();
	});

	it("should collapse back when clicking Show less", () => {
		render(<Skills />);
		fireEvent.click(screen.getByText(/show more/i));
		fireEvent.click(screen.getByText(/show less/i));
		expect(screen.getAllByLabelText(/skill/i).length).toBe(12);
	});

	it("skills become visible when intersecting", () => {
		render(<Skills />);
		const firstSkill = screen.getAllByLabelText(/skill:/i)[0];
		expect(firstSkill.className).toContain("opacity-0");

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		expect(firstSkill.className).toContain("opacity-100");
	});

	it("matches snapshot", () => {
		const { container } = render(<Skills />);
		expect(container).toMatchSnapshot();
	});
});
