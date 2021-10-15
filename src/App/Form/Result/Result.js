import s from "../../Form/Form.module.css";


export const Result = ({ result, currency, currencyOutput, actualRates }) => (
    <div className={s.resultBlock}>
        {result !== undefined && (
            <>
                <h2>
                    {result.sourceAmount.toFixed(2)}&nbsp;&nbsp;{currency}&nbsp;&nbsp;={"  "}
                    {result.targetAmount.toFixed(2)}&nbsp;&nbsp;{currencyOutput}
                </h2>
               <div>{"Актуальный курс: " + actualRates}</div>
            </>
        )}
    </div>
);

