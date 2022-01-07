import { Button, CircularProgress, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from 'store/types/common';
import { DatePickerField, InputField, NumberFormatField } from 'ui-component/FormFields';

export default function ProductForm({ initialValues, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: initialValues
    });

    const handleSubmitForm = async (formValues) => {
        await onSubmit?.(formValues);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <PerfectScrollbar component="div">
                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        <InputField name="name" control={control} label="Name" autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberFormatField name="price" control={control} label="Price" />
                    </Grid>
                    <Grid item xs={12}>
                        <NumberFormatField name="quantity" control={control} label="Quantity" />
                    </Grid>
                    <Grid item xs={12}>
                        <DatePickerField name="expiryDate" control={control} label="Expiry Date" />
                    </Grid>
                </Grid>
            </PerfectScrollbar>

            <Stack direction="row" spacing={2} justifyContent="center" p={2}>
                <Button fullWidth type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting && <CircularProgress size={16} />} &nbsp; save
                </Button>
            </Stack>
        </form>
    );
}
