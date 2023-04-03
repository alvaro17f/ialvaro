import Resume from "@/app/pages/Resume";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Resume />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(<Resume />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Resume />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /resume/i }),
		).toBeDefined();
	});
});
