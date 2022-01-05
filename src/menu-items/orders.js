// assets
import { IconFileInvoice } from '@tabler/icons';

// constant
const icons = { IconFileInvoice };

// ==============================|| PRODUCTS PAGE||============================== //

const orders = {
    id: 'orders',
    title: 'Orders',
    type: 'group',
    children: [
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/orders',
            icon: icons.IconFileInvoice,
            breadcrumbs: false
        }
    ]
};

export default orders;
