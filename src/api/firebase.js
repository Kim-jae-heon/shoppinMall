import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import {
  getAuth, signInWithPopup, signOut, GoogleAuthProvider,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import {
  getDatabase, ref, get, child, set, update, remove
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyAmSnMBraKR7Vtji3lEoHImj_ZsTvWiGOc",
  authDomain: "shoppy-d1644.firebaseapp.com",
  databaseURL: "https://shoppy-d1644-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-d1644",
  storageBucket: "shoppy-d1644.appspot.com",
  messagingSenderId: "799725992413",
  appId: "1:799725992413:web:80671d3a738338112a9e34",
  measurementId: "G-Q0S8T3K00C"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export const login = async () => {
  return signInWithPopup(auth, provider)
    .then(result => {
      const { user } = result;
      return user;
    });
}

export const logout = async () => {
  return signOut(auth)
    .catch(console.error);
}

//onAuthStateChanged라는 함수를 밖에서 사용하지 않게끔하기 위해 managedb라는 함수로 묶어놓은 것.
export const managedb = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const userUpdate = user ? await admin(user) : null;
    callback(userUpdate);
  });
}

const admin = async (user) => {
  return get(child(ref(database), 'admins'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const admin = snapshot.val();
        const isAdmin = admin.includes(user.uid);
        return { ...user, isAdmin };
      }
      else {
        console.log('no data');
      }
    })
    .catch(console.error);
}
//firebase에 상품목록 올리기
export const productRegister = async (info, url) => {
  const productId = uuid();
  return set(ref(database, `products/${productId}`), {
    ...info,
    id: productId,
    image: url,
    options: info.options.split(','),
    price: parseInt(info.price)
  });
}
//firebase에서 상품목록 읽어오기
export const productRead = async () => {
  return get(ref(database, `products`))
    .then(snapshot => {
      const data = Object.values(snapshot.val());
      return data;
    });
}
//firebase의 cart에 담은 상품들 등록하기
export const addCart = async (uid, state, option) => {
  const { id, image, price, title } = state;
  return set(ref(database, `carts/${uid}/${state.id}`), {
    id,
    image,
    option,
    price,
    quantity: 1,
    title
  });
}

//firebase의 cart에서 상품들 불러오기
export const cartList = async (uid) => {
  return get(ref(database, `carts/${uid}`))
    .then(snapshot => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

//firebase에서 상품갯수 수정
export const UpdateCart = async (uid, item) => {
  return update(ref(database, `carts/${uid}/${item.id}`), item);
}

//firebase에서 상품 삭제
export const deleteFromCart = async (uid, id) => {
  return remove(ref(database, `carts/${uid}/${id}`));
}