import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LibraryScreen from "../../../app/(tabs)/index";

const mockData = {
  data: [
    {
      id: 12,
      title: "KS4",
      internal_title: "KS4",
      url: "https://www.blackbullion.com/pathways/key-stage-4",
      intro: "",
      duration: "9 min",
      image: "https://prodcontent.blackbullion.com/images/pathways/12/thumb",
      type: "pathway",
      has_summative_assessment: false,
    },
    {
      id: 24,
      title: "Starting University",
      internal_title: "Starting University",
      url: "https://www.blackbullion.com/pathways/starting-university-uk",
      intro:
        "Learn what funding is available when you start uni and how you can get the best out of it.",
      duration: "11 min",
      image: "https://prodcontent.blackbullion.com/images/pathways/24/thumb",
      type: "pathway",
      has_summative_assessment: true,
    },
  ],
  isLoading: false,
  isError: false,
};

describe("LibraryScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations
  });

  it("renders loading screen when isLoading is true", () => {
    jest
      .spyOn(require("@/hooks/useLearningPathways.tsx"), "useLearningPathways")
      .mockReturnValue({
        isLoading: true,
      });
    const { getByText } = render(<LibraryScreen />);

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders error message when isError is true", () => {
    jest
      .spyOn(require("@/hooks/useLearningPathways.tsx"), "useLearningPathways")
      .mockReturnValue({
        isError: true,
      });
    const { getByText } = render(<LibraryScreen />);

    expect(getByText("An error has occurred")).toBeTruthy();
  });

  it("renders without errors", async () => {
    jest
      .spyOn(require("@/hooks/useLearningPathways.tsx"), "useLearningPathways")
      .mockReturnValue(mockData);
    const { getByText, queryByText } = render(<LibraryScreen />);

    await waitFor(() => {
      expect(getByText("KS4")).toBeTruthy();
      expect(queryByText("Starting University")).toBeTruthy();
    });
  });

  it("filters the pathways by assessment", async () => {
    const { getByText, queryByText } = render(<LibraryScreen />);

    fireEvent.press(getByText("Assessment"));

    await waitFor(() => {
      expect(getByText("Starting University")).toBeTruthy();
      expect(queryByText("KS4")).toBeFalsy();
    });
  });

  it("handles there being no pathways", async () => {
    jest
      .spyOn(require("@/hooks/useLearningPathways.tsx"), "useLearningPathways")
      .mockReturnValue({
        data: [],
      });
    const { getByText } = render(<LibraryScreen />);

    await waitFor(() => {
      expect(getByText("No pathways available")).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<LibraryScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
