import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ScrambleWobble } from "src/components/ScrambleWobble";
import { afterEach, describe, expect, it } from "vitest";

describe("<ScrambleWobble />", () => {
	afterEach(cleanup);

	it("renders final text after scramble", async () => {
		render(<ScrambleWobble text="HELLO" />);
		await waitFor(
			() => {
				expect(screen.getByText("H")).toBeDefined();
				expect(screen.getByText("E")).toBeDefined();
			},
			{ timeout: 3000 },
		);
	});

	it("renders each letter as separate span", async () => {
		const { container } = render(<ScrambleWobble text="ABC" />);
		await waitFor(
			() => {
				const spans = container.querySelectorAll("span");
				expect(spans.length).toBeGreaterThanOrEqual(3);
			},
			{ timeout: 3000 },
		);
	});

	it("has aria-label with full text", () => {
		render(<ScrambleWobble text="HELLO" />);
		expect(screen.getByLabelText("HELLO")).toBeDefined();
	});
});
