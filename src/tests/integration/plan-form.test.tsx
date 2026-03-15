import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlanForm } from "@/components/plan/plan-form";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("PlanForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("submits selected filters into recommendations query", async () => {
    const user = userEvent.setup();

    render(<PlanForm initialFilters={{}} />);

    await user.click(screen.getByRole("button", { name: "普通" }));
    await user.click(screen.getByRole("button", { name: "有點充實" }));
    await user.click(screen.getByRole("button", { name: "在家" }));
    await user.click(screen.getByRole("button", { name: "看今晚推薦" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/recommendations?energy=normal&intent=fulfill&location=home",
    );
  });

  it("allows toggling a selected chip off", async () => {
    const user = userEvent.setup();

    render(<PlanForm initialFilters={{ energy: "tired" }} />);

    const chip = screen.getByRole("button", { name: "很累" });
    expect(chip).toHaveAttribute("aria-pressed", "true");

    await user.click(chip);

    expect(chip).toHaveAttribute("aria-pressed", "false");
  });
});
