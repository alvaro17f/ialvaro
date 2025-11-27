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
			screen.getByRole("heading", { level: 1, name: /experience/i }),
		).toBeDefined();
	});

	it("should render skills", () => {
		expect(
			screen.getAllByLabelText(/experience/i).length,
		).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(1);
	});

	it("should render a experience's title", () => {
		expect(screen.getAllByLabelText(/title/i).length).toBeGreaterThanOrEqual(1);
	});

	it("should render a experience's content", () => {
		expect(screen.getAllByLabelText(/content/i).length).toBeGreaterThanOrEqual(
			1,
		);
	});
});
