import axios from 'axios';
import getFormData from './getFormData';

const signup = (
  event,
  createFlashMessage,
  setUser,
  history
)  => {
  event.preventDefault();
  const object = getFormData(event);

  axios.post(process.env.REACT_APP_PATH_TO_SERVER + "sign_up", object)
  .then(res => {
    if (res.data.success) {
      setUser({
        ...res.data.data,
        accessToken: res.headers["access-token"],
        client: res.headers.client
      });
      history.push("/");
    }
  })
  .catch((err) => {
    createFlashMessage(err.response.data.errors.full_messages[0], "danger")
  });
  }

export default signup;
