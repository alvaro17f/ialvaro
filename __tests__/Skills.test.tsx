import { cleanup, render, screen } from "@testing-library/react";
import { Skills } from "src/views/Skills";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Skills />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Skills />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		render(<Skills />);
		expect(
			screen.getByRole("heading", { name: /skills/i }),
		).toBeDefined();
	});

	it("should render skills", () => {
		render(<Skills />);
		expect(screen.getAllByLabelText(/skill/i).length).toBe(12);
		expect(screen.getAllByRole("img").length).toBe(12);
	});
});
