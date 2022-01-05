import { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

// material-ui
import {
    Chip,
    Stack,
    Grid,
    Typography,
    Link,
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useParams } from 'react-router';
import { ordersApi } from 'apis';
import Logo from 'ui-component/Logo';
import { useTheme } from '@emotion/react';

export const getInvoiceStatus = (status, theme) => {
    switch (status) {
        case 'Completed':
            return theme.palette.success.dark;
        case 'Processing':
            return theme.palette.primary.main;
        case 'Canceled':
            return theme.palette.error.dark;
        default:
            return theme.palette.primary.dark;
    }
};

const Invoice = () => {
    const theme = useTheme();
    const componentRef = useRef(null);

    const [orderDetails, setOrderDetails] = useState({});
    const { invoiceId } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const response = await ordersApi.getById(invoiceId);
                console.log(response);
                setOrderDetails(response);
            } catch (error) {
                console.log('Failed to fetch order list', error);
            }
        })();
    }, [invoiceId]);

    const reactToPrintContent = useCallback(() => componentRef.current, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: `Invoice #${orderDetails.seqId}`,
        removeAfterPrint: true
    });

    return (
        <MainCard title="Order Details" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <Box width="750px" margin="auto">
                <SubCard
                    ref={componentRef}
                    title={
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography component="h3" variant="h4" fontWeight="bold">
                                Invoice #{orderDetails.seqId}
                            </Typography>
                            <Logo />
                        </Stack>
                    }
                >
                    <Stack spacing={5}>
                        <Stack spacing={1}>
                            <Typography fontWeight="bold">Milk Store Inc</Typography>
                            <Typography>TP HCM</Typography>
                            <Link href="#">milkstore@gmail.com</Link>
                            <Typography>(+84) 99999999</Typography>
                        </Stack>
                        <Stack direction="row" spacing={20}>
                            <Stack spacing={1} minWidth={100}>
                                <Typography fontWeight="bold">Customer</Typography>
                                <Typography>{orderDetails.customerName}</Typography>
                                <Typography>TP HCM</Typography>
                                <Typography>(+84) 99999999</Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography fontWeight="bold">Order Details</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <Typography>Date</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{moment(orderDetails.created_date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Chip
                                            size="small"
                                            label={orderDetails.status || 'Active'}
                                            sx={{
                                                color: theme.palette.background.default,
                                                bgcolor: getInvoiceStatus(orderDetails.status, theme)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>Order Id:</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Link href="#" color="inherit">
                                            #{orderDetails.seqId}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>

                        <Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                PRODUCT NAME
                                            </TableCell>
                                            <TableCell align="right">QUANTITY</TableCell>
                                            <TableCell align="right">PRICE</TableCell>
                                            <TableCell align="right">TOTAL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetails?.products?.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell colSpan={3}>
                                                    <Typography fontWeight="bold">{row.name}</Typography>
                                                </TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>

                        <Box>
                            <SubCard sx={{ background: theme.palette.primary.light, textAlign: 'right' }}>
                                <Typography fontWeight="bold" color="primary">
                                    Total: {orderDetails.totalPayment}
                                </Typography>
                            </SubCard>
                        </Box>
                    </Stack>
                </SubCard>

                <Stack justifyContent="center">
                    <Button
                        onClick={() => {
                            handlePrint();
                        }}
                        variant="contained"
                        sx={{ width: 'fit-content', margin: '1rem auto' }}
                    >
                        Print
                    </Button>
                </Stack>
            </Box>
        </MainCard>
    );
};
export default Invoice;
