import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Home } from "src/views/Home";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<Home />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});

	it("should render hero name with scramble wobble", async () => {
		render(<Home />);
		await waitFor(
			() => {
				expect(screen.getByLabelText("ALVARO")).toBeDefined();
				expect(screen.getByLabelText("GARCIA")).toBeDefined();
				expect(screen.getByLabelText("MACIAS")).toBeDefined();
			},
			{ timeout: 3000 },
		);
	});

	it("should render CTAs", () => {
		render(<Home />);
		expect(screen.getByText("View work")).toBeDefined();
		expect(screen.getByText("CV")).toBeDefined();
	});

	it("should render tagline", () => {
		render(<Home />);
		expect(screen.getByText(/Full Stack Developer/i)).toBeDefined();
	});
});
