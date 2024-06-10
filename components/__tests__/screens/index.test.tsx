import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LibraryScreen from "../../../app/(tabs)/index";
import { fetchLearningPathways as _fetchLearningPathways } from "@/api/fetchLearningPathways";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockData = [
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
];

jest.mock("../../../api/fetchLearningPathways.ts", () => ({
  fetchLearningPathways: jest.fn(),
}));
const fetchLearningPathways: jest.Mocked<any> = _fetchLearningPathways;

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};
let queryClient: QueryClient;

describe("LibraryScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = createTestQueryClient();
  });

  it("renders loading screen when isLoading is true", async () => {
    fetchLearningPathways.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 1000)),
    );
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders error message when isError is true", async () => {
    fetchLearningPathways.mockRejectedValue(new Error("Request failed"));
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(getByText("An error has occurred")).toBeTruthy();
    });
  });

  it("renders without errors", async () => {
    fetchLearningPathways.mockReturnValue(mockData);
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText("KS4")).toBeTruthy();
      expect(queryByText("Starting University")).toBeTruthy();
    });
  });

  it("filters the pathways by assessment", async () => {
    fetchLearningPathways.mockReturnValue(mockData);
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeFalsy();
    });

    fireEvent.press(getByText("Assessment"));

    await waitFor(() => {
      expect(getByText("Starting University")).toBeTruthy();
      expect(queryByText("KS4")).toBeFalsy();
    });
  });

  it("handles there being no pathways", async () => {
    fetchLearningPathways.mockReturnValue([]);
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText("No pathways available")).toBeTruthy();
    });
  });

  it("matches snapshot", async () => {
    fetchLearningPathways.mockReturnValue(mockData);
    const { toJSON, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <LibraryScreen />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeFalsy();
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
