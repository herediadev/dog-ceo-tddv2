import React, {ChangeEvent, ChangeEventHandler} from "react";

interface SelectedBreedProps {
    setSelectedBreed: (selectedBreed: string) => void;
    breedList: Array<any>;
}

const SelectBreedComponent = ({setSelectedBreed, breedList}: SelectedBreedProps) => {
    const selectBreed: ChangeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(event.target.value);
    };

    return (
        <select name="breedSelector" data-testid={"breedSelector"} onChange={selectBreed}>
            {breedList.map((breed) => (
                <option data-testid={"breedOptions"} key={breed.name} value={breed.name}>{breed.name}</option>
            ))}
        </select>
    );
};

export {
    SelectBreedComponent,
}
