import { ordersApi, productsApi } from 'apis';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList, selectProductList } from 'store/slices/productSlice';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import InvoiceForm from './InvoiceForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

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

const AddInvoice = () => {
    const productList = useSelector(selectProductList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await productsApi.getAll();
                console.log(response);

                dispatch(fetchProductList(response));
            } catch (error) {
                console.log('Failed to fetch product list', error);
            }
        })();
    }, [dispatch]);

    const initialValues = {
        customerName: '',
        address: '',
        status: 'Processing',
        totalAmount: 0,
        totalPayment: 0,
        products: []
    };

    const handleSubmitUserForm = async (formValues) => {
        try {
            await ordersApi.add(formValues);
            toast.success('Add invoice success');
            navigate('/orders');
        } catch (err) {
            console.log('Failed to add invoice', err);
            toast.error('Something went wrong.');
        }
    };

    return (
        <MainCard title="Add Invoice" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <InvoiceForm productList={productList} initialValues={initialValues} onSubmit={handleSubmitUserForm} />
        </MainCard>
    );
};
export default AddInvoice;
