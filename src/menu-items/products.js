// assets
import { IconMilk } from '@tabler/icons';

// constant
const icons = { IconMilk };

// ==============================|| PRODUCTS PAGE||============================== //

const products = {
    id: 'products',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/products',
            icon: icons.IconMilk,
            breadcrumbs: false
        }
    ]
};

export default products;
