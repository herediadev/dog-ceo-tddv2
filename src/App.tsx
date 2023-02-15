import React, {useEffect} from 'react';
import {GetAllBreedListService} from "./services/GetAllBreedList.service";

import './App.css';
import {MapBreedList} from "./services/MapBreedList.service";
import {SelectBreedComponent} from "./components/SelectBreedComponent";
import {SubBreedSelectComponent} from "./components/SubBreedSelectComponent";
import {BreedType} from "./models/BreedType";

const App = () => {
    const [breedList, setBreedList] = React.useState<Array<any>>([]);
    const [selectedBreed, setSelectedBreed] = React.useState<string>("");

    const breedFound: BreedType = breedList.find(breed => breed.name === selectedBreed) || {
        name: "",
        subBreed: [],
    };

    useEffect(() => {
        GetAllBreedListService()
            .then(data => {
                const breedListMapped = MapBreedList(data.data);
                setBreedList([...breedListMapped]);
            });
    }, []);

    return (
        <div className="App">
            <h3>Dog App</h3>

            <SelectBreedComponent
                setSelectedBreed={setSelectedBreed}
                breedList={breedList}
            />

            <SubBreedSelectComponent
                breedFound={breedFound}
            />
        </div>
    );
};

export default App;
