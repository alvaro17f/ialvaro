import { cleanup, render, screen } from "@testing-library/react";
import { LoadingScreen } from "src/components/LoadingScreen";
import { afterEach, describe, expect, it } from "vitest";

describe("<LoadingScreen />", () => {
	afterEach(() => {
		sessionStorage.clear();
		cleanup();
	});

	it("renders brand text", () => {
		render(<LoadingScreen />);
		expect(screen.getByText("AM")).toBeDefined();
	});

	it("has correct z-index for overlay", () => {
		const { container } = render(<LoadingScreen />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("z-[100]");
	});

	it("has aria-hidden for decorative overlay", () => {
		render(<LoadingScreen />);
		const el = screen.getByLabelText("loading-screen");
		expect(el.getAttribute("aria-hidden")).toBe("true");
	});
});
