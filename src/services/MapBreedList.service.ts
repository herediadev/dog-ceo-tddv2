const MapBreedList = (breedListFromService: any): Array<any> => {
    return Object.keys(breedListFromService.message)
        .reduce((acc, breed) => {
            acc.push({
                name: breed,
                subBreed: breedListFromService.message[breed],
            });
            return acc;
        }, [] as any);
};

export {
    MapBreedList,
}
