import { OpenFgaApi,OpenFgaClient } from "@openfga/sdk";
import { model } from "./authModel.js";


export const openFga=new OpenFgaClient({
    apiUrl:process.env.OPEN_FGA_API_URL,
    storeId:process.env.FGA_MODEL_ID,
    authorizationModelId:process.env.FGA_STORE_ID
});



