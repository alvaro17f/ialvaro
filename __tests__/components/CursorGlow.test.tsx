import { cleanup, render, screen } from "@testing-library/react";
import { CursorGlow } from "src/components/CursorGlow";
import { afterEach, describe, expect, it } from "vitest";

describe("<CursorGlow />", () => {
	afterEach(cleanup);

	it("renders a glow element", () => {
		const { container } = render(<CursorGlow />);
		expect(container.firstChild).toBeDefined();
	});

	it("has aria-hidden for decorative element", () => {
		render(<CursorGlow />);
		const glow = screen.getByLabelText("cursor-glow");
		expect(glow.getAttribute("aria-hidden")).toBe("true");
	});

	it("has pointer-events-none", () => {
		render(<CursorGlow />);
		const glow = screen.getByLabelText("cursor-glow");
		expect(glow.classList.contains("pointer-events-none")).toBe(true);
	});
});
