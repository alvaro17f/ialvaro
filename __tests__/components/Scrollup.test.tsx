import { cleanup, render, screen, act } from "@testing-library/react";
import { goToTop, Scrollup } from "src/components/Scrollup";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let scrollCallback: ((latest: number) => void) | null = null;

vi.mock("framer-motion", async () => {
	const actual = await vi.importActual("framer-motion");
	return {
		...actual,
		useScroll: () => ({
			scrollY: { current: 0 },
		}),
		useMotionValueEvent: (
			_value: unknown,
			_event: string,
			callback: (latest: number) => void,
		) => {
			scrollCallback = callback;
		},
	};
});

const simulateScroll = (y: number) => {
	act(() => {
		scrollCallback?.(y);
	});
};

describe("<Scrollup />", () => {
	beforeEach(() => {
		scrollCallback = null;
		render(<Scrollup />);
	});
	afterEach(cleanup);

	it("should appear if scrollY > 400", () => {
		expect(screen.queryByLabelText("Scroll to top")).toBeNull();
		simulateScroll(401);
		expect(screen.queryByLabelText("Scroll to top")).not.toBeNull();
	});

	it("should NOT appear if scrollY < 400", () => {
		simulateScroll(399);
		const button = screen.queryByLabelText("Scroll to top");
		expect(button).toBeNull();
	});

	it("should scroll to top when clicked", () => {
		simulateScroll(401);
		goToTop();
	});
});
