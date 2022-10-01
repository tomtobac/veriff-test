import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Toggle } from "../../types";
import { Check } from "./Check";

const noop = () => {};

describe("Check", () => {
  it("should disable options when the Check is disabled", async () => {
    const mock = vi.fn();
    render(
      <Check
        title="test"
        checkId="aaa"
        hasFocus={false}
        disabled={true}
        onChange={mock}
      />
    );

    const button = screen.getByLabelText(Toggle.YES);
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(mock).not.toBeCalled();
    expect(screen.getByTitle("test")).toHaveClass("Check--is-disabled");
  });
  it('should have a class "Check--has-focus" when is focused', () => {
    render(
      <Check
        title="test"
        checkId="aaa"
        hasFocus={true}
        disabled={false}
        onChange={noop}
      />
    );
    expect(screen.getByTitle("test")).toHaveClass("Check--has-focus");
  });
});
