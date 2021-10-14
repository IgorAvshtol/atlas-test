import axios from "axios";
import { useState, useEffect} from "react";



export const useApiExchangesRates = () => {
    const [ratesData, setRatesData] = useState(
        {
            status: "loading",
        }
    );

    const apiUrl = "https://api.exchangerate.host/latest?base=BYN";

    useEffect(() => {
        const getApiDate = async () => {
            try {
                const response = await axios.get(apiUrl);
                const { date, rates } = response.data;

                setRatesData(
                    {
                        date,
                        rates,
                        status: "ready",
                    }
                );

            } catch (error) {
                setRatesData(
                    {
                        status: "error"
                    });
            }
        };

        setTimeout(getApiDate, 3000);
    }, []);

    return ratesData;
};