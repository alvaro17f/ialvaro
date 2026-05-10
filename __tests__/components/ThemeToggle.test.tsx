import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";

describe("ThemeToggle", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-theme");
	});
	afterEach(cleanup);

	it("renders toggle button", async () => {
		const { ThemeToggle } = await import("src/components/ThemeToggle");
		render(<ThemeToggle />);
		expect(screen.getByLabelText(/toggle theme/i)).toBeDefined();
	});

	it("toggles from dark to light", async () => {
		const { ThemeToggle } = await import("src/components/ThemeToggle");
		render(<ThemeToggle />);
		const btn = screen.getByLabelText(/toggle theme/i);

		fireEvent.click(btn);

		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
		expect(localStorage.getItem("theme")).toBe("light");
	});

	it("toggles back to dark", async () => {
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");

		const { ThemeToggle } = await import("src/components/ThemeToggle");
		render(<ThemeToggle />);
		const btn = screen.getByLabelText(/toggle theme/i);

		fireEvent.click(btn);

		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
	});

	it("reads initial state from localStorage", async () => {
		localStorage.setItem("theme", "light");

		const { ThemeToggle } = await import("src/components/ThemeToggle");
		render(<ThemeToggle />);

		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});
});
