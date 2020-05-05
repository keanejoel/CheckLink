import axios from 'axios';

const url = 'http://localhost:3000/api/users/';

class UserService {

  // get users
  static getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data
        )
      }
      catch(err) {
        reject(err);
      }
    });
  }

  // Create User
  static insertUser(id, email, password, joined) {
      return axios.post(url, {
        id,
        email,
        password,
        joined
      });
  }
}

export default UserService;