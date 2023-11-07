import Scrollup, { goToTop } from "src/components/Scrollup";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("<Scrollup />", () => {
	beforeEach(() => {
		render(<Scrollup />);
	});
	afterEach(cleanup);

	it("should appear if scrollY > 100", () => {
		expect(screen.queryByLabelText("scrollup")).toBeNull();
		fireEvent.scroll(window, { target: { scrollY: 101 } });
		expect(screen.queryByLabelText("scrollup")).not.toBeNull();
		expect(window.scrollY).toStrictEqual(101);
	});

	it("should NOT appear if scrollY < 100", () => {
		fireEvent.scroll(window, { target: { scrollY: 90 } });

		const button = screen.queryByLabelText("scrollup");
		expect(button).toBeNull();
	});

	it("should scroll to top when clicked", () => {
		fireEvent.scroll(window, { target: { scrollY: 101 } });
		goToTop();
	});
});
