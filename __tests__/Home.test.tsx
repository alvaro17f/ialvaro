import { cleanup, render, screen } from "@testing-library/react";
import { Home } from "src/views/Home";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Home />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Home />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});
	it("should show wobble content with 18 letters", () => {
		expect(screen.getAllByLabelText("wobble").length).toBe(18);
	});
});
