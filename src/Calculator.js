import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './Calculator.css';

export default function Calculator() {
  return (
    <div className="container-fluid">
      <div className="row ps-1">
        <div className="col-xs-12 col-md-3 mt-2">
          <p>Base Currency Value</p>
          <input
            className="border border-primary rounded"
            type="number"
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
        />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-10 col-md-1 mx-1 my-4">
          <button className="btn btn-primary btn-sm rounded px-3 me-3">Convert</button>
        </div>
        <div className="col-xs-10 col-md-1 mx-1 my-md-4 py-1 ps-md-5">
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
        </div>
        <div className="col-xs-10 col-md-3 mx-1 my-4">
          <button className="btn btn-primary btn-sm rounded px-3 me-3">Flip Conversion</button>
        </div>
      </div>
      <div className="row ps-1">
        <div className="col-xs-12 col-md-3 mt-2">
          <p>Converted Currency Amount: <br /> Value</p>
        </div>
        <div className="col-xs-12 col-md-6 mt-2 mb-5">
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
        />
        </div>
      </div>
    </div>
  )
}