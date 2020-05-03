import axios from 'axios';

const url = 'https://sheltered-caverns-76264.herokuapp.com/api/users';

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
}

export default UserService;