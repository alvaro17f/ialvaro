import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { Nav } from "src/components/Nav";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockIntersectionObserver } from "../mocks/IntersectionObserver";

describe("<Nav />", () => {
	beforeEach(() => {
		mockIntersectionObserver();
		render(<Nav />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Nav />);
		expect(container).toMatchSnapshot();
	});

	it("should render the nav brand", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		await waitFor(() => {
			expect(screen.getByText("AM")).toBeTruthy();
		});
	});

	it("should render links", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		await waitFor(() => {
			const navigation = within(screen.getByRole("navigation"));
			expect(navigation.getByLabelText(/home/i)).toBeDefined();
			expect(navigation.getByLabelText(/about/i)).toBeDefined();
			expect(navigation.getByLabelText(/skills/i)).toBeDefined();
			expect(navigation.getByLabelText(/experience/i)).toBeDefined();
			expect(navigation.getByLabelText(/portfolio/i)).toBeDefined();
			expect(navigation.getByLabelText(/contact/i)).toBeDefined();
		});
	});

	it("should display the navbar menu when clicking on the mobile menu button", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		fireEvent.click(screen.getByLabelText(/menu-mobile/i));

		await waitFor(() => {
			const navigation = within(screen.getByRole("navigation"));
			expect(navigation.getByLabelText(/home-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/about-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/skills-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/experience-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/portfolio-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/contact-mobile/i)).toBeDefined();
		});
	});

	it("should close the navbar menu when a link is clicked", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		fireEvent.click(screen.getByLabelText(/menu-mobile/i));
		await waitFor(() => {
			const navigation = within(screen.getByRole("navigation"));
			fireEvent.click(navigation.getByLabelText(/home-mobile/i));
		});
		await waitFor(() => {
			expect(screen.queryByLabelText(/home-mobile/i)).toBeNull();
		});
	});

	it("should allow brand button to be clicked", () => {
		fireEvent.click(screen.getByText("AM"));
	});
});
