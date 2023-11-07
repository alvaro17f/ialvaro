import Nav from "@/components/Nav";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	render,
	screen,
	within,
	fireEvent,
	cleanup,
	waitFor,
} from "@testing-library/react";

describe("<Nav />", () => {
	beforeEach(() => {
		const mockIntersectionObserver = vi.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(<Nav />);
	});
	afterEach(cleanup);

	it("should match the snapshot", () => {
		const { container } = render(<Nav />);
		expect(container).toMatchSnapshot();
	});

	it("should render the navbar logo", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		await waitFor(() => {
			const logo = screen.getByAltText("logo");
			expect(logo).toBeTruthy();
		});
	});

	it("should render links", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		await waitFor(() => {
			const navigation = within(screen.getByRole("navigation"));
			expect(navigation.getByLabelText(/home/i)).toBeDefined();
			expect(navigation.getByLabelText(/biography/i)).toBeDefined();
			expect(navigation.getByLabelText(/skills/i)).toBeDefined();
			expect(navigation.getByLabelText(/experience/i)).toBeDefined();
			expect(navigation.getByLabelText(/cv/i)).toBeDefined();
			expect(navigation.getByLabelText(/contact/i)).toBeDefined();
		});
	});

	it("should display the navbar menu when clicking on the mobile menu button", async () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		fireEvent.click(screen.getByLabelText(/menu-mobile/i));

		await waitFor(() => {
			const navigation = within(screen.getByRole("navigation"));
			expect(navigation.getByLabelText(/home-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/biography-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/skills-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/experience-mobile/i)).toBeDefined();
			expect(navigation.getByLabelText(/cv-mobile/i)).toBeDefined();
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
		expect(screen.queryByLabelText(/home-mobile/i)).toBeNull();
	});

	it("should allow button to be clicked", () => {
		fireEvent.scroll(window, { target: { scrollY: 800 } });
		fireEvent.click(screen.getByAltText("logo"));
	});
});
