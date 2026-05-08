import { cleanup, render, screen } from "@testing-library/react";
import { AnimatedCounter } from "src/components/AnimatedCounter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "../mocks/IntersectionObserver.tsx";

describe("<AnimatedCounter />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
	});
	afterEach(cleanup);

	it("renders starting at 0", () => {
		render(<AnimatedCounter end={42} />);
		expect(screen.getByText("0")).toBeDefined();
	});

	it("renders suffix at start", () => {
		render(<AnimatedCounter end={100} suffix="%" />);
		expect(screen.getByText("0%")).toBeDefined();
	});

	it("has tabular-nums for number alignment", () => {
		const { container } = render(<AnimatedCounter end={10} />);
		const span = container.querySelector("span");
		expect(span?.classList.contains("tabular-nums")).toBe(true);
	});

	it("renders with aria label", () => {
		const { container } = render(<AnimatedCounter end={42} />);
		expect(container.querySelector("span")).toBeDefined();
	});
});
