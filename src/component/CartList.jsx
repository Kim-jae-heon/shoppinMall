import { AiOutlinePlusCircle, AiOutlineMinusCircle  } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import useCarts from '../hook/useCarts';

const CartList = ({ item }) => {
  const { image, id, option, price, quantity, title } = item;
  const { handlerMinus, handlerPlus, handlerDeletion }
  = useCarts();

  const quantityHandlerMinus = () => {
    handlerMinus.mutate({ item }, {
      onSuccess: () => { console.log(item); }
    })
  }

  const quantityHandlerPlus = () => {
    handlerPlus.mutate({ item }, {
      onSuccess: () => { console.log(item); }
    })
  }

  const deletionHandler = () => {
    handlerDeletion.mutate({ id });
  }

  return (
    <li key={id} className='w-3/5 flex my-1' >
      <img src={image} alt={title} className='w-60' />
      <div className='ml-24'>
        <p className='text-3xl mt-1'>{title}</p>
        <p className='text-2xl mt-1'>￦{price}</p>
        <p className='text-xl mt-1'>Size: {option}</p>
        <div className='flex items-center text-xl mt-1'>
          <p onClick={quantityHandlerMinus}><AiOutlineMinusCircle /></p>
          <p className='mx-2'>{quantity}</p>
          <p onClick={quantityHandlerPlus}><AiOutlinePlusCircle /></p>
          <p onClick={deletionHandler} className='ml-2'><IoTrashOutline /></p>
        </div>
      </div>
    </li>
  )
}

export default CartList;