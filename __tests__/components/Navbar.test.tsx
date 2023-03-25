import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	render,
	screen,
	within,
	fireEvent,
	cleanup,
} from "@testing-library/react";
import Navbar from "@/app/components/Navbar";

describe("<Navbar />", () => {
	beforeEach(() => {
		render(<Navbar />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Navbar />);
		expect(container).toMatchSnapshot();
	});

	it("should render the navbar logo", () => {
		const logo = screen.getByAltText("logo");
		expect(logo).toBeTruthy();
	});

	it("should render links", () => {
		const navigation = within(screen.getByRole("navigation"));
		expect(navigation.getByRole("link", { name: /home/i })).toBeDefined();
		expect(navigation.getByRole("link", { name: /about/i })).toBeDefined();
	});

	it("should display the navbar menu when clicking on the mobile menu button", () => {
		const mobileMenuButton = screen.getByRole("button", {
			name: /menu-mobile/i,
		});
		fireEvent.click(mobileMenuButton);
		const menuItems = screen.getAllByRole("link");
		expect(menuItems.length).toBeGreaterThan(0);
		expect(screen.getByLabelText(/home-mobile/i)).toBeDefined();
		expect(screen.getByLabelText(/about-mobile/i)).toBeDefined();
		fireEvent.click(mobileMenuButton);
		expect(screen.queryByLabelText(/about-mobile/i)).toBeNull();
		expect(screen.queryByLabelText(/home-mobile/i)).toBeNull();
	});

	it("should close the navbar menu when a link is clicked", () => {
		const mobileMenuButton = screen.getByRole("button", {
			name: /menu-mobile/i,
		});
		fireEvent.click(mobileMenuButton);
		const menuItems = screen.getAllByRole("link");
		expect(menuItems.length).toBeGreaterThan(0);
		expect(screen.getByLabelText(/home-mobile/i)).toBeDefined();
		expect(screen.getByLabelText(/about-mobile/i)).toBeDefined();
		fireEvent.click(screen.getByLabelText(/home-mobile/i));
		expect(screen.queryByLabelText(/about-mobile/i)).toBeNull();
		expect(screen.queryByLabelText(/home-mobile/i)).toBeNull();
	});
});
