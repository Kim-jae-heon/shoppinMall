import { useState } from "react";
import { upload } from "../api/upload";
import Button from '../component/Button';
import useProducts from "../hook/useProducts";

const DIV_SYTLE = 'w-2/6 flex mb-2 justify-between border-dashed border-2 p-4';
const INPUT_STYLE = 'basis-4/5 outline-none';

const NewProduct = () => {
  const [info, setInfo] = useState({
    id: '',
    image: '',
    title: '',
    price: '',
    category: '',
    description: '',
    options: '',
  });
  const { addProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    upload(info.image)
    .then(url => {
      addProduct.mutate({info, url}, {
        onSuccess: () => { console.log(info); }})
    });
  }

  const handleChange = (e) => {
    if(e.target.id === 'file') {
      return setInfo(prevInfo => ({
        ...prevInfo,
        image: e.target.files[0]
      }));
    }

    return setInfo(prevInfo => ({
      ...prevInfo,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center' >
      <img src={info.image && URL.createObjectURL(info.image)} alt={info.title} accept="image/*" className="w-2/6 mt-2" />
      <div className={DIV_SYTLE}>
        <input type="file" id='file' onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <div className={DIV_SYTLE}>
        <label htmlFor="title" >상품명</label>
        <input type="text" id='title' value={info.title} onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <div className={DIV_SYTLE}>
        <label htmlFor="category">카테고리</label>
        <input type="text" id='category' value={info.category} onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <div className={DIV_SYTLE}>
        <label htmlFor="description">상품설명</label>
        <input type="text" id='description' value={info.description} onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <div className={DIV_SYTLE}>
        <label htmlFor="options">옵션</label>
        <input type="text" id='options' value={info.options} onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <div className={DIV_SYTLE}>
        <label htmlFor="price">가격</label>
        <input type="text" id="price" value={info.price} onChange={handleChange} required className={INPUT_STYLE} />
      </div>
      <Button text={'상품등록'} width={'w-2/6'} />
    </form>
  );
}

export default NewProduct;