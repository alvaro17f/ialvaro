import { cleanup, render, screen } from "@testing-library/react";
import { Home } from "src/views/Home";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Home />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Home />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});

	it("should render hero name with text scramble", () => {
		expect(screen.getByLabelText("ALVARO")).toBeDefined();
		expect(screen.getByLabelText("GARCIA")).toBeDefined();
		expect(screen.getByLabelText("MACIAS")).toBeDefined();
	});

	it("should render CTAs", () => {
		expect(screen.getByText("View work")).toBeDefined();
		expect(screen.getByText("CV")).toBeDefined();
	});

	it("should render tagline", () => {
		expect(
			screen.getByText(/Full Stack Developer/i),
		).toBeDefined();
	});
});
