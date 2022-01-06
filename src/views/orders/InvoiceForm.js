import { useTheme } from '@emotion/react';
import {
    Button,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import { gridSpacing } from 'store/types/common';
import SubCard from 'ui-component/cards/SubCard';
import { InputField } from 'ui-component/FormFields';
import Logo from 'ui-component/Logo';

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
            isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 5 && floatValue <= 10000;
            }}
            thousandSeparator
            isNumericString
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function InvoiceForm({ productList, initialValues, onSubmit }) {
    // const schemaRequired = yup
    //     .object({
    //         transactionHashes: yup.array().min(1, t('Please select transaction hash')).required(t('Please select transaction hash'))
    //     })
    //     .required();
    const theme = useTheme();

    const [amountList, setAmountList] = useState([]);
    const [totalList, setTotalList] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: initialValues
        // resolver: yupResolver()
    });

    const handleSubmitForm = async (formValues) => {
        await onSubmit?.(formValues);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box width="750px" margin="auto">
                <SubCard
                    title={
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography component="h3" variant="h4" fontWeight="bold">
                                Invoice #XXXXXX
                            </Typography>
                            <Logo />
                        </Stack>
                    }
                >
                    <PerfectScrollbar component="div">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                <InputField name="customerName" control={control} label="Customer Name" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField name="address" control={control} label="Address" />
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    PRODUCT NAME
                                                </TableCell>
                                                <TableCell align="right">QUANTITY</TableCell>
                                                <TableCell align="right">PRICE</TableCell>
                                                <TableCell align="right">AMOUNT</TableCell>
                                                <TableCell align="right">TOTAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productList?.data.map((row, idx) => (
                                                <TableRow key={row.id}>
                                                    <TableCell colSpan={3}>
                                                        <Typography fontWeight="bold">{row.name || '-'}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">{row.quantity || '-'}</TableCell>
                                                    <TableCell align="right">{row.price || '-'}</TableCell>
                                                    <TableCell align="right">
                                                        <TextField
                                                            id={row.id}
                                                            variant="outlined"
                                                            type="number"
                                                            defaultValue={0}
                                                            value={amountList[idx]}
                                                            onChange={(e) => {
                                                                setAmountList((prev) => {
                                                                    const data = [...prev];
                                                                    data[idx] = +e.target.value;
                                                                    return data;
                                                                });
                                                                setTotalList((prev) => {
                                                                    const data = [...prev];
                                                                    data[idx] = (+e.target.value * row.price) / 1000;
                                                                    return data;
                                                                });
                                                            }}
                                                            sx={{ width: 70 }}
                                                            InputProps={{ inputProps: { min: 0, max: row.quantity } }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {totalList[idx] || 0} {totalList[idx] > 0 ? '000' : ''}₫
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={12}>
                                <SubCard sx={{ background: theme.palette.primary.light, textAlign: 'right' }}>
                                    <Stack spacing={1}>
                                        <Typography fontWeight="bold">
                                            Amount:{' '}
                                            {amountList.length > 0
                                                ? amountList.reduce((previousValue, currentValue) => previousValue + currentValue)
                                                : 0}
                                        </Typography>
                                        <Typography fontWeight="bold" fontSize="large" color="primary">
                                            Total:{' '}
                                            {totalList.length > 0
                                                ? totalList.reduce((previousValue, currentValue) => previousValue + currentValue)
                                                : 0}{' '}
                                            {totalList.length > 0 &&
                                            totalList.reduce((previousValue, currentValue) => previousValue + currentValue) > 0
                                                ? '000'
                                                : ''}
                                            ₫
                                        </Typography>
                                    </Stack>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>

                    <Stack direction="row" spacing={2} justifyContent="center" p={2}>
                        <Button fullWidth type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            {isSubmitting && <CircularProgress size={16} />} &nbsp; Add Invoice
                        </Button>
                    </Stack>
                </SubCard>
            </Box>
        </form>
    );
}
