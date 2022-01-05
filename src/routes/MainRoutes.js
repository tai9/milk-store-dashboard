import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// products page routing
const ProductsPage = Loadable(lazy(() => import('views/products')));

// orders page routing
const OrdersPage = Loadable(lazy(() => import('views/orders')));

// orders page routing
const InvoicePage = Loadable(lazy(() => import('views/orders/Invoice')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/products',
            element: <ProductsPage />
        },
        {
            path: '/orders',
            element: <OrdersPage />
        },
        {
            path: '/orders/:invoiceId',
            element: <InvoicePage />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '*',
            element: <DashboardDefault />
        }
    ]
};

export default MainRoutes;
