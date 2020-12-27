import React from "react";
import { mount } from "enzyme";
import { Practice } from "./Practice";
import { GET_QUESTIONS } from "../../queries/practice";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "1",
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const mockGetQuestions = [
  {
    request: {
      query: GET_QUESTIONS,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        getTree: {
          name: "cvbcvb",
          branches: [
            {
              leaves: [
                { id: 15, name: "", translation: "" },
                { id: 16, name: "", translation: "" },
                { id: 17, name: "", translation: "" },
                { id: 18, name: "", translation: "" },
              ],
            },
            {
              leaves: [
                { id: 19, name: "f", translation: "f" },
                { id: 20, name: "e", translation: "r" },
                { id: 21, name: "3", translation: "r" },
                { id: 22, name: "r", translation: "3" },
              ],
            },
            {
              leaves: [
                { id: 23, name: "d", translation: "d" },
                { id: 24, name: "d", translation: "w" },
                { id: 25, name: "w", translation: "dw" },
                { id: 26, name: "w", translation: "w" },
                { id: 27, name: "e", translation: "e" },
              ],
            },
          ],
          importedBy: [{ userId: { id: 17 } }],
        },
      },
    },
  },
];

const user = {
  email: "hola",
  id: 1,
  name: "wild rift",
};

describe("Practice", () => {
  describe("when leaves are loaded", () => {
    test("", async () => {
      let wrapper;

      await act(async () => {
        wrapper = mount(
          <MockedProvider mocks={mockGetQuestions} addTypename={false}>
            <Practice />
          </MockedProvider>
        );
        // Wait until the query is resolved

        wrapper.update();
      });
    });
  });
});
