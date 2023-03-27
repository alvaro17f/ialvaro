import { expect, it, describe, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Portfolio, { metadata } from "@/app/portfolio/page";

describe("<About />", () => {
	beforeEach(() => {
		render(<Portfolio />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Portfolio />);
		expect(container).toMatchSnapshot();
	});

	it("should render the <Header />", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /portfolio/i }),
		).toBeDefined();
	});

	it("should match metadata's title to <Header /> title", () => {
		expect(metadata.title).toStrictEqual("Portfolio");
	});

	it("should render the <Content />", () => {
		expect(screen.getAllByLabelText(/content/i).length).toBe(2);
	});
});
