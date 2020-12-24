import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ME } from "../../queries/user";
import { act } from "react-dom/test-utils";

import { SafetyChecker } from "./SafetyChecker";

describe("SafetyChecker", () => {
  const mountComponent = (mocks, children, userLogout = jest.fn()) => {
    return mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SafetyChecker children={children} userLogout={userLogout} />
      </MockedProvider>
    );
  };

  test("render children element", () => {
    const mocks = [
      {
        request: {
          query: GET_ME,
        },
        result: {
          data: {
            data: {
              getMe: {
                id: 22,
                name: "pacool",
                email: "p@c.om",
                __typename: "User",
              },
            },
          },
        },
      },
    ];

    const wrapper = mountComponent(
      mocks,
      <div className="children">children</div>
    );

    expect(wrapper.find("div.children").exists()).toBe(true);
  });

  describe("when error returned from GET_ME query", () => {
    const errorMock = [
      {
        request: {
          query: GET_ME,
        },
        error: new Error("An error occurred"),
      },
    ];

    test("calls userLogout", async () => {
      let wrapper;
      const userLogoutMock = jest.fn();

      await act(async () => {
        wrapper = mountComponent(errorMock, null, userLogoutMock);
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      wrapper.update();

      expect(userLogoutMock).toHaveBeenCalled();
    });
  });
});
