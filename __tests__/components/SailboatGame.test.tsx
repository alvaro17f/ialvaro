import { cleanup, render, screen } from "@testing-library/react";
import { SailboatGame } from "src/components/SailboatGame";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@react-three/fiber", () => ({
	Canvas: ({ children }: Record<string, unknown>) => (
		<div data-testid="three-canvas">{children as React.ReactNode}</div>
	),
	useFrame: () => {},
	useThree: () => ({
		camera: {} as unknown,
		gl: { domElement: document.createElement("div") },
		raycaster: {},
		scene: {},
	}),
}));

vi.mock("@react-three/drei", () => ({
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

describe("<SailboatGame />", () => {
	afterEach(cleanup);

	it("renders canvas", () => {
		render(<SailboatGame />);
		expect(screen.getByTestId("three-canvas")).toBeDefined();
	});

	it("renders skill labels from data", () => {
		render(<SailboatGame />);
		expect(screen.getByText("react.js")).toBeDefined();
		expect(screen.getByText("vue.js")).toBeDefined();
		expect(screen.getByText("typescript")).toBeDefined();
	});

	it("has correct container height", () => {
		const { container } = render(<SailboatGame />);
		const div = container.firstChild as HTMLElement;
		expect(div.className).toContain("h-[500px]");
	});
});
