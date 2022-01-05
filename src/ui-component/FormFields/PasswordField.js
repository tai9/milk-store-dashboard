import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    OutlinedInputProps,
    Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';

export function PasswordField({ name, control, label, disabled, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setShowPassword(false);
    }, [disabled]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl component="fieldset" error={invalid} fullWidth>
            <FormLabel component="legend">
                <Box ml={1} mb={1}>
                    <Typography variant="caption">{label}</Typography>
                </Box>
            </FormLabel>

            <OutlinedInput
                name={name}
                value={value}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                error={invalid}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                disabled={disabled}
                margin="dense"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                {...inputProps}
            />

            <Box ml={1}>
                <FormHelperText>{error?.message}</FormHelperText>
            </Box>
        </FormControl>
    );
}
