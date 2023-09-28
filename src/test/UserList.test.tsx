import axios from "axios";
import { render, screen } from "@testing-library/react"

// Components
import UserList from "../component/UserList/UserList";
import Loader from "../component/HOC/Loader/Loader";
import { baseUrl } from "../service/API/Server/Server";

// Zustand Component
import { responseType } from "../utils/Zustand/UserStore/UserStoreTypes";

const mockUsedNavigate = jest.fn();

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn().mockResolvedValue(Promise.resolve("")),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    }
})
 
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

const userListGetAPISampleResponse: responseType = {
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

describe("Test User List Api Response", () => {
    const apiUrl: string = `${baseUrl}/user?limit=1`;

    beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue(userListGetAPISampleResponse)
    });

    it("get user-list data response validation", async () => {
        const result = await axios.get(apiUrl);
        expect(result).toEqual(userListGetAPISampleResponse);
    });
})

describe('Test Compoennt Loader', () => {
    let ComponentWrapped: any;

    beforeEach(() => {
        ComponentWrapped = Loader(UserList);
    });

    it('renders loading component when data has not been loaded yet', async () => {
        render(<ComponentWrapped />);
        const dotLoader = await screen.findAllByText("●");
        expect(dotLoader).toHaveLength(6);
    });
});

