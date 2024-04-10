import { Skills } from "src/views/Skills";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Skills />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(<Skills />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Skills />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /skills/i }),
		).toBeDefined();
	});

	it("should render skills", () => {
		expect(screen.getAllByLabelText(/skill/i).length).toBe(12);
		expect(screen.getAllByRole("img").length).toBe(12);
	});
});
