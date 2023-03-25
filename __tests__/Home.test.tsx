import { expect, it, describe, beforeEach, afterEach } from "vitest";
import {
	render,
	screen,
	within,
	fireEvent,
	cleanup,
} from "@testing-library/react";
import Home from "@/app/page";

describe("<Home />", () => {
	beforeEach(() => {
		render(<Home />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});

	it("should render the title", () => {
		const main = within(screen.getByRole("main"));
		expect(
			main.getByRole("heading", { level: 1, name: /azama/i }),
		).toBeDefined();
	});
});
