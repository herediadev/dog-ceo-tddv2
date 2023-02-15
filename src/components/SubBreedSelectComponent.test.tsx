import {render, screen} from "@testing-library/react";
import {SubBreedSelectComponent} from "./SubBreedSelectComponent";

describe("Given the SubBreedSelectComponent", () => {

    test('it will render the component when there are sub breeds', () => {
        //Arrange
        const breedFound = {subBreed: ["boston", "english", "french"], name: "bulldog"};

        render(<SubBreedSelectComponent breedFound={breedFound}/>);

        //Act
        const subBreedSelector = screen.queryByTestId("subBreedSelector");
        const subBreedOptions = screen.queryAllByTestId("subBreedOptions");

        //Assert
        expect(subBreedSelector).toBeInTheDocument();
        expect(subBreedOptions.length).toBe(3);
    });

    test('it will not render the select breed component when there are no subreeds', () => {
        //Arrange
        const breedFound = {subBreed: [], name: ""};

        render(<SubBreedSelectComponent breedFound={breedFound}/>);

        //Act
        const subBreedSelector = screen.queryByTestId("subBreedSelector");

        //Assert
        expect(subBreedSelector).not.toBeInTheDocument();
    });
});
