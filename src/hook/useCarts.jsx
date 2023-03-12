import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteFromCart, UpdateCart, cartList, addCart } from '../api/firebase';
import { useAuthApi } from '../context/AuthContext';

const useCarts = () => {
  const queryClient = useQueryClient();
  const { uid } = useAuthApi();

  const getCarts = useQuery(['carts', uid || ''], () => cartList(uid), {
    enabled: !!uid,
  });

  const addToCarts = useMutation(({ state, opt }) => {
    return addCart(uid, state, opt);
  }, {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid])
  })

  const handlerMinus = useMutation(({ item }) => {
    if(item.quantity < 2) return;
    return UpdateCart(uid, { ...item, quantity: item.quantity - 1 });
  }, {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid])
  })

  const handlerPlus = useMutation(({ item }) => {
    return UpdateCart(uid, { ...item, quantity: item.quantity + 1 });
  }, {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid])
  }) 

  const handlerDeletion = useMutation(({ id }) => {
    return deleteFromCart(uid, id);
  }, {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid])
  }) 

  return { getCarts, addToCarts, handlerMinus, handlerPlus, handlerDeletion };
}

export default useCarts;