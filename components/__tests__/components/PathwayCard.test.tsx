import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PathwayCard } from "@/components/PathwayCard";
import { Linking } from "react-native";

const mockPathway = {
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
};

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn(),
}));

describe("PathwayCard", () => {
  it("renders without errors", () => {
    const { getByText } = render(<PathwayCard pathway={mockPathway} />);

    expect(getByText("Starting University")).toBeTruthy();
    expect(
      getByText(
        "Learn what funding is available when you start uni and how you can get the best out of it.",
      ),
    ).toBeTruthy();
    expect(getByText("Pathway - 11 min")).toBeTruthy();
  });

  it("opens pathway URL on press", () => {
    const { getByRole } = render(<PathwayCard pathway={mockPathway} />);

    fireEvent.press(getByRole("button"));

    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.blackbullion.com/pathways/starting-university-uk",
    );
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<PathwayCard pathway={mockPathway} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
