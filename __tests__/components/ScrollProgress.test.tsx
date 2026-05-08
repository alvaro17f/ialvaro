import { cleanup, render, screen } from "@testing-library/react";
import { ScrollProgress } from "src/components/ScrollProgress";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<ScrollProgress />", () => {
	beforeEach(() => {
		// Mock document dimensions for jsdom
		Object.defineProperty(document.documentElement, "scrollHeight", {
			value: 2000,
			configurable: true,
		});
		Object.defineProperty(window, "innerHeight", {
			value: 800,
			configurable: true,
		});
		render(<ScrollProgress />);
	});
	afterEach(cleanup);

	it("renders progress bar", () => {
		expect(screen.getByLabelText("scroll-progress")).toBeDefined();
	});

	it("starts at 0% width", () => {
		const bar = screen.getByLabelText("scroll-progress");
		expect(bar.style.width).toBe("0%");
	});

	it("has gradient styling", () => {
		const bar = screen.getByLabelText("scroll-progress");
		expect(bar.className).toContain("bg-gradient-to-r");
	});
});
