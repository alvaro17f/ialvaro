import Home from "src/views/Home";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Home />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
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
