import { act, cleanup, render, screen } from "@testing-library/react";
import { WordReveal } from "src/components/WordReveal";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<WordReveal />", () => {
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

	it("renders words", () => {
		render(<WordReveal text="Hello world" />);
		expect(screen.getByText(/Hello/)).toBeDefined();
	});

	it("words start hidden", () => {
		const { container } = render(<WordReveal text="Hello world" />);
		const spans = container.querySelectorAll("span");
		expect(spans[0].className).toContain("opacity-0");
		expect(spans[0].className).toContain("translate-y-3");
	});

	it("words become visible when intersecting", () => {
		const { container } = render(<WordReveal text="Hello world" />);

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		const spans = container.querySelectorAll("span");
		expect(spans[0].className).toContain("opacity-100");
		expect(spans[0].className).toContain("translate-y-0");
	});

	it("applies custom className", () => {
		render(<WordReveal text="Test" className="my-class" />);
		expect(screen.getByText(/Test/).closest("p")?.classList.contains("my-class")).toBe(true);
	});
});
