import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController } from 'react-hook-form';

export function SelectField({ name, control, label, disabled, options }) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    });

    return (
        <FormControl size="small" fullWidth margin="normal" disabled={disabled} component="fieldset" error={invalid}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>

            <Select name={name} labelId={`${name}_label`} label={label} value={value} onChange={onChange} onBlur={onBlur}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
