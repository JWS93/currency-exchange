import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './Calculator.css';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend);

export default function Calculator({options}) {
  const [baseCurrencyType, setBaseCurrencyType] = useState('');
  const [baseCurrencyValue, setBaseCurrencyValue] = useState('');
  const [convertedCurrencyType, setConvertedCurrencyType] = useState('');
  const [convertedCurrencyValue, setConvertedCurrencyValue] = useState('');
  const [render, setRender] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: false,
        tension: 0,
      }
    ]
  });
  const [dateData, setDateData] = useState([]);
  const [rateData, setRateData] = useState([]);


  const baseCurrencyChange = (baseCurrencyType) => {
    setBaseCurrencyType(baseCurrencyType);
  };

  const convertCurrencyChange = (convertedCurrencyType) => {
    setConvertedCurrencyType(convertedCurrencyType);
  };

  const handleBaseValueChange = (event) => {
    let newValue = event.target.value;
    if (newValue !== '0') {
      newValue = newValue.replace(/^0+/, '');
    }

    setBaseCurrencyValue(newValue);
  }


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
    setRender(true);
  };


  const handleFlip = () => {
    setBaseCurrencyType(convertedCurrencyType);
    setConvertedCurrencyType(baseCurrencyType);
    setBaseCurrencyValue(convertedCurrencyValue);
    setConvertedCurrencyValue(baseCurrencyValue);
  };


  useEffect(() => {
    if(baseCurrencyType && convertedCurrencyType !== '') {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
      const quote = convertedCurrencyType.value
      const base = baseCurrencyType.value
      fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        let dates = Object.keys(data.rates);
        let rates = Object.values(data.rates).map(rate => rate[quote]);
        setDateData(dates);
        setRateData(rates);
        setChartData({
          ...chartData,
          labels: dateData,
          datasets: [
            {
              label: `${base}/${quote}`,
              data: rateData,
              fill: false,
              tension: 0,
              borderColor: 'rgb(13, 110, 253)',
            }
          ]
        });
      })
      .catch(error => console.error(error.message));
    }
  }, [handleClick]);

  function Chart({render, chartData}) {
    const options = {
        animation: false,
        title: {
          display: true,
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      }
    if(render === true) {
      return(
        <Line data={chartData} options={options} className="mt-3"/>
      )
    }
  }


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
            readOnly
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
          placeholder="Select Conversion Currency"
          value={convertedCurrencyType}
          onChange={convertCurrencyChange}
          options={options}
        />
        </div>
      </div>
      <div className="row px-2 my-3">
        <div className="col-md-9 col-xs-12 mb-5">
          <Chart render={render} chartData={chartData} />
        </div>
      </div>
    </div>
  )
}