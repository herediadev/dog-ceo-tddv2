import type {AxiosResponse} from "axios";

import React, {useState as realUseState} from 'react';
import App from './App';

import {GetAllBreedListService} from "./services/GetAllBreedList.service";
import * as MapBreedListModule from "./services/MapBreedList.service";

import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {setImmediate} from "timers";
import {act} from "react-dom/test-utils";

jest.mock("./services/GetAllBreedList.service");

/*jest.mock("react", () => {
    const actualReact = jest.requireActual('react');

    return {
        ...actualReact,
        useState: jest.fn()
    };
});*/

const GetAllBreedListServiceMock = GetAllBreedListService as jest.MockedFunction<typeof GetAllBreedListService>;

const data = {
    "message": {
        "affenpinscher": [],
        "buhund": [
            "norwegian"
        ],
        "bulldog": [
            "boston",
            "english",
            "french"
        ],
    },
    "status": "success"
};

describe('Given the App component', function () {

    test('it will render the Dog App', async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const linkElement = screen.getByText(/Dog App/i);

        //Assert
        expect(linkElement).toBeInTheDocument();
    });

    test('it will render the select element with the list of breeds', async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedSelector = screen.getByTestId("breedSelector");
        const breedOptions = screen.queryAllByTestId("breedOptions");

        //Assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedOptions.length).toBe(3);
    });

    test('it will render the bulldog sub breed when the bulldog breed has been selected', async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedSelect = screen.getByTestId("breedSelector");

        //userEvent.selectOptions(breedOptions,'bulldog');
        fireEvent.change(breedSelect, {target: {value: "bulldog"}});

        const subBreedSelector = screen.getByTestId("subBreedSelector");
        const subBreedOptions: Array<HTMLOptionElement> = screen.queryAllByTestId("subBreedOptions");

        //Assert
        expect(subBreedSelector).toBeInTheDocument();
        expect(subBreedOptions.length).toBe(3);
        expect(subBreedOptions[0].value).toBe("boston");
        expect(subBreedOptions[1].value).toBe("english");
        expect(subBreedOptions[2].value).toBe("french");
    });

    test('it will render the buhund sub breed when the buhund breed has been selected', async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedSelector = screen.getByTestId("breedSelector");

        //userEvent.selectOptions(breedOptions,'bulldog');
        fireEvent.change(breedSelector, {target: {value: "buhund"}});

        const subBreedSelector = screen.getByTestId("subBreedSelector");
        const subBreedOptions: Array<HTMLOptionElement> = screen.queryAllByTestId("subBreedOptions");

        //Assert
        expect(subBreedSelector).toBeInTheDocument();
        expect(subBreedOptions.length).toBe(1);
        expect(subBreedOptions[0].value).toBe("norwegian");
    });

    test('it will render hide the sub breed select element with the list of sub breeds when the selected breed has not sub breeds', async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        render(<App/>);

        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });
        const breedOptions = screen.getByTestId("breedSelector");

        fireEvent.change(breedOptions, {target: {value: "affenpinscher"}});

        const subBreedSelector = screen.queryByTestId("subBreedSelector");

        //Assert
        expect(subBreedSelector).not.toBeInTheDocument();
    });

    test("it will call the MapBreedList service and show the list of breeds", async () => {
        //Arrange
        GetAllBreedListServiceMock.mockImplementation(() => Promise.resolve<AxiosResponse>({
            data: data,
            headers: {},
            config: {},
            status: 200,
            request: {},
            statusText: "OK",
        }));
        jest.spyOn(MapBreedListModule, "MapBreedList");
        let spyOnSetStateFunction;
        jest.spyOn(React, "useState").mockImplementationOnce(() => {
            const [state, setState] = realUseState<any>([]);
            spyOnSetStateFunction = jest.fn((data) => setState(data));
            return [state, spyOnSetStateFunction];
        });

        render(<App/>);


        //Act
        await act(async () => {
            await new Promise(resolve => setImmediate(resolve));
        });

        const breedOptions = screen.queryAllByTestId("breedOptions");


        //Assert
        await waitFor(() => expect(GetAllBreedListServiceMock).toHaveBeenCalled());
        await waitFor(() => expect(GetAllBreedListServiceMock.mock.results[0].value).resolves.toBeDefined());
        expect(MapBreedListModule.MapBreedList).toHaveBeenCalledWith(data);
        expect(React.useState).toHaveBeenCalledTimes(4);
        expect(breedOptions.length).toBeGreaterThan(0);
    });
});
