import {fireEvent, render, screen} from "@testing-library/react";
import {SelectBreedComponent} from "./SelectBreedComponent";

describe("Given the SelectBreedComponent", () => {

    test('it will render the component with an empty breed select', () => {
        //Arrange
        const emptyBreedList: Array<any> = [];
        const selectBreed = jest.fn();

        render(<SelectBreedComponent
            setSelectedBreed={selectBreed}
            breedList={emptyBreedList}
        />);

        //Act
        const breedSelector = screen.getByTestId("breedSelector");
        const breedOptions = screen.queryAllByTestId("breedOptions");

        //Assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedOptions.length).toBe(0);

    });

    test('it will render the component with a list of breed', () => {
        //Arrange
        const breedList: Array<any> = [
            {
                name: "affenpinscher",
                subBreed: [],
            },
            {
                name: "bulldog",
                subBreed: [
                    "boston",
                    "english",
                    "french"
                ],
            },
        ];
        const selectBreed = jest.fn();

        render(<SelectBreedComponent
            setSelectedBreed={selectBreed}
            breedList={breedList}
        />);

        //Act
        const breedSelector = screen.getByTestId("breedSelector");
        const breedOptions = screen.queryAllByTestId("breedOptions");

        //Assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedOptions.length).toBe(2);

    });

    test('it will call the setBreed function when the action select breed is triggered', () => {
        //Arrange
        const breedList: Array<any> = [
            {
                name: "affenpinscher",
                subBreed: [],
            },
            {
                name: "bulldog",
                subBreed: [
                    "boston",
                    "english",
                    "french"
                ],
            },
        ];
        const selectBreed = jest.fn((selectedBreed: string) => {
            console.log("selectBreed method called with:", selectedBreed);
        });

        render(<SelectBreedComponent
            setSelectedBreed={selectBreed}
            breedList={breedList}
        />);

        //Act
        const breedSelector = screen.getByTestId("breedSelector");
        const breedOptions = screen.queryAllByTestId("breedOptions");
        fireEvent.change(breedSelector, {target: {value: "bulldog"}});

        //Assert
        expect(breedSelector).toBeInTheDocument();
        expect(breedOptions.length).toBe(2);
        expect(selectBreed).toHaveBeenCalledWith("bulldog")
    });
});
