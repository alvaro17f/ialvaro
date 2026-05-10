import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LoadingScreen } from "src/components/LoadingScreen";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<LoadingScreen />", () => {
	afterEach(() => {
		sessionStorage.clear();
		cleanup();
	});

	it("renders brand text", () => {
		render(<LoadingScreen />);
		expect(screen.getByText("AM")).toBeDefined();
	});

	it("has correct z-index for overlay", () => {
		const { container } = render(<LoadingScreen />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("z-[100]");
	});

	it("hides immediately when sessionStorage has visited flag", () => {
		sessionStorage.setItem("ialvaro-visited", "true");
		const { container } = render(<LoadingScreen />);
		expect(container.firstChild).toBeNull();
	});

	it("shows exit animation then hides after timers", () => {
		vi.useFakeTimers();
		const { container } = render(<LoadingScreen />);
		expect(container.firstChild).toBeDefined();

		act(() => {
			vi.advanceTimersByTime(1900);
		});
		// exit animation triggered
		const el = screen.getByLabelText("loading-screen");
		expect(el.className).toContain("opacity-0");

		act(() => {
			vi.advanceTimersByTime(600);
		});

		vi.useRealTimers();
	});

	it("clicking skip triggers exit animation and hides", () => {
		vi.useFakeTimers();
		render(<LoadingScreen />);

		fireEvent.click(screen.getByLabelText("loading-screen"));

		act(() => {
			vi.advanceTimersByTime(500);
		});

		vi.useRealTimers();
	});
});
