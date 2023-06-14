import { getHeadquarterInventory } from "../../api/green_wheels.api"
import { useState, useEffect } from "react"
import { setIn } from "formik";

export const CheckInventory = () => {

    const [inventory, setInventory] = useState([]);

    useEffect(()=>
    {
        async function requestInventory() {
            try {
                const response = await getHeadquarterInventory(1);
                if (response.status >= 200 && response.status <= 299) {
                    console.log("Successful request");
                    setInventory(response.data);
                    console.log(inventory);
                } else {
                    console.log("Error while requesting");
                }
            } catch (error) {
                console.log(error);
            }
        }
        requestInventory();
    }, []);

    return <div>
        <h2>INVENTARIO (revisar consola)</h2>
    </div>
}