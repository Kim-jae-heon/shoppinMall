import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>에러 페이지입니다..!</h1>
      <p>잘못된 주소를 요청하셨습니다. 올바른 주소를 입력해주세요!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>

  )
}

export default ErrorPage;

