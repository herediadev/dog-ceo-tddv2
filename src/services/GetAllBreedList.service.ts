import axios from "axios";

const GetAllBreedListService = async () => {
    return await axios.get("https://dog.ceo/api/breeds/list/all", {
        headers: {
            "content-type": "application/json",
        },
    });
};

export {
    GetAllBreedListService,
}
