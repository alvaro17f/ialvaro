import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { TextScramble } from "src/components/TextScramble";
import { afterEach, describe, expect, it } from "vitest";

describe("<TextScramble />", () => {
	afterEach(cleanup);

	it("renders with final text after animation", async () => {
		render(<TextScramble text="HELLO" />);
		await waitFor(
			() => {
				expect(screen.getByText("HELLO")).toBeDefined();
			},
			{ timeout: 3000 },
		);
	});

	it("has aria-label with original text", () => {
		render(<TextScramble text="HELLO" />);
		const el = screen.getByLabelText("HELLO");
		expect(el).toBeDefined();
		expect(el.getAttribute("aria-label")).toBe("HELLO");
	});

	it("applies custom className", () => {
		render(<TextScramble text="TEST" className="custom-class" />);
		const el = screen.getByLabelText("TEST");
		expect(el.classList.contains("custom-class")).toBe(true);
	});
});
