import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import "./FormStyled.js";
import s from "./Form.module.css"
import Button from "./Button/Button";
import { Result } from "./Result/Result";
import { Clock } from "./Clock/Clock";
import { Input, Loading } from "./FormStyled";

const Form = () => {

  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState("USD");
  const [currencyOutput, setCurrencyOutput] = useState("BYN");
  const [actualRates, setActualRates] = useState();
  const [result, setResult] = useState();

  const [ratesData, setRatesData] = useState(
    {
      status: "loading",
    }
  );

  const apiUrl = `https://api.exchangerate.host/latest?base=${currency}`;

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

    setTimeout(getApiDate, 1000);
  }, [currency, currencyOutput]);

  const inputRef = useRef(null);
  const deleteAmount = () => {
    setAmount([]);
  };

  const status = ratesData.status;
  const rates = ratesData.rates;


  const calculateResult = () => {
    const rate = rates[currencyOutput];
    setResult({
      sourceAmount: +amount,
      targetAmount: amount * rate,
      currency,
    });
    setActualRates(rate);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const amountTrimmed = amount.trim();
    if (!amountTrimmed) {
      return;
    }
    deleteAmount(amountTrimmed);
    calculateResult(amount, currency);
  };

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