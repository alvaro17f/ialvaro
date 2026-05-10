import { act, cleanup, render, screen } from "@testing-library/react";
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

	it("should render all 12 skills", () => {
		render(<Skills />);
		expect(screen.getAllByLabelText(/skill/i).length).toBe(13);
		expect(screen.getAllByRole("img").length).toBe(13);
	});

	it("featured skills have col-span-2 row-span-2", () => {
		render(<Skills />);
		const links = screen.getAllByLabelText(/skill:/i);
		// indices 0, 5, 8 are featured
		expect(links[0].className).toContain("md:col-span-2");
		expect(links[0].className).toContain("md:row-span-2");
		expect(links[5].className).toContain("md:col-span-2");
		expect(links[8].className).toContain("md:col-span-2");
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
