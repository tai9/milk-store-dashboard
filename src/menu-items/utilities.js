// assets
import { IconPalette } from '@tabler/icons';

// constant
const icons = {
    IconPalette
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false
        }
    ]
};

export default utilities;
