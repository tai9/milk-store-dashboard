import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export function InputField({ name, control, label, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid }
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
            {...inputProps}
        />
    );
}
