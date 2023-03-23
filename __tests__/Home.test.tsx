import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../app/page";

test("Home", () => {
	render(<Home />);
	const main = within(screen.getByRole("main"));
	expect(main.getByRole("heading", { level: 1, name: /azama/i })).toBeDefined();
});
