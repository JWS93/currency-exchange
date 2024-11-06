import Select from 'react-select';
import './ExchangeTable.css';

export default function ExchangeTable() {
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
          />
        </div>
        <div className="col-xs-12 col-sm-6 mt-2">
          <button className="btn btn-primary btn-sm rounded">Convert</button>
        </div>
      </div>
      <div className="row my-3">
        <ul className="list-group col-6 ps-2">
          <li className="list-group-item"><h5>Currency</h5></li>
          <li className="list-group-item">currency here</li>
          <li className="list-group-item">currency here</li>
          <li className="list-group-item">currency here</li>
          <li className="list-group-item">currency here</li>
          <li className="list-group-item">currency here</li>
        </ul>
        <ul className="list-group col-6">
          <li className="list-group-item"><h5>Value</h5></li>
          <li className="list-group-item">value here</li>
          <li className="list-group-item">value here</li>
          <li className="list-group-item">value here</li>
          <li className="list-group-item">value here</li>
          <li className="list-group-item">value here</li>
        </ul>
      </div>
    </div>
  )
}