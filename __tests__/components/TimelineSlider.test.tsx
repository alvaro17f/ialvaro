import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TimelineSlider } from "src/components/TimelineSlider";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<TimelineSlider />", () => {
	afterEach(cleanup);

	it("renders with labels", () => {
		render(
			<TimelineSlider
				value={1}
				onChange={() => {}}
				min={0}
				max={3}
			/>,
		);
		expect(screen.getByText("Short")).toBeDefined();
		expect(screen.getByText("Long")).toBeDefined();
	});

	it("renders a range input", () => {
		render(
			<TimelineSlider
				value={0}
				onChange={() => {}}
				min={0}
				max={5}
			/>,
		);
		expect(screen.getByRole("slider")).toBeDefined();
	});

	it("renders correct number of dots", () => {
		const { container } = render(
			<TimelineSlider
				value={0}
				onChange={() => {}}
				min={0}
				max={3}
			/>,
		);
		const dots = container.querySelectorAll(".rounded-full");
		expect(dots.length).toBeGreaterThanOrEqual(4);
	});

	it("calls onChange when value changes", () => {
		const onChange = vi.fn();
		render(
			<TimelineSlider
				value={0}
				onChange={onChange}
				min={0}
				max={3}
			/>,
		);
		fireEvent.change(screen.getByRole("slider"), {
			target: { value: 2 },
		});
		expect(onChange).toHaveBeenCalledWith(2);
	});
});
