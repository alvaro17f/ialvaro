import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { Home } from "src/views/Home";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Home />", () => {
	let observerCallback: (entries: { isIntersecting: boolean }[]) => void;

	beforeEach(() => {
		Object.defineProperty(window, "scrollY", {
			value: 0,
			configurable: true,
			writable: true,
		});
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

	it("should render hero name with scramble wobble", async () => {
		render(<Home />);
		await waitFor(
			() => {
				expect(screen.getByLabelText("ALVARO")).toBeDefined();
				expect(screen.getByLabelText("GARCIA")).toBeDefined();
				expect(screen.getByLabelText("MACIAS")).toBeDefined();
			},
			{ timeout: 5000 },
		);
	});

	it("should render CTAs", () => {
		render(<Home />);
		expect(screen.getByText("View work")).toBeDefined();
		expect(screen.getByText("CV")).toBeDefined();
	});

	it("should render tagline", () => {
		render(<Home />);
		expect(screen.getByText(/Full Stack Developer/i)).toBeDefined();
	});

	it("updates parallax on scroll", () => {
		render(<Home />);
		Object.defineProperty(window, "scrollY", { value: 500, configurable: true, writable: true });
		act(() => {
			window.dispatchEvent(new Event("scroll"));
		});
		// parallax = 500 * 0.12 = 60
		const img = screen.getByAltText("Alvaro Garcia Macias");
		expect(img.style.transform).toContain("translateY(60px)");
	});

	it("reveals tagline and CTAs when visible", () => {
		render(<Home />);
		const taglineParent = screen.getByText(/Full Stack Developer/i).closest("p");
		expect(taglineParent?.className).toContain("opacity-0");

		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		expect(taglineParent?.className).toContain("opacity-100");
	});

	it("matches snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});
});
