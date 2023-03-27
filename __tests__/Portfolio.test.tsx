import { expect, it, describe, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Portfolio, { metadata } from "@/app/portfolio/page";

describe("<Portfolio />", () => {
	beforeEach(() => {
		render(<Portfolio />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Portfolio />);
		expect(container).toMatchSnapshot();
	});

	it("should match metadata's title to <Header /> title", () => {
		expect(metadata.title).toStrictEqual("Portfolio");
	});

	it("should render the <Content />", () => {
		expect(screen.getAllByRole("img").length).toBe(5);
	});
});
