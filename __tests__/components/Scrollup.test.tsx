import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Scrollup } from "src/components/Scrollup";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";

// happy-dom 20+ exposes window.scrollY as a getter-only property, so it can no
// longer be assigned via the event target. Shadow it on the window instance
// instead (configurable so afterEach can restore the original getter).
function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    value,
    configurable: true,
    writable: true,
  });
}

describe("<Scrollup />", () => {
  afterEach(() => {
    cleanup();
    delete (window as unknown as { scrollY?: number }).scrollY;
  });

  it("should appear if scrollY > 400", () => {
    render(<Scrollup />);
    expect(screen.queryByLabelText("Scroll to top")).toBeNull();
    setScrollY(401);
    fireEvent.scroll(window);
    expect(screen.queryByLabelText("Scroll to top")).not.toBeNull();
  });

  it("should NOT appear if scrollY < 400", () => {
    render(<Scrollup />);
    setScrollY(399);
    fireEvent.scroll(window);
    expect(screen.queryByLabelText("Scroll to top")).toBeNull();
  });

  it("clicks button and scrolls to top", () => {
    const scrollToSpy = vi.spyOn(document.documentElement, "scrollTo").mockImplementation(() => {});
    render(<Scrollup />);
    setScrollY(401);
    fireEvent.scroll(window);
    const btn = screen.getByLabelText("Scroll to top");
    fireEvent.click(btn);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollToSpy.mockRestore();
  });
});
