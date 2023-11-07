import Biography from "@/app/pages/Biography";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<Biography />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(<Biography />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Biography />);
		expect(container).toMatchSnapshot();
	});

	it("should render an image", () => {
		expect(screen.getByRole("img")).toBeDefined();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /hello world/i }),
		).toBeDefined();
	});

	it("should render a paragraph", () => {
		expect(screen.getByText(/Full Stack Developer/i)).toBeDefined();
	});

	it("should render a slider", () => {
		expect(screen.getByRole("slider")).toBeDefined();
	});

	it("should be able to change biography's value", () => {
		const slider = screen.getByRole("slider");
		expect(slider).toBeDefined();
		fireEvent.change(slider, { target: { value: 0 } });
	});
});
