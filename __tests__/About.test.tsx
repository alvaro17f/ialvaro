import { expect, it, describe, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import About, { metadata } from "@/app/about/page";

describe("<About />", () => {
	beforeEach(() => {
		render(<About />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<About />);
		expect(container).toMatchSnapshot();
	});

	it("should render the <Header />", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /about/i }),
		).toBeDefined();
	});

	it("should match metadata's title to <Header /> title", () => {
		expect(metadata.title).toStrictEqual("About");
	});

	it("should render the <Content />", () => {
		expect(screen.getByLabelText(/content/i)).toBeDefined();
	});

	it("should render the <Form />", () => {
		expect(screen.getByLabelText(/contact-form/i)).toBeDefined();
	});
});
