import { cleanup, render, screen } from "@testing-library/react";
import { FloatingTags } from "src/components/FloatingTags";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "../mocks/IntersectionObserver.tsx";

describe("<FloatingTags />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
	});
	afterEach(cleanup);

	it("renders all tags", () => {
		render(<FloatingTags tags={["React", "TypeScript", "Node"]} />);
		expect(screen.getByText("React")).toBeDefined();
		expect(screen.getByText("TypeScript")).toBeDefined();
		expect(screen.getByText("Node")).toBeDefined();
	});

	it("renders empty tags gracefully", () => {
		const { container } = render(<FloatingTags tags={[]} />);
		expect(container.firstChild).toBeDefined();
	});
});
