import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { Nav } from "src/components/Nav";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("<Nav />", () => {
	beforeEach(() => {
		render(<Nav />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Nav />);
		expect(container).toMatchSnapshot();
	});

	it("should render the nav brand", () => {
		expect(screen.getByText("AM")).toBeTruthy();
	});

	it("should render desktop links", () => {
		const navigation = within(screen.getByRole("navigation"));
		expect(navigation.getByLabelText(/home-desktop/i)).toBeDefined();
		expect(navigation.getByLabelText(/about-desktop/i)).toBeDefined();
		expect(navigation.getByLabelText(/skills-desktop/i)).toBeDefined();
		expect(navigation.getByLabelText(/experience-desktop/i)).toBeDefined();
		expect(navigation.getByLabelText(/portfolio-desktop/i)).toBeDefined();
		expect(navigation.getByLabelText(/contact-desktop/i)).toBeDefined();
	});

	it("should display mobile menu when clicking hamburger", () => {
		fireEvent.click(screen.getByLabelText(/menu-mobile/i));
		const navigation = within(screen.getByRole("navigation"));
		expect(navigation.getByLabelText(/home-mobile/i)).toBeDefined();
		expect(navigation.getByLabelText(/about-mobile/i)).toBeDefined();
		expect(navigation.getByLabelText(/skills-mobile/i)).toBeDefined();
		expect(navigation.getByLabelText(/experience-mobile/i)).toBeDefined();
		expect(navigation.getByLabelText(/portfolio-mobile/i)).toBeDefined();
		expect(navigation.getByLabelText(/contact-mobile/i)).toBeDefined();
	});

	it("should close mobile menu when a link is clicked", () => {
		fireEvent.click(screen.getByLabelText(/menu-mobile/i));
		const navigation = within(screen.getByRole("navigation"));
		fireEvent.click(navigation.getByLabelText(/home-mobile/i));
		expect(screen.queryByLabelText(/home-mobile/i)).toBeNull();
	});

	it("should allow brand button to be clicked", () => {
		fireEvent.click(screen.getByText("AM"));
	});
});
