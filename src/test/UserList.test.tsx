import axios from "axios";
import { act, fireEvent, getByRole, render, screen } from "@testing-library/react"
import MockAxios from "jest-mock-axios";
import { getService } from "../service/API/HttpService/HttpService";
import UserList from "../component/UserList/UserList";

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        interceptors: {
            request: { use: jest.fn(() => { }) },
            response: { use: jest.fn(() => { }) },
        },
    },
}));

const mockResponse = {
    data: {
        id: "1",
        title: "jordan",
        firstName: "billie",
        lastName: "brown",
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPRpomjqGLq5Qu0PDZSUP4MmoePonS9mXvSIC0J4EwoKec3IX5_lLCqPcXm5LJcX31B8&usqp=CAU"
    },
    limit: 0,
    page: 10,
    total: 10
}

describe("Mock Axios Action", () => {
    it("test axios user list get action", async () => {
        const apiUrl: string = `${process.env.REACT_APP_API_PATH}/user?limit=1`
        axios.get = jest.fn().mockResolvedValue(mockResponse)

        const result = await axios.get(apiUrl);
        expect(result).toEqual(mockResponse);
    });
})

