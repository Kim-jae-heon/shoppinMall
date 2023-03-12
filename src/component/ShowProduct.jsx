import useProducts from '../hook/useProducts';
import ProductCard from './ProductCard';

const ShowProduct = () => {
  const { getProducts: {isLoading, error, data: products} } = useProducts();
  
  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>error occured</p>;

  return (
    <ul className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
      { products && products.map((product, index) => {
        return (
          <ProductCard key={index} product={product} />
        )
      }) }
    </ul>
  )
}

export default ShowProduct;