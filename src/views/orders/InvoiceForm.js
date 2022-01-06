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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import { gridSpacing } from 'store/types/common';
import SubCard from 'ui-component/cards/SubCard';
import { InputField } from 'ui-component/FormFields';
import Logo from 'ui-component/Logo';
import numberWithCommas from 'utils/number-with-commas';

export default function InvoiceForm({ productList, initialValues, onSubmit }) {
    const theme = useTheme();

    const [products, setProducts] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: initialValues
    });

    const handleSubmitForm = async (formValues) => {
        let totalAmount = 0;
        let totalPayment = 0;
        products.forEach((p) => {
            totalAmount += p.amount;
            totalPayment += p.total;
        });
        await onSubmit?.({ ...formValues, totalAmount, totalPayment, products });
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
                                            {productList?.data.map((row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell colSpan={3}>
                                                        <Typography fontWeight="bold">{row.name || '-'}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">{row.quantity || '-'}</TableCell>
                                                    <TableCell align="right">{numberWithCommas(row.price) || '-'}</TableCell>
                                                    <TableCell align="right">
                                                        <TextField
                                                            variant="outlined"
                                                            type="number"
                                                            defaultValue="0"
                                                            onChange={(e) => {
                                                                const { _id, name, price } = row;
                                                                const productsTemp = [...products];
                                                                const productIndex = productsTemp.findIndex((x) => x._id === _id);
                                                                if (productIndex !== -1) {
                                                                    productsTemp[productIndex].amount = +e.target.value;
                                                                    productsTemp[productIndex].total = +e.target.value * price;
                                                                } else {
                                                                    productsTemp.push({
                                                                        _id,
                                                                        name,
                                                                        price,
                                                                        amount: +e.target.value,
                                                                        total: +e.target.value * price
                                                                    });
                                                                }
                                                                setProducts(productsTemp);
                                                            }}
                                                            sx={{ width: 70 }}
                                                            InputProps={{ inputProps: { min: 0, max: row.quantity } }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {numberWithCommas(products.find((x) => x._id === row._id)?.total || 0)}₫
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
                                            {products.length > 0
                                                ? products.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
                                                : 0}
                                        </Typography>
                                        <Typography fontWeight="bold" fontSize="large" color="primary">
                                            Total:{' '}
                                            {products.length > 0
                                                ? numberWithCommas(
                                                      products.reduce(
                                                          (previousValue, currentValue) => previousValue + currentValue.total,
                                                          0
                                                      )
                                                  )
                                                : 0}
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
