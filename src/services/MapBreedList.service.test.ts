import {MapBreedList} from "./MapBreedList.service";

describe("Given the MapBreedList", () => {

    it('When it calls the service it will get the breed list mapped', () => {
        //Arrange
        const breedListFromService = {
            "message": {
                "affenpinscher": [],
                "african": [],
                "bulldog": [
                    "boston",
                    "english",
                    "french"
                ],
            },
            "status": "success"
        };
        const expected = [
            {
                name: "affenpinscher",
                subBreed: [],
            },
            {
                name: "african",
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

        //Act
        const result = MapBreedList(breedListFromService);

        //Assert
        expect(result).toEqual(expected);
    });

});
