import { productsApi } from 'apis';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList, selectProductList } from 'store/slices/productSlice';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import ProductList from './ProductList';

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
