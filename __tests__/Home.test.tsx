import { expect, it, describe, beforeEach, afterEach } from "vitest";
import {
	render,
	screen,
	within,
	fireEvent,
	cleanup,
} from "@testing-library/react";
import Home, { metadata } from "@/app/page";

describe("<Home />", () => {
	beforeEach(() => {
		render(<Home />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});

	it("should render the <Header />", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /home/i }),
		).toBeDefined();
	});

	it("should match metadata's title to <Header /> title", () => {
		expect(metadata.title).toStrictEqual("Home");
	});

	it("should render the <Content />", () => {
		expect(screen.getAllByLabelText(/content/i).length).toBe(2);
	});
});
