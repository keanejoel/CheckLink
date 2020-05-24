<template>
  <div>
    <div class="login-wrapper">
      <p class="register">Don't have an account? Register <nuxt-link to="/register" >here</nuxt-link></p>
      <div class="container">
        <div class="row">
          <div class="cl-table">
            <div class="cell">
              <div class="col-md-12">
                <img src="/cl-logo.svg" alt="CheckLink" />
              </div>
              <div class="col-md-12">
                <div class="create-user" style="margin-top: 2em;">
                    <h2>Login</h2>
                    <form action="">
                      <input type="text" v-model="email" placeholder="Email" autocomplete="off" /><br>
                      <input type="password" v-model="password" placeholder="Password" autocomplete="new-password" /><br>
                      <nuxt-link @click.native="checkThePass()" to="/dashboard" class="nuxt-link">Login</nuxt-link>
                    </form>
                    <a class="forgot" href="#">Forgot Password?</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import UserService from '../api/UserService';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    //if token already exists, kick the user to their dashboard 
    mounted() {
        if ( window.localStorage.getItem('token') ) {
          this.$router.push('dashboard');
        }
    },
    methods: {
      async checkThePass() {
        let response = await UserService.checkPass(this.email, this.password);
        if (response.token) {
          console.log('we have a match');
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('email', this.email);
          this.$router.push('dashboard');
        }
        this.errors = [];
        if (!response.token) {
          this.errors.push('Invalid Email or Password.');
        }
      }
    },
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
a.forgot {
  font-weight: 600;
  color: #464040;
  display: inline-block;
}
p.register {
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 13px;
}
span.invalid {
  color: red;
}
.register-link {
  color: #007FFF;
}
button, .nuxt-link {
  margin-bottom: 2em;
  margin-left: 0 !important;
}
</style>
