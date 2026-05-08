import { cleanup, render, screen } from "@testing-library/react";
import { Stats } from "src/views/Stats";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Stats />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Stats />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Stats />);
		expect(container).toMatchSnapshot();
	});

	it("should render all stat labels", () => {
		expect(screen.getByText(/years/i)).toBeDefined();
		expect(screen.getByText(/projects/i)).toBeDefined();
		expect(screen.getByText(/technologies/i)).toBeDefined();
		expect(screen.getByText(/commitment/i)).toBeDefined();
	});

	it("should render stat numbers", () => {
		expect(screen.getByText("0")).toBeDefined();
	});
});
