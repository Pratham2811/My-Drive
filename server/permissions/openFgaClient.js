import { OpenFgaApi,OpenFgaClient } from "@openfga/sdk";
import { model } from "./authModel.js";
// const openFga=new OpenFgaClient({
//     apiUrl:process.env.OPEN_FGA_API_URL,

// });
// // const {id:storeId}=await openFga.createStore({
// //     name:"cloudmemoriesPermissions",
// // });

export const openFga=new OpenFgaClient({
    apiUrl:process.env.OPEN_FGA_API_URL,
    storeId:"01KP37AZPMVKRT7GF2KMM0K4E3"

});
const { authorization_model_id: id } = await openFga.writeAuthorizationModel(model);
console.log(id);
