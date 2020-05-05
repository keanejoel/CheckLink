<template>
  <div>
    <div class="register-wrapper">
      <div class="login">Already have an account? Login <nuxt-link to="/login" >here</nuxt-link></div>
      <div class="container">
        <div class="row">
          <div class="cl-table">
            <div class="cell">
              <div class="col-md-12">
                <img src="/cl-logo.svg" alt="CheckLink" />
              </div>
              <div class="col-md-12">
                <div class="create-user" style="margin-top: 2em;">
                    <h2>Sign Up</h2>
                    <form action="">
                      <input type="text" v-model="email" placeholder="Email" autocomplete="off" /><br>
                      <input type="password" v-model="password" placeholder="Password" autocomplete="new-password" /><br>
                      <nuxt-link @click.native="createUser" to="/confirmation" class="nuxt-link">Register</nuxt-link>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-12">
          <div class="user"
          v-for="(theUser, index) in users"
          v-bind:item="theUser.username"
          v-bind:index="index"
          v-bind:key="theUser.user_id"
          >
            {{theUser.username}} - {{theUser.id}} - {{theUser.password}} - {{theUser.email}}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import UserService from '../api/UserService';

  export default {
    name: 'Register',
    data() {
      return {
        users: [],
        id: '',
        email: '',
        password: ''
      }
    },
    async created() {
      try {
        this.users = await UserService.getUsers();
      } catch(err) {
        this.error = err.message;
      }
    },
    methods: {
      async createUser() {
        try {
          await UserService.insertUser(this.id, this.email, this.password);
        } catch(err) {
          this.error = err.message;
        }
      }
    }
  }
</script>

<style scoped>
.nuxt-link {
  display: inline-block;
  margin-top: 2em;
}
img {
  width: 175px;
}
input {
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size: 14px;
    margin-bottom: 2em;
    margin-top: 1em;
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
    border-bottom: 1px solid #000;
}
.login {
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 13px;
}
</style>
