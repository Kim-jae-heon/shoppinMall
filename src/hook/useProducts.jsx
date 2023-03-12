import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productRead, productRegister  } from '../api/firebase';

const useProducts = () => {
  const queryClient = useQueryClient();

  const getProducts = useQuery(['products'], productRead, { staleTime: 60 * 1000 });
  const addProduct = useMutation(({ info, url }) => productRegister(info, url), {
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { getProducts, addProduct };
}

export default useProducts;