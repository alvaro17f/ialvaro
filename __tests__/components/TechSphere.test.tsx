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

vi.mock("src/data/skills.json", () => ({
	default: [
		{ id: "1", title: "react.js", image: "/skills/react.svg", url: "https://react.dev/" },
		{ id: "2", title: "vue.js", image: "/skills/vue.svg", url: "https://vuejs.org/" },
		{ id: "3", title: "typescript", image: "/skills/typescript.svg", url: "https://typescriptlang.org/" },
	],
}));

describe("<TechSphere />", () => {
	afterEach(cleanup);

	it("renders canvas element", () => {
		render(<TechSphere />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});

	it("renders skill labels", () => {
		render(<TechSphere />);
		expect(screen.getByText("react.js")).toBeDefined();
		expect(screen.getByText("vue.js")).toBeDefined();
		expect(screen.getByText("typescript")).toBeDefined();
	});

	it("labels are visible for each skill", () => {
		render(<TechSphere />);
		const labels = screen.getAllByText(/\.js$|typescript|javascript|tailwind|rust|go$|jest|docker|sql$/);
		expect(labels.length).toBe(3);
	});
});
