import { renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Toggle } from "../types";
import { useKeyEvents } from "./useKeyEvents";

describe("useKeyEvents", () => {
  describe("going down!", () => {
    it("should go down if is not the last and current is completed", async () => {
      const user = userEvent.setup();
      const { result, rerender } = renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck: vi.fn(),
          isCurrentCompleted: () => true,
        })
      );

      expect(result.current.currentIndex).toBe(0);
      await user.keyboard("{ArrowDown}");
      expect(result.current.currentIndex).toBe(1);
    });
    it("should not go down if is the last element", async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 2,
          onAnswerCheck: vi.fn(),
          isCurrentCompleted: () => true,
        })
      );
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
      expect(result.current.currentIndex).toBe(1);
    });
    it("should not go down if the current element is not completed", async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck: vi.fn(),
          isCurrentCompleted: () => false,
        })
      );
      await user.keyboard("{ArrowDown}");
      expect(result.current.currentIndex).toBe(0);
    });
  });
  describe("going up!", () => {
    it("should go up if is not the first check", async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck: vi.fn(),
          isCurrentCompleted: () => true,
        })
      );

      expect(result.current.currentIndex).toBe(0);
      await user.keyboard("{ArrowDown}");
      expect(result.current.currentIndex).toBe(1);
      await user.keyboard("{ArrowUp}");
      expect(result.current.currentIndex).toBe(0);
    });
    it("should not go up if is the first check", async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck: vi.fn(),
          isCurrentCompleted: () => true,
        })
      );

      expect(result.current.currentIndex).toBe(0);
      await user.keyboard("{ArrowUp}");
      expect(result.current.currentIndex).toBe(0);
    });
  });
  describe("pressing 1 or 2", () => {
    it("should call onAnswerCheck with Yes when we press 1", async () => {
      const user = userEvent.setup();
      const onAnswerCheck = vi.fn();
      renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck,
          isCurrentCompleted: () => true,
        })
      );

      await user.keyboard("{1}");
      expect(onAnswerCheck).toBeCalledWith(Toggle.YES);
    });
    it("should call onAnswerCheck with No when we press 2", async () => {
      const user = userEvent.setup();
      const onAnswerCheck = vi.fn();
      renderHook(() =>
        useKeyEvents({
          sizeOfSteps: 4,
          onAnswerCheck,
          isCurrentCompleted: () => true,
        })
      );

      await user.keyboard("{2}");
      expect(onAnswerCheck).toBeCalledWith(Toggle.NO);
    });
  });
});
