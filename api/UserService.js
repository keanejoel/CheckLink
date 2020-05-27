import axios from 'axios';

const url = 'https://polar-citadel-82425.herokuapp.com/api/users';

const loginURL = 'https://polar-citadel-82425.herokuapp.com/api/login';

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
  static insertUser(id, email, password) {
      return axios.post(url, {
        id,
        email,
        password
      });
  }

  // Login the User
  static checkPass(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(loginURL, { email, password } );
        const data = res.data;
        resolve(
          data
        )
      } catch(err) {
        reject(err);
      }
    });
  }

  // User session info
  static userSession(email) {
    return new Promise( async (resolve, reject) => {
      try {
        const response = await axios.get(session, {email});
        const theData = response.data;
        resolve(theData);
      } catch(err) {
        reject(err);
      }
    });
  }

}

export default UserService;