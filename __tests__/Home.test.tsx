import Home, { metadata } from "@/app/page";
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

	it("should render the <Header />", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /home/i }),
		).toBeDefined();
	});

	it("should match metadata's title to <Header /> title", () => {
		expect(metadata.title).toStrictEqual("Home");
	});

	// TODO:
	// it("should render the <Content />", () => {
	// 	expect(screen.getAllByLabelText(/content/i).length).toBe(2);
	// });
});
