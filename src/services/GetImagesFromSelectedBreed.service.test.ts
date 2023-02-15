import {describe, expect, it} from "@jest/globals";

import axios from "axios";
import {GetImagesFromSelectedBreed} from "./GetImagesFromSelectedBreed.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const data = {
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1126.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1270.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_907.jpg"
    ],
    "status": "success"
};

describe("Given the GetImagesFromSelectedBreed", () => {

    it('when it calls the service it will get images from the selected breed', async () => {
        //Arrange
        mockedAxios.get.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                statusText: "OK",
                data: data,
            });
        });

        //Act
        const result = await GetImagesFromSelectedBreed("hound/afghan");
        console.log(result);

        //Assert
        expect(axios.get).toHaveBeenCalledWith("https://dog.ceo/api/breed/hound/afghan/images/random/3", expect.anything());
        expect(result.status).toBe(200);
        expect(result.statusText).toBe("OK");
        expect(result.data).toBeDefined();
        expect(result.data.message).toBeInstanceOf(Array);
        expect(result.data.message.length).toBeGreaterThan(0);
        expect(result.data.status).toBe("success");
    });

});
