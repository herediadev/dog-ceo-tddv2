import React from "react";
import {BreedType} from "../models/BreedType";

interface SubBreedSelectProps {
    breedFound: BreedType;
}

const SubBreedSelectComponent = ({breedFound}: SubBreedSelectProps) => {
    return (
        <>
            {(breedFound.subBreed.length > 0) && (
                <select name="subBreedSelector" data-testid={"subBreedSelector"}>
                    {breedFound.subBreed.map((subBreed: string) => (
                        <option data-testid={"subBreedOptions"} key={subBreed} value={subBreed}>{subBreed}</option>
                    ))}
                </select>
            )}
        </>
    );
};

export {
    SubBreedSelectComponent
}
