import { BsShopWindow } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuthApi } from '../context/AuthContext';
import useCarts from '../hook/useCarts';
import Button from './Button';

const Header = () => {
  const { login, logout, user } = useAuthApi();
  const { getCarts: { data: products } } = useCarts();

  return (
    <header className='flex justify-between p-4 border-b-2'>
      <Link to='/' className='flex items-center text-2xl'>
        <BsShopWindow className='mr-4' />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center text-xl'>
        { user && <Link to='/products' className='mr-4'>Products</Link> }
        { user && (
          <div className='relative'>
            <Link to='/cart' className='mr-4'>Cart</Link>
            <p className='bg-cyan-400 w-6 h-6 rounded-full absolute bottom-4 left-6 text-center'>
              {products && products.length}
            </p>
          </div>
        ) }
        { user && user.isAdmin && <Link to='/products/new' className='mr-4'><FiEdit3 /></Link>}
        { user && <img src={user.reloadUserInfo.photoUrl} alt={user.reloadUserInfo.displayName} 
        className='rounded-full w-10' /> }
        { user && <p className='mr-4 w-full'>{user.reloadUserInfo.displayName}</p> }
        <Button text={ user ? 'LogOut' : 'LogIn' } onClick={ user ? logout : login } />
      </nav>
    </header>
  );
}

export default Header;