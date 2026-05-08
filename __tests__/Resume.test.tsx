import { cleanup, render, screen } from "@testing-library/react";
import { CV } from "src/views/CV";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "./mocks/IntersectionObserver.tsx";

describe("<CV />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<CV />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<CV />);
		expect(container).toMatchSnapshot();
	});

	it("should render a heading", () => {
		expect(
			screen.getByRole("heading", { name: /download my cv/i }),
		).toBeDefined();
	});
});
