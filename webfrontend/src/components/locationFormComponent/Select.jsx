import React from 'react';

const Select = (props) => {
    return(
        <div className="form-group-select">

            <div className="form-group-select-label"> <label htmlFor={props.name}> {props.title} </label> </div>
            <div className="form-group-select-dropdown">
            <select
              name={props.name}
              value={props.value}
              onChange={props.onChange}
              >
              <option value="" disabled>{props.placeholder}</option>
              {props.options.map(option => {
                return (
                  <option
                    key={option}
                    value={option}
                    label={option}>{option}
                  </option>
                );
              })}
            </select>
            </div>
      </div>)
};

export default Select;
