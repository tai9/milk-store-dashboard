import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/types/common';

import ProductList from './ProductList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from 'apis';
import { fetchProductList, selectProductList } from 'store/slices/productSlice';

const Products = () => {
    const productList = useSelector(selectProductList);
    const dispatch = useDispatch();

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

    return (
        <MainCard title="Products" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <ProductList data={productList.data} />
        </MainCard>
    );
};

export default Products;
