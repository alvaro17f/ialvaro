import { act, cleanup, render, screen } from "@testing-library/react";
import { LazyView } from "src/components/LazyView";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<LazyView />", () => {
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

	it("renders children", () => {
		render(<LazyView><p>Lazy content</p></LazyView>);
		expect(screen.getByText("Lazy content")).toBeDefined();
	});

	it("applies initial hidden classes", () => {
		const { container } = render(<LazyView><p>Content</p></LazyView>);
		const div = container.firstChild as HTMLElement;
		expect(div.className).toContain("opacity-0");
		expect(div.className).toContain("translate-y-5");
	});

	it("becomes visible when intersecting", () => {
		const { container } = render(<LazyView><p>Content</p></LazyView>);
		const div = container.firstChild as HTMLElement;

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		expect(div.className).toContain("opacity-100");
		expect(div.className).toContain("translate-y-0");
	});

	it("defaults once to true", () => {
		render(<LazyView><p>Content</p></LazyView>);
		expect(screen.getByText("Content")).toBeDefined();
	});

	it("accepts once=false", () => {
		render(<LazyView once={false}><p>Content</p></LazyView>);
		expect(screen.getByText("Content")).toBeDefined();
	});
});
