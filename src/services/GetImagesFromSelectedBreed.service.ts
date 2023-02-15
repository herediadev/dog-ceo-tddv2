import axios from "axios";

const GetImagesFromSelectedBreed = async (breedUrl: string) => {
    return await axios.get(`https://dog.ceo/api/breed/${breedUrl}/images/random/3`,{
        headers: {
            "content-type": "application/json",
        },
    });
};

export {
    GetImagesFromSelectedBreed,
}
