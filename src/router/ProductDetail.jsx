import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '../component/Button';
import { useAuthApi } from "../context/AuthContext";
import useCarts from "../hook/useCarts";

const ProductDetail = () => {
  const { user } = useAuthApi();
  const { state, state: { description, image, options, price, title } } = useLocation();
  const [opt, setOpt] = useState('S');
  const navigate = useNavigate();
  const { addToCarts } = useCarts();
  
  const selectedOpt = (e) => {
    setOpt(e.target.value);
  }
  
  const addToCart = () => {
    if(user) {
      return addToCarts.mutate({ uid: user.uid, state, opt }, {
        onSuccess: () => { console.log(opt); }
      })
    }
    return navigate('/');
  }

  return (
    <section className="flex justify-around">
      <img src={image} alt={title} className="w-2/5" />
      <section>
        <h1 className="text-4xl mt-2">{title}</h1>
        <h2 className="text-2xl mt-6">{`￦${price}`}</h2>
        <h3 className="text-xl mt-2">{description}</h3>
        <div className="flex items-end border-b mb-2">
          <label htmlFor="size" className="basis-1/5">사이즈</label>
          <select id="size" className="mt-2 w-full outline-none text-center" onChange={selectedOpt}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option}>{option}</option>
              );
            })}
          </select>
        </div>
        <Button text='카트에 추가' onClick={addToCart} width={'w-full'} />
      </section>
    </section>
  );
}

export default ProductDetail;