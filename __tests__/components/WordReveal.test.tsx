import { cleanup, render, screen } from "@testing-library/react";
import { WordReveal } from "src/components/WordReveal";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "../mocks/IntersectionObserver.tsx";

describe("<WordReveal />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
	});
	afterEach(cleanup);

	it("renders all words from text", () => {
		render(<WordReveal text="Hello world from component" />);
		expect(screen.getByText("Hello")).toBeDefined();
		expect(screen.getByText("world")).toBeDefined();
		expect(screen.getByText("from")).toBeDefined();
		expect(screen.getByText("component")).toBeDefined();
	});

	it("applies custom className", () => {
		const { container } = render(
			<WordReveal text="Test" className="custom-class" />,
		);
		expect(container.querySelector("p")).toBeDefined();
	});

	it("renders empty text gracefully", () => {
		const { container } = render(<WordReveal text="" />);
		expect(container.querySelector("p")).toBeDefined();
	});
});
