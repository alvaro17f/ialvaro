import { cleanup, render, screen } from "@testing-library/react";
import { Experience } from "src/views/Experience";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Experience />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Experience />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Experience />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { name: /experience/i }),
		).toBeDefined();
	});

	it("should render experience entries", () => {
		expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(1);
	});

	it("should render experience titles", () => {
		const headings = screen.getAllByRole("heading");
		expect(headings.length).toBeGreaterThanOrEqual(2);
	});
});
