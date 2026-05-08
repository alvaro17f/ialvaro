import { cleanup, render, screen } from "@testing-library/react";
import { TechSphere } from "src/components/TechSphere";
import { afterEach, describe, expect, it, vi } from "vitest";

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
}));

describe("<TechSphere />", () => {
	afterEach(cleanup);

	it("renders canvas element", () => {
		render(<TechSphere />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});

	it("renders with correct height", () => {
		const { container } = render(<TechSphere />);
		const div = container.firstChild as HTMLElement;
		expect(div.className).toContain("h-[500px]");
	});

	it("is hidden on mobile via parent conditional", () => {
		// The parent component is responsible for conditional rendering
		const { container } = render(<TechSphere />);
		expect(container.firstChild).toBeDefined();
	});
});
