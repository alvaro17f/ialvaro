import { act, cleanup, render } from "@testing-library/react";
import { useState } from "react";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let observeMock: ReturnType<typeof vi.fn>;
let disconnectMock: ReturnType<typeof vi.fn>;
let observerCallback: (entries: { isIntersecting: boolean }[]) => void;

function HookTester({ once }: { once?: boolean }) {
	const { ref, isVisible } = useScrollReveal({ once });
	return (
		<div ref={ref} data-testid="el" data-visible={isVisible}>
			{isVisible ? "visible" : "hidden"}
		</div>
	);
}

// Component that uses the hook but never attaches the ref
function NullRefTester() {
	useScrollReveal();
	return <div>no ref</div>;
}

describe("useScrollReveal", () => {
	beforeEach(() => {
		observeMock = vi.fn();
		disconnectMock = vi.fn();
		window.IntersectionObserver = class {
			observe = observeMock;
			unobserve = vi.fn();
			disconnect = disconnectMock;
			constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
				observerCallback = cb;
			}
		} as unknown as typeof window.IntersectionObserver;
	});

	afterEach(cleanup);

	it("starts with isVisible=false", () => {
		const { getByTestId } = render(<HookTester />);
		expect(getByTestId("el").dataset.visible).toBe("false");
	});

	it("creates IntersectionObserver and observes element", () => {
		render(<HookTester />);
		expect(observeMock).toHaveBeenCalled();
	});

	it("sets isVisible=true on intersect, disconnects when once=true", () => {
		const { getByTestId } = render(<HookTester />);
		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		expect(getByTestId("el").dataset.visible).toBe("true");
		expect(disconnectMock).toHaveBeenCalled();
	});

	it("with once=false does not disconnect on intersect", () => {
		const { getByTestId } = render(<HookTester once={false} />);
		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		expect(getByTestId("el").dataset.visible).toBe("true");
		expect(disconnectMock).not.toHaveBeenCalled();
	});

	it("with once=false toggles back to false when not intersecting", () => {
		const { getByTestId } = render(<HookTester once={false} />);
		act(() => {
			observerCallback([{ isIntersecting: true }]);
		});
		act(() => {
			observerCallback([{ isIntersecting: false }]);
		});
		expect(getByTestId("el").dataset.visible).toBe("false");
	});

	it("disconnects on unmount", () => {
		const { unmount } = render(<HookTester />);
		unmount();
		expect(disconnectMock).toHaveBeenCalled();
	});

	it("handles null ref gracefully (ref not attached)", () => {
		const { container } = render(<NullRefTester />);
		expect(container.textContent).toBe("no ref");
		expect(observeMock).not.toHaveBeenCalled();
	});
});
