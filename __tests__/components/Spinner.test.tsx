import Spinner from "../../components/Spinner";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Spinner", () => {
	it("renders the spinner", () => {
		render(<Spinner />);
		screen.getByTitle("spinner");
	});

	it("renders the loading text", () => {
		render(<Spinner />);
		screen.getAllByText("Loading...");
	});
});
