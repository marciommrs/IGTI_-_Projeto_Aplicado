import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';

import './styles.css';

export default function TextArea(props) {
  //const height = props.height;

  return (
    <>
      <MaterialTextField 
          id={props.id}
          label={props.label}
          variant="outlined" 
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          rows={4}
          multiline 
          InputLabelProps={{
            shrink: true,
            //style: {
            //height,
            //   },
        }}/>
    </>
  );
}