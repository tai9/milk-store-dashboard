import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import ProductList from './ProductList';

const Products = () => (
    <MainCard title="Products" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
        <ProductList />
    </MainCard>
);

export default Products;
