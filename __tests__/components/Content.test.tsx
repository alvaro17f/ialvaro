import { act, cleanup, render, screen } from "@testing-library/react";
import { Content } from "src/components/Content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Content />", () => {
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
		render(<Content><p>Section content</p></Content>);
		expect(screen.getByText("Section content")).toBeDefined();
	});

	it("renders as section element", () => {
		const { container } = render(<Content><p>Content</p></Content>);
		expect(container.querySelector("section")).toBeDefined();
	});

	it("applies initial hidden classes", () => {
		const { container } = render(<Content><p>Content</p></Content>);
		const section = container.querySelector("section");
		expect(section?.className).toContain("opacity-0");
		expect(section?.className).toContain("translate-y-5");
	});

	it("becomes visible when intersecting", () => {
		const { container } = render(<Content><p>Content</p></Content>);
		const section = container.querySelector("section")!;

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		expect(section.className).toContain("opacity-100");
		expect(section.className).toContain("translate-y-0");
	});

	it("renders nested children", () => {
		render(<Content><div><span>Nested</span></div></Content>);
		expect(screen.getByText("Nested")).toBeDefined();
	});
});
