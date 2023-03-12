import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { category, image, price, title, id } = product;
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/products/${id}`, { state: product });
  }

  return (
    <li className="m-2 cursor-pointer" onClick={handleDetail} >
      <img src={image} alt={title} />
      <div className="flex justify-between">
        <p className="text-xl">{title}</p>
        <p className="text-sm opacity-80">{category}</p>
      </div>
      <p>{`￦${price}`}</p>
    </li>
  )
}

export default ProductCard;