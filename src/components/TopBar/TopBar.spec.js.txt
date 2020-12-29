// import React from "react";
// import { mount } from "enzyme";
// import { MockedProvider } from "@apollo/client/testing";
// import { GET_ME } from "../../queries/user";
// import { act } from "react-dom/test-utils";

// import { SafetyChecker } from "./SafetyChecker";

// const getMeMock = [
//   {
//     request: {
//       query: GET_ME,
//     },
//     result: {
//       data: {
//         data: {
//           getMe: {
//             id: 22,
//             name: "pacool",
//             email: "p@c.om",
//             __typename: "User",
//           },
//         },
//       },
//     },
//   },
// ];

// const getMeEmptyResponseMock = [
//   {
//     request: {
//       query: GET_ME,
//     },
//     result: {},
//   },
// ];

// const getMeErrorMock = [
//   {
//     request: {
//       query: GET_ME,
//     },
//     error: new Error("An error occurred"),
//   },
// ];

// const userMock = {
//   id: 1,
//   email: "test@email.com",
// };

// describe("SafetyChecker", () => {
//   const mountComponent = (
//     mocks,
//     children,
//     saveUserInfo = jest.fn(),
//     userLogout = jest.fn(),
//     user = null
//   ) => {
//     return mount(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <SafetyChecker
//           user={user}
//           children={children}
//           userLogout={userLogout}
//           saveUserInfo={saveUserInfo}
//         />
//       </MockedProvider>
//     );
//   };

//   test("render children element", () => {
//     const wrapper = mountComponent(
//       getMeMock,
//       <div className="children">children</div>
//     );

//     expect(wrapper.find("div.children").exists()).toBe(true);
//   });

//   describe("when error returned from GET_ME query", () => {
//     test("remove auth-token from localStorage", async () => {
//       let wrapper;

//       localStorage.setItem("auth-token", "token");

//       await act(async () => {
//         wrapper = mountComponent(getMeErrorMock);
//         await new Promise((resolve) => setTimeout(resolve, 0));
//       });

//       wrapper.update();

//       expect(localStorage.getItem("auth-token")).toBe(null);
//     });

//     test("calls userLogout", async () => {
//       let wrapper;
//       const userLogoutMock = jest.fn();

//       await act(async () => {
//         wrapper = mountComponent(getMeErrorMock, null, null, userLogoutMock);
//         await new Promise((resolve) => setTimeout(resolve, 0));
//       });

//       wrapper.update();

//       expect(userLogoutMock).toHaveBeenCalled();
//     });
//   });

//   describe("when auth-token is stored in localStorage", () => {
//     afterEach(() => localStorage.clear());

//     describe("when no user is passed as props", () => {
//       describe("when some data is returned from query", () => {
//         test("calls saveUserInfo", async () => {
//           const saveUserInfoMock = jest.fn();
//           let wrapper;

//           localStorage.setItem("auth-token", "token");

//           await act(async () => {
//             wrapper = mountComponent(getMeMock, null, saveUserInfoMock);
//             await new Promise((resolve) => setTimeout(resolve, 0));
//           });

//           wrapper.update();

//           expect(saveUserInfoMock).toHaveBeenCalled();
//         });
//       });

//       describe("when no data is returned from query", () => {
//         test("saveUserInfo is not called", async () => {
//           const saveUserInfoMock = jest.fn();
//           let wrapper;

//           localStorage.setItem("auth-token", "token");

//           await act(async () => {
//             wrapper = mountComponent(
//               getMeEmptyResponseMock,
//               null,
//               saveUserInfoMock
//             );
//             await new Promise((resolve) => setTimeout(resolve, 0));
//           });

//           wrapper.update();

//           expect(saveUserInfoMock).not.toHaveBeenCalled();
//         });
//       });
//     });

//     describe("when a user is passed as props", () => {
//       describe("when some data is returned from query", () => {
//         test("saveUserInfo is not called", async () => {
//           const saveUserInfoMock = jest.fn();
//           let wrapper;

//           localStorage.setItem("auth-token", "token");

//           await act(async () => {
//             wrapper = mountComponent(
//               getMeMock,
//               null,
//               saveUserInfoMock,
//               null,
//               userMock
//             );
//             await new Promise((resolve) => setTimeout(resolve, 0));
//           });

//           wrapper.update();

//           expect(saveUserInfoMock).not.toHaveBeenCalled();
//         });
//       });

//       describe("when no data is returned from query", () => {
//         test("saveUserInfo is not called", async () => {
//           const saveUserInfoMock = jest.fn();
//           let wrapper;

//           localStorage.setItem("auth-token", "token");

//           await act(async () => {
//             wrapper = mountComponent(
//               getMeEmptyResponseMock,
//               null,
//               saveUserInfoMock,
//               null,
//               userMock
//             );
//             await new Promise((resolve) => setTimeout(resolve, 0));
//           });

//           wrapper.update();

//           expect(saveUserInfoMock).not.toHaveBeenCalled();
//         });
//       });
//     });
//   });

//   describe("when no auth-token is stored in localStorage", () => {
//     test("saveUserInfo is not called", async () => {
//       const saveUserInfoMock = jest.fn();
//       let wrapper;

//       await act(async () => {
//         wrapper = mountComponent(getMeMock, null, saveUserInfoMock);
//         await new Promise((resolve) => setTimeout(resolve, 0));
//       });

//       wrapper.update();

//       expect(saveUserInfoMock).not.toHaveBeenCalled();
//     });
//   });
// });
