import { ordersApi } from 'apis';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList, selectOrderList } from 'store/slices/orderSlice';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import OrderList from './OrderList';

const Orders = () => {
    const orderList = useSelector(selectOrderList);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await ordersApi.getAll();
                dispatch(fetchOrderList(response));
            } catch (error) {
                console.log('Failed to fetch order list', error);
            }
        })();
    }, [dispatch]);

    return (
        <MainCard title="Orders" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <OrderList data={orderList.data} />
        </MainCard>
    );
};

export default Orders;
