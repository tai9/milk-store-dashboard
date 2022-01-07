import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export function DatePickerField({ name, control, label }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid }
    } = useController({
        name,
        control
    });

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
                name={name}
                label={label}
                value={value}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                error={invalid}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField size="small" {...params} />}
            />
        </LocalizationProvider>
    );
}
