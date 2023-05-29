import { getTestPanel } from "../../api/green_wheels.api";
import { useState, useEffect} from "react";

export const TestPnl = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getMessage() {
            try {
                const response = await getTestPanel();

                if (response.status >= 200 && response.status <= 299) {
                    setMessage(response.data.message);
                    console.log(response);
                } else {
                    console.log("An error has ocurred");
                }

            } catch (error) {
                console.log("An error has ocurred")
            }
        }
        getMessage();
    }, []);

    return (<div>
        <p>{message}</p>
    </div>);
}