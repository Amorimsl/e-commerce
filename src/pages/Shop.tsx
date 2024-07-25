import ImageCards from '../components/bgImageCards/ImageCards';
import QualityCertificate from '../components/certificate/QualityCertificate';
import GridProduct from '../components/gridProduct/gridProduct';
import { useProducts } from '../context/exportContext';
import { useEffect, useState } from 'react';
import Filter from '../assets/filters/filter.svg';
import Menu from '../assets/filters/menu.svg';
import Default from '../assets/filters/default.svg';
import ButtonGroup from '../components/ButtonGroup';
import { useParams } from 'react-router-dom';
import { Product } from '../context/context';

const Shop = () => {
  const { visibleProducts, setVisibleProducts, productsShop, setProductsShop } =
    useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const { tag } = useParams();

  const visibleShop = 16;

  setVisibleProducts(visibleShop);

  const totalPages = Math.ceil(productsShop.length / visibleProducts);
  const startIndex = (currentPage - 1) * visibleProducts;
  const endIndex = startIndex + visibleProducts;
  const currentProducts = productsShop.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data: Product[] = await response.json();

        if (tag) {
          const filtered = data.filter((product) => product.tags.includes(tag));
          setProductsShop(filtered);
        } else {
          setProductsShop(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [tag, setProductsShop]);
  return (
    <div>
      <ImageCards />

      <section className="py-12 bg-custom-bg flex md:justify-around justify-start flex-col md:flex-row ">
        <div className="flex gap-4 items-center">
          <img src={Filter} alt="filter" className="w-5 h-5" />
          <span className="text-black font-medium text-lg">Filter</span>
          <img src={Menu} className="w-5 h-5" />
          <div className="border-r border-gray-600 w-12 ">
            <img src={Default} className="w-5 h-5" />
          </div>
          <span>Showing 1-16 of 64 results</span>
        </div>
        <div className="flex gap-4 flex-col md:flex-row md:items-center">
          <div>
            <span>Show</span>
            <input type="text" className="w-12 h-12 ml-3" />
          </div>

          <div>
            <span>Short by</span>
            <input
              type="text"
              placeholder="Default"
              className="w-36 h-12 ml-3"
            />{' '}
          </div>
        </div>
      </section>

      <section className="p-8 flex flex-col items-center">
        <GridProduct
          products={currentProducts}
          visibleProducts={visibleProducts}
        />

        <ButtonGroup
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </section>
      <QualityCertificate />
    </div>
  );
};

export default Shop;
