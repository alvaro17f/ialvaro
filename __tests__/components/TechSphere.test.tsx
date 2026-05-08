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
	Html: ({
		children,
	}: Record<string, unknown>) => (
		<span>{children as React.ReactNode}</span>
	),
}));

describe("<TechSphere />", () => {
	afterEach(cleanup);

	it("renders canvas element", () => {
		render(<TechSphere />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});

	it("renders technology labels", () => {
		render(<TechSphere />);
		expect(screen.getByText("React")).toBeDefined();
		expect(screen.getByText("TypeScript")).toBeDefined();
		expect(screen.getByText("Node.js")).toBeDefined();
		expect(screen.getByText("Docker")).toBeDefined();
	});

	it("renders all 8 tech labels", () => {
		render(<TechSphere />);
		const labels = [
			"React",
			"TypeScript",
			"Node.js",
			"Astro",
			"Tailwind",
			"PostgreSQL",
			"Docker",
			"AWS",
		];
		for (const label of labels) {
			expect(screen.getByText(label)).toBeDefined();
		}
	});
});
