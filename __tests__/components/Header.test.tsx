import { act, cleanup, render, screen } from "@testing-library/react";
import { Header } from "src/components/Header";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Header />", () => {
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

	it("renders the title", () => {
		render(<Header title="Portfolio" />);
		expect(screen.getByText("Portfolio")).toBeDefined();
	});

	it("renders h1 element", () => {
		const { container } = render(<Header title="Skills" />);
		expect(container.querySelector("h1")).toBeDefined();
	});

	it("applies initial hidden classes", () => {
		const { container } = render(<Header title="About" />);
		const h1 = container.querySelector("h1");
		expect(h1?.className).toContain("opacity-0");
		expect(h1?.className).toContain("scale-x-0");
	});

	it("becomes visible when intersecting", () => {
		const { container } = render(<Header title="Experience" />);

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		const h1 = container.querySelector("h1");
		expect(h1?.className).toContain("opacity-100");
		expect(h1?.className).toContain("scale-x-100");

		const line = container.querySelector(".bg-alvaro-primary");
		expect(line?.className).toContain("w-24");
		expect(line?.className).toContain("opacity-100");
	});

	it("matches snapshot", () => {
		const { container } = render(<Header title="Biography" />);
		expect(container).toMatchSnapshot();
	});
});
