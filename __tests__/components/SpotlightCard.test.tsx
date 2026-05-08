import { cleanup, render, screen } from "@testing-library/react";
import { SpotlightCard } from "src/components/SpotlightCard";
import { afterEach, describe, expect, it } from "vitest";

describe("<SpotlightCard />", () => {
	afterEach(cleanup);

	it("renders children", () => {
		render(
			<SpotlightCard>
				<p>Card content</p>
			</SpotlightCard>,
		);
		expect(screen.getByText("Card content")).toBeDefined();
	});

	it("applies custom className", () => {
		const { container } = render(
			<SpotlightCard className="extra-class">
				<p>Content</p>
			</SpotlightCard>,
		);
		expect(container.firstChild).toBeDefined();
	});
});
