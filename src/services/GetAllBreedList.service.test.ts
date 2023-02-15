import {describe, expect, it} from "@jest/globals";

import axios from "axios";
import {GetAllBreedListService} from "./GetAllBreedList.service";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

const data = {
    "message": {
        "affenpinscher": [],
        "african": [],
    },
    "status": "success"
};

describe("Given the GetAllBreed service", () => {

    it('when it calls the service it will get all the breeds', async () => {
        //Arrange
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve({
                status: 200,
                statusText: "OK",
                data: data,
            });
        });

        //Act
        const result = await GetAllBreedListService();
        console.log(result);

        //Assert
        expect(axios.get).toHaveBeenCalledWith("https://dog.ceo/api/breeds/list/all", expect.objectContaining({
            headers: expect.objectContaining({
                "content-type": expect.any(String)
            }),
        }));
        expect(result.status).toBe(200);
        expect(result.statusText).toBe("OK");
        expect(result.data).toBeDefined();
        expect(result.data.message).toBeDefined();
        expect(result.data.message.affenpinscher).toBeDefined();
        expect(result.data.message.african).toBeDefined();
        expect(result.data.status).toBe("success");
    });

});
