import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/site/Reveal";

describe("<Reveal />", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = "0px 0px -60px 0px";
      readonly thresholds: ReadonlyArray<number> = [0.15];

      constructor(
        callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
      ) {
        observerCallback = callback as unknown as typeof observerCallback;
      }

      observe = observeMock as unknown as (target: Element) => void;
      unobserve = unobserveMock as unknown as (target: Element) => void;
      disconnect = disconnectMock as unknown as () => void;
      takeRecords = () => [];
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders children with reveal and default direction classes", () => {
    render(
      <Reveal>
        <span>Test Item</span>
      </Reveal>,
    );
    const text = screen.getByText("Test Item");
    const container = text.parentElement;
    expect(container).not.toBeNull();
    expect(container?.classList.contains("reveal")).toBe(true);
    expect(container?.classList.contains("reveal-up")).toBe(true);
  });

  it("applies directional classes and delay correctly", () => {
    render(
      <Reveal direction="left" delay={0.24}>
        <span>Left Animated</span>
      </Reveal>,
    );
    const container = screen.getByText("Left Animated").parentElement;
    expect(container?.classList.contains("reveal-left")).toBe(true);
    expect(container?.style.getPropertyValue("--reveal-delay")).toBe("0.24s");
  });

  it("adds is-visible class once and unobserves when intersecting", () => {
    render(
      <Reveal direction="right">
        <span>Right Animated</span>
      </Reveal>,
    );
    const container = screen.getByText("Right Animated").parentElement!;
    expect(container.classList.contains("is-visible")).toBe(false);
    expect(observeMock).toHaveBeenCalledWith(container);

    act(() => {
      observerCallback([{ isIntersecting: true, target: container }]);
    });
    expect(container.classList.contains("is-visible")).toBe(true);
    expect(unobserveMock).toHaveBeenCalledWith(container);
  });
});
