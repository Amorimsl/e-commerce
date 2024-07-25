import GridProduct from '../gridProduct/gridProduct';
import { Product } from '../../context/context';

interface ProductsProps {
  products: Product[];
  visibleProducts: number;
}

const Products: React.FC<ProductsProps> = ({ products, visibleProducts }) => {
  return (
    <div>
      <section className="p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">Our Products</h1>

        <GridProduct products={products} visibleProducts={visibleProducts} />
      </section>
    </div>
  );
};

export default Products;
