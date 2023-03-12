import CartList from '../component/CartList';
import useCarts from "../hook/useCarts";

const Cart = () => {
  const { getCarts: { data: items } } = useCarts();
  const totlaPrice = items.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0)

  return (
    <section>
      <ul className='flex flex-col items-center'>
        {items && items.map(item => {
          return <CartList item={item} key={item.id} />
        })}
      </ul>
      <div>
        상품총액 : ￦{totlaPrice}
      </div>
    </section>
  )
}

export default Cart;