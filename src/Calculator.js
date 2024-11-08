import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './Calculator.css';

export default function Calculator({options}) {
  const [baseCurrencyType, setBaseCurrencyType] = useState('');
  const [baseCurrencyValue, setBaseCurrencyValue] = useState('');
  const [convertedCurrencyType, setConvertedCurrencyType] = useState('');
  const [convertedCurrencyValue, setConvertedCurrencyValue] = useState('');

  const baseCurrencyChange = (baseCurrencyType) => {
    setBaseCurrencyType(baseCurrencyType);
  };

  const convertCurrencyChange = (convertedCurrencyType) => {
    setConvertedCurrencyType(convertedCurrencyType);
  };

  const handleBaseValueChange = (event) => {
    setBaseCurrencyValue(Number(event.target.value));
  };


  const convert = (to, from, amount) => {
    fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
    .then((response) => response.json())
    .then((data) => {
      const convertedValue = (amount * data.rates[to]).toFixed(2);
      setConvertedCurrencyValue(Number(convertedValue));
    }).catch((error) => {
      alert('Please ensure all categories are filled in and you are not using two of the same currency selections.')
      console.log(error);
    });
  };

  const handleClick = () => {
    const from = (baseCurrencyType.value);
    const to = (convertedCurrencyType.value);
    const amount = baseCurrencyValue;
    convert(to, from, amount);
  };

  const handleFlip = () => {
    setBaseCurrencyType(convertedCurrencyType);
    setConvertedCurrencyType(baseCurrencyType);
    setBaseCurrencyValue(convertedCurrencyValue);
    setConvertedCurrencyValue(baseCurrencyValue);
  };

  return (
    <div className="container-fluid">
      <div className="row ps-1">
        <div className="col-xs-12 col-md-3 mt-2">
          <p>Base Currency Value</p>
          <input
            className="border border-primary rounded"
            type="number"
            value={baseCurrencyValue}
            onChange={handleBaseValueChange}
          />
        </div>
        <div className="col-xs-12 col-md-6 mt-3">
        <Select
          className="basic-single"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 65,
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
      </div>
      <div className="row">
        <div className="col-xs-10 col-md-1 mx-1 my-4">
          <button className="btn btn-primary btn-sm rounded px-3 me-3" onClick={handleClick}>Convert</button>
        </div>
        <div className="col-xs-10 col-md-1 mx-1 my-md-4 py-1 ps-md-5">
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
        </div>
        <div className="col-xs-10 col-md-3 mx-1 my-4">
          <button className="btn btn-primary btn-sm rounded px-3 me-3" onClick={handleFlip}>Flip Conversion</button>
        </div>
      </div>
      <div className="row ps-1">
        <div className="col-xs-12 col-md-3 mt-2">
          <p>Converted Currency Value </p>
          <input
            className="border border-primary rounded"
            type="number"
            value={convertedCurrencyValue}
            readonly
          />
        </div>
        <div className="col-xs-12 col-md-6 mt-3 mb-5">
        <Select
          className="basic-single"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 65,
              borderColor: "rgb(13, 110, 253)",
            }),
          }}
          isClearable
          placeholder="Select Conversion Currency"
          value={convertedCurrencyType}
          onChange={convertCurrencyChange}
          options={options}
        />
        </div>
      </div>
    </div>
  )
}