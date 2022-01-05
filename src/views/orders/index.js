import { ordersApi } from 'apis';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList, selectProductList } from 'store/slices/productSlice';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import OrderList from './OrderList';

const Orders = () => {
    const productList = useSelector(selectProductList);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await ordersApi.getAll();
                console.log(response);

                dispatch(fetchProductList(response));
            } catch (error) {
                console.log('Failed to fetch order list', error);
            }
        })();
    }, [dispatch]);

    return (
        <MainCard title="Orders" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <OrderList data={productList.data} />
        </MainCard>
    );
};

export default Orders;
