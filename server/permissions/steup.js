import { OpenFgaClient } from "@openfga/sdk";

const openFga=new OpenFgaClient({
    apiUrl:process.env.OPEN_FGA_API_URL,
    storeId:"01KP37AZPMVKRT7GF2KMM0K4E3"

});
console.log(openFga);
