import React, { PropTypes } from 'react'
import _ from 'lodash'
import Auto from './auto'

const Form = (props) => {
  const {
    fields,
    handleSubmit,
    error,
    submitting,
    labels,
    placeholders,
    selects,
    autocomplete,
    onChangeInput
  } = props

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((name, index) => {
        const field = fields[name]
        return (
          <div key={index} className="form-group">
            <span className="control-label">{labels[index]}</span>
            {_.has(selects, name) ?
              <select
                className="form-control"
                {...field}
                value={field.value || ''}
              >
                {selects[name].map((item, i) =>
                  <option key={i} value={item.value}>{item.name}</option>)}
              </select>
              :
              <div>
                {_.has(autocomplete, name) ?
                  <Auto
                    field={field}
                    placeholder={(_.has(placeholders, index)) ? placeholders[index] : ''}
                    items={autocomplete[name]}
                    onChange={(_.has(onChangeInput, name)) ?
                      (value) => {
                        onChangeInput[name](value, props.values)
                      } : () => {}}
                  />
                  :
                  <input
                    type="text"
                    className="form-control"
                    placeholder={(_.has(placeholders, index)) ? placeholders[index] : ''}
                    {...field}
                    onChange={
                      (e) => {
                        if (_.has(onChangeInput, name)) {
                          onChangeInput[name](e.target.value, props.values)
                        }
                        field.onChange(e)
                      }
                    }
                  />
                }
              </div>
            }
            {field.touched && field.error ? field.error : ''}
          </div>
        )
      })}
      <div className="form-group">
        <div className="text-center">
          <input
            type="submit"
            className="btn btn-default"
            disabled={submitting}
            value={submitting ? '...' : 'Send transaction'}
          />
        </div>
      </div>
      {error && <div>{error}</div>}
    </form>
  )
}

Form.propTypes = {
  labels: PropTypes.array.isRequired,
  placeholders: PropTypes.array
}
Form.defaultProps = {
  placeholders: []
};

export default Form
