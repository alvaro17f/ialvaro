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
	useTexture: () => ({}) as unknown,
}));

const expectedSkills = [
	"react.js",
	"vue.js",
	"typescript",
	"javascript",
	"tailwind",
	"next.js",
	"rust",
	"go",
	"jest",
	"node.js",
	"docker",
	"sql",
];

describe("<TechSphere />", () => {
	afterEach(cleanup);

	it("renders canvas element", () => {
		render(<TechSphere />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});

	it("renders all 12 skill labels from data", () => {
		render(<TechSphere />);
		for (const skill of expectedSkills) {
			expect(screen.getByText(skill)).toBeDefined();
		}
	});
});
