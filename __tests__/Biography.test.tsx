import { act, cleanup, render, screen } from "@testing-library/react";
import Biography from "src/views/Biography";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Biography />", () => {
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

	it("should render about heading", () => {
		render(<Biography />);
		expect(screen.getByText(/I build/i)).toBeDefined();
	});

	it("should render profile image", () => {
		render(<Biography />);
		expect(screen.getByAltText("Alvaro Garcia Macias")).toBeDefined();
	});

	it("reveals profile image when intersecting", () => {
		render(<Biography />);
		const img = screen.getByAltText("Alvaro Garcia Macias");
		expect(img.className).toContain("opacity-0");

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		expect(img.className).toContain("opacity-100");
		expect(img.className).toContain("scale-100");
	});

	it("reveals stats when intersecting", () => {
		render(<Biography />);
		const statsEl = screen.getByText("Projects").closest("div")?.parentElement;
		expect(statsEl?.className).toContain("opacity-0");

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});

		expect(statsEl?.className).toContain("opacity-100");
	});

	it("renders inline stats", () => {
		render(<Biography />);
		expect(screen.getByText("Years")).toBeDefined();
		expect(screen.getByText("Projects")).toBeDefined();
		expect(screen.getByText("Technologies")).toBeDefined();
	});

	it("matches snapshot", () => {
		const { container } = render(<Biography />);
		expect(container).toMatchSnapshot();
	});
});
