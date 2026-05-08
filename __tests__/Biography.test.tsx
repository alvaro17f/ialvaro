import { cleanup, render, screen } from "@testing-library/react";
import Biography from "src/views/Biography";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Biography />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Biography />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Biography />);
		expect(container).toMatchSnapshot();
	});

	it("should render profile image", () => {
		expect(screen.getByRole("img")).toBeDefined();
	});

	it("should render about heading", () => {
		expect(screen.getByText("About")).toBeDefined();
		expect(screen.getByText("I build things")).toBeDefined();
	});

	it("should render inline stats", () => {
		expect(screen.getByText("5+")).toBeDefined();
		expect(screen.getByText("20+")).toBeDefined();
		expect(screen.getByText("12")).toBeDefined();
	});

	it("should render timeline slider", () => {
		expect(screen.getByRole("slider")).toBeDefined();
	});

	it("should render floating tags on desktop", () => {
		expect(screen.getByText("React")).toBeDefined();
		expect(screen.getByText("TypeScript")).toBeDefined();
	});

	it("should render word reveal text", () => {
		expect(screen.getByText("fortunate")).toBeDefined();
		expect(screen.getByText("passionate")).toBeDefined();
	});
});
