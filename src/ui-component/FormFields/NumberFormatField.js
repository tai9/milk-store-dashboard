import { Box, FormControl, FormHelperText, FormLabel, TextField, TextFieldProps, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const NumberFormatCustom = forwardRef((props, ref) => {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export function NumberFormatField({ name, control, label, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    });

    return (
        <TextField
            name={name}
            label={label}
            value={value}
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            error={invalid}
            variant="outlined"
            // margin="dense"
            // size="small"
            fullWidth
            InputProps={{
                inputComponent: NumberFormatCustom
            }}
            {...inputProps}
        />
    );
}
