import { describe, expect, it, vi, beforeEach, afterEach } from "vite-plus/test";
import { cardHeight, drawJobCard, fitSubgroups, generateCV } from "src/utils/generateCV";
import { getThemeById } from "src/utils/cvThemes";

// ── Recording jsPDF mock ──
// Tracks which page every `text()` call landed on so the pagination
// behaviour (first period on page 1, continuation on page 2) is assertable.
const rec = {
  page: 1,
  texts: [] as { text: string; page: number }[],
  addPage: vi.fn(),
  output: vi.fn(() => new Blob(["pdf"], { type: "application/pdf" })),
  // Deterministic line count: 1 line per 40 characters.
  lines: (t: string) => Math.max(1, Math.ceil(String(t).length / 40)),
};

vi.mock("jspdf", () => {
  const doc = () => ({
    internal: { pageSize: { getWidth: () => 595, getHeight: () => 842 } },
    setTextColor: vi.fn(),
    setFillColor: vi.fn(),
    setDrawColor: vi.fn(),
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    setLineWidth: vi.fn(),
    text: vi.fn((t: string) => {
      rec.texts.push({ text: String(t), page: rec.page });
    }),
    textWithLink: vi.fn(),
    line: vi.fn(),
    rect: vi.fn(),
    roundedRect: vi.fn(),
    ellipse: vi.fn(),
    circle: vi.fn(),
    addImage: vi.fn(),
    addPage: vi.fn(() => {
      rec.addPage();
      rec.page += 1;
    }),
    splitTextToSize: vi.fn((t: string) => Array.from({ length: rec.lines(t) }, () => "x")),
    getTextWidth: vi.fn(() => 50),
    output: rec.output,
  });
  function jsPDF() {
    return doc();
  }
  return { jsPDF };
});

const C = {
  base: [0, 0, 0] as [number, number, number],
  surface: [10, 10, 10] as [number, number, number],
  border: [20, 20, 20] as [number, number, number],
  muted: [128, 128, 128] as [number, number, number],
  white: [240, 240, 240] as [number, number, number],
  primary: [60, 120, 200] as [number, number, number],
  accent: [200, 80, 100] as [number, number, number],
};

function makeDoc() {
  return {
    internal: { pageSize: { getWidth: () => 595, getHeight: () => 842 } },
    setTextColor: vi.fn(),
    setFillColor: vi.fn(),
    setDrawColor: vi.fn(),
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    setLineWidth: vi.fn(),
    text: vi.fn(),
    textWithLink: vi.fn(),
    line: vi.fn(),
    rect: vi.fn(),
    roundedRect: vi.fn(),
    ellipse: vi.fn(),
    circle: vi.fn(),
    addImage: vi.fn(),
    addPage: vi.fn(),
    splitTextToSize: vi.fn((t: string) => Array.from({ length: rec.lines(t) }, () => "x")),
    getTextWidth: vi.fn(() => 50),
    output: vi.fn(),
  };
}

// ── Image / DOM plumbing so generateCV can resolve assets ──
function setupEnv() {
  global.fetch = vi.fn(() =>
    Promise.resolve({ blob: () => Promise.resolve(new Blob(["img"])) }),
  ) as unknown as typeof fetch;
  class MockFileReader {
    result = "data:image/png;base64,abc";
    onloadend: (() => void) | null = null;
    readAsDataURL() {
      this.onloadend?.();
    }
  }
  vi.stubGlobal("FileReader", MockFileReader);
  vi.stubGlobal("document", {
    createElement: (tag: string) =>
      tag === "canvas"
        ? {
            getContext: () => ({
              beginPath: vi.fn(),
              arc: vi.fn(),
              closePath: vi.fn(),
              clip: vi.fn(),
              drawImage: vi.fn(),
              clearRect: vi.fn(),
            }),
            toDataURL: () => "data:image/png;base64,circular",
          }
        : null,
  });
  vi.stubGlobal(
    "Image",
    class {
      onload: (() => void) | null = null;
      constructor() {
        setTimeout(() => this.onload?.(), 0);
      }
    },
  );
}

const about = [
  {
    email: "a@b.com",
    location: "Asturias, Spain",
    languages: [{ language: "Spanish", level: "Native" }],
    education: [{ institution: "UNED", degree: "BBA", year: "2014" }],
    bio: "bio",
  },
];
const skills = [{ title: "react.js", image: "/s.svg", url: "https://x.com", featured: true }];

function exp(title: string, description: string, from = "June 2023") {
  return {
    title,
    image: "../../assets/experience/openbank.svg",
    date_from: from,
    date_to: "now",
    url: "https://openbank.es/",
    description,
  };
}

describe("cardHeight", () => {
  it("grows as subgroups are added", () => {
    const doc = makeDoc();
    const one = cardHeight(doc as never, ["# A\n\n- a"], 200, 30);
    const two = cardHeight(doc as never, ["# A\n\n- a", "# B\n\n- b"], 200, 30);
    expect(two).toBeGreaterThan(one);
  });

  it("uses the given body top padding", () => {
    const doc = makeDoc();
    const tight = cardHeight(doc as never, ["# A\n\n- a"], 200, 2);
    const loose = cardHeight(doc as never, ["# A\n\n- a"], 200, 30);
    expect(loose - tight).toBe(28);
  });

  it("is zero-body safe for an empty subgroup list", () => {
    const doc = makeDoc();
    expect(cardHeight(doc as never, [], 200, 30)).toBeGreaterThan(0);
  });
});

describe("fitSubgroups", () => {
  it("returns the longest prefix that fits", () => {
    const doc = makeDoc();
    const one = cardHeight(doc as never, ["# A\n\n- a"], 200, 30);
    expect(
      fitSubgroups(doc as never, ["# A\n\n- a", "# B\n\n- b", "# C\n\n- c"], 200, 30, one),
    ).toBe(1);
  });

  it("returns all subgroups when there is room", () => {
    const doc = makeDoc();
    expect(fitSubgroups(doc as never, ["# A\n\n- a", "# B\n\n- b"], 200, 30, 100000)).toBe(2);
  });

  it("returns 0 when nothing fits", () => {
    const doc = makeDoc();
    expect(fitSubgroups(doc as never, ["# A\n\n- a"], 200, 30, 1)).toBe(0);
  });

  it("returns 0 for an empty subgroup list", () => {
    const doc = makeDoc();
    expect(fitSubgroups(doc as never, [], 200, 30, 100000)).toBe(0);
  });
});

describe("drawJobCard", () => {
  it("returns startY + cardHeight + 14", () => {
    const doc = makeDoc();
    const job = exp("Openbank", "# A\n\n- a\n\n---\n\n# B\n\n- b");
    const h = cardHeight(doc as never, ["# A\n\n- a", "# B\n\n- b"], 200, 30);
    expect(
      drawJobCard(doc as never, C, job, ["# A\n\n- a", "# B\n\n- b"], 36, 200, 50, null, 30),
    ).toBe(50 + h + 14);
  });

  it("draws one chip per subgroup", () => {
    const doc = makeDoc();
    const job = exp("Openbank", "# A\n\n- a\n\n---\n\n# B\n\n- b");
    const before = (doc.roundedRect as never as { mock: { calls: unknown[] } }).mock.calls.length;
    drawJobCard(doc as never, C, job, ["# A\n\n- a", "# B\n\n- b"], 36, 200, 50, null, 30);
    // card frame + one frame per subgroup
    expect((doc.roundedRect as never as { mock: { calls: unknown[] } }).mock.calls.length).toBe(
      before + 3,
    );
  });

  it("always draws the company header", () => {
    const doc = makeDoc();
    const job = exp("Openbank", "# A\n\n- a");
    drawJobCard(doc as never, C, job, ["# A\n\n- a"], 36, 200, 50, null, 2);
    const drawn = (doc.text as never as { mock: { calls: unknown[][] } }).mock.calls.map(
      (c) => c[0],
    );
    expect(drawn).toContain("Openbank");
    expect(drawn).toContain("June 2023 — now");
  });
});

describe("generateCV experience pagination", () => {
  beforeEach(() => {
    rec.page = 1;
    rec.texts = [];
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("draws the first period of an oversized job on page 1", async () => {
    setupEnv();
    const urlSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");

    // Period 1 is small; period 2 is enormous, so the full card cannot fit
    // on page 1 but the first period can.
    const huge = "x".repeat(6000);
    const oversized = exp(
      "Openbank",
      `# Plexus\n\n> april 2025 - now\n\n- small task\n\n---\n\n# Knowmad Mood\n\n> june 2023\n\n- ${huge}`,
    );

    await generateCV(getThemeById("default"), [oversized], about, skills);

    const pageOf = (needle: string) => rec.texts.find((t) => t.text === needle)?.page;
    expect(pageOf("Openbank")).toBe(1);
    expect(pageOf("Plexus")).toBe(1);
    expect(pageOf("Knowmad Mood")).toBe(2);
    expect(rec.addPage).toHaveBeenCalled();

    urlSpy.mockRestore();
  });

  it("keeps a job that fits entirely on page 1", async () => {
    setupEnv();
    const urlSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");

    await generateCV(getThemeById("default"), [exp("RSI", "# Consulting\n\n- a")], about, skills);

    const pageOf = (needle: string) => rec.texts.find((t) => t.text === needle)?.page;
    expect(pageOf("RSI")).toBe(1);
    expect(rec.addPage).not.toHaveBeenCalled();

    urlSpy.mockRestore();
  });
});
