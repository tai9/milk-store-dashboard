import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import OrderList from './OrderList';

const Orders = () => (
    <MainCard title="Orders" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
        <OrderList />
    </MainCard>
);

export default Orders;
