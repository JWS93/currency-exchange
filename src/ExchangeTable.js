import { useState } from 'react';
import Select from 'react-select';
import './ExchangeTable.css';

export default function ExchangeTable({options}) {
  const [baseCurrencyType, setBaseCurrencyType] = useState('');
  const [convertedCurrencies, setConvertedCurrencies] = useState('');

  const baseCurrencyChange = (baseCurrencyType) => {
    setBaseCurrencyType(baseCurrencyType);
  }

  const convert = (base) => {
    fetch(`https://api.frankfurter.app/latest?from=${base}`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then((data) => {
      setConvertedCurrencies(data.rates);
      console.log(convertedCurrencies);
      console.log(data);
    })
  }

  const handleClick = () => {
    const base = (baseCurrencyType.value);
    convert(base);
  }

  function CurrencyList({convertedCurrencies}) {
    return (
      <ul className="list-group col-6 ps-2">
        <li className="list-group-item"><h5>Currency</h5></li>
        {Object.keys(convertedCurrencies).map((key) => (
          <li key={key} className="list-group-item">
            {key}
          </li>
        ))}
      </ul>
    )
  }

  function ValueList({convertedCurrencies}) {
    return (
      <ul className="list-group col-6">
        <li className="list-group-item"><h5>Value</h5></li>
        {Object.keys(convertedCurrencies).map((key) => (
          <li key={key} className="list-group-item">
            {convertedCurrencies[key]}
          </li>
        ))}
      </ul>
    )
  }




  return(
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-xs-12 col-sm-6 mt-1">
          <Select
            className="basic-single"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: "rgb(13, 110, 253)",
              }),
            }}
            isClearable
            placeholder="Select Base Currency"
            value={baseCurrencyType}
            onChange={baseCurrencyChange}
            options={options}
          />
        </div>
        <div className="col-xs-12 col-sm-6 mt-2">
          <button className="btn btn-primary btn-sm rounded" onClick={handleClick}>Convert</button>
        </div>
      </div>
      <div className="row my-3">
        <CurrencyList convertedCurrencies={convertedCurrencies} />
        <ValueList convertedCurrencies={convertedCurrencies}/>
      </div>
    </div>
  )
}