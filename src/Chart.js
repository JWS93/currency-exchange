import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';

function Chart({baseCurrencyType, convertedCurrencyType, render}) {
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
  const options = {
    animation: false,
  }
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
    })
    .catch(error => console.error(error.message));
    if(render === true) {
      setChartData({
        ...chartData,
        labels: dateData,
        datasets: [
          {
            label: {baseCurrencyType}/{convertedCurrencyType},
            data: rateData,
            fill: false,
            tension: 0,
          }
        ]
      });
      return(
        <Line data={chartData} options={options} />
      )
    }
  }
}

export default Chart;