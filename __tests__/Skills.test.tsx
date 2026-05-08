import { cleanup, render, screen } from "@testing-library/react";
import { Skills } from "src/views/Skills";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

vi.mock("@react-three/fiber", () => ({
	Canvas: ({ children }: Record<string, unknown>) => (
		<div data-testid="three-canvas">{children as React.ReactNode}</div>
	),
	useFrame: () => {},
}));

vi.mock("@react-three/drei", () => ({
	OrbitControls: () => null,
	Float: ({ children }: Record<string, unknown>) => (
		<>{children as React.ReactNode}</>
	),
	Html: ({
		children,
	}: Record<string, unknown>) => (
		<span>{children as React.ReactNode}</span>
	),
}));

describe("<Skills />", () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it("should match the snapshot", () => {
		mockIntersectionObserver();
		const { container } = render(<Skills />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		mockIntersectionObserver();
		render(<Skills />);
		expect(
			screen.getByRole("heading", { name: /skills/i }),
		).toBeDefined();
	});

	it("renders bento grid on mobile", () => {
		mockIntersectionObserver();
		vi.spyOn(window, "innerWidth", "get").mockReturnValue(600);
		render(<Skills />);
		expect(screen.getAllByLabelText(/skill/i).length).toBe(12);
		expect(screen.getAllByRole("img").length).toBe(12);
	});

	it("renders tech sphere on desktop", () => {
		mockIntersectionObserver();
		vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
		render(<Skills />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});
});
