import axios from "axios";
import { render, screen } from "@testing-library/react"

// Components
import UserList from "../component/UserList/UserList";
import Loader from "../component/HOC/Loader/Loader";
import { baseUrl } from "../service/API/Server/Server";

// Zustand Component
import { responseType } from "../utils/Zustand/UserStore/UserStoreTypes";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
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

