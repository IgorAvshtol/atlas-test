import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import "./FormStyled.js";
import s from "./Form.module.css"
import Button from "./Button/Button";
import { Result } from "./Result";
import { Clock } from "./Clock/Clock";
import { Input, Loading} from "./FormStyled";

const Form = () => {

  const [amount, setAmount] = useState("EUR");
  const [amountOutput, setAmountOutput] = useState("EUR");
  const [currency, setCurrency] = useState("EUR");
  const [currencyOutput, setCurrencyOutput] = useState("USD");
  const [actualRates, setActualRates] = useState();
  const [result, setResult] = useState();


  useEffect(()=>{
    setCurrency('EUR')
  },[])



  const [ratesData, setRatesData] = useState(
    {
      status: "loading",
    }
  );

  const apiUrl = "https://api.exchangerate.host/latest?base=${currency}";
  console.log(currency)
  console.log(apiUrl)

  useEffect(() => {
    const getApiDate = async () => {
      try {
        const response = await axios.get(apiUrl);
        const {date, rates} = response.data;

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

  const inputRef = useRef(null);
  const deleteAmount = () => {
    setAmount([]);
    setAmountOutput([]);
  };

  // const ratesData = useApiExchangesRates();
  const status = ratesData.status;
  const rates = ratesData.rates;
  const date = ratesData.date;


  const calculateResult = () => {
    // const rate = rates[currency];
    const rate = rates[currencyOutput];
    const rateOutput = rates[currencyOutput];
    console.log("axax" + rate);
    setResult({
      sourceAmount: +amount,
      targetAmount: amount * rate,
      currency,
    });
    setActualRates(rate)
    // setResultOutput({
    //     sourceAmount: +amount,
    //     targetAmount: amount * rateOutput,
    //     currencyOutput,
    // });
  }
  console.log(result)


  const onSubmit = (event) => {
    event.preventDefault();
    const amountTrimmed = amount.trim();
    // const amountTrimmedOutput = amountOutput.trim();
    if (!amountTrimmed) {
      return;
    }
    deleteAmount(amountTrimmed);
    calculateResult(amount, currency);

    // deleteAmount(amountTrimmedOutput);
    // calculateResult(amountOutput, currencyOutput);
    // inputRef.current.focus();
  };

  const onChangeCurrency = (target) => {
    setCurrency(target.value)
    const amountTrimmed = amount.trim();
    if (!amountTrimmed) {
      return;
    }
    deleteAmount(amountTrimmed);
    calculateResult(amount, currency);
    // inputRef.current.focus();
  }

  const onChangeOutputCurrency = (target) => {
    setCurrencyOutput(target.value)
    const amountTrimmed = amountOutput.trim();
    if (!amountTrimmed) {
      return;
    }
    deleteAmount(amountTrimmed);
    calculateResult(amountOutput, currencyOutput);
    // inputRef.current.focus();
  }


  return (
    <form onSubmit={onSubmit}>
      <div className={s.formBlock}>
        {status === "loading"
          ? (
            <>
              <Loading/>
              <h2 className={s.title}>Курсы валют из Центрального Европейского банка.</h2>
            </>
          )
          : status === "error" ? (
            <>
              <h2 className={s.title}>Попробуйте заново.</h2>
            </>
          ) : (
            <>
              <Clock/>
              <h2 className={s.title}>Выберите валюту, которую желаете обменять</h2>
              <Input
                as="select"
                onChange={({target}) => setCurrency(target.value)}
                // onChange={({ target }) => onChangeCurrency(target)}
                required
                value={currency}
              >
                {Object.keys(rates).map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ))}
              </Input>
              <h2 className={s.title}>Сумма для обмена</h2>
              <Input
                ref={inputRef}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                required
                value={amount}
                onChange={({target}) => setAmount(target.value)}
              />
              <h2 className={s.title}>Выберете валюту, на которую желаете обменять</h2>
              <Input
                as="select"
                onChange={({target}) => setCurrencyOutput(target.value)}
                // onChange={({ target }) => onChangeOutputCurrency(target)}
                required
                value={currencyOutput}
              >
                {Object.keys(rates).map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ))}
              </Input>
              <Button
                buttonName="Рассчитать"
              />
              <Result
                result={result}
                currency={currency}
                currencyOutput={currencyOutput}
                actualRates={actualRates}
              />

            </>
          )}
      </div>
    </form>
  );
};

export default Form;