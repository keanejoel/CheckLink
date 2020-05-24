<template>
  <div>
    <div class="container-fluid">
        <div class="row">
            <div class="cl-table">
                <div class="cell">
                    <div class="col-md-12">
                        <img alt="CheckLink" src="../static/cl-logo.svg" />
                        <h2>Welcome, {{users.first}} {{users.last}}!</h2>
                        <p>Your email is: {{users.email}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Dashboard',
        data() {
            return {
                users: [],
                email: ''
            }
        },
        mounted() {
            // if email exists in local storage, run axios GET request 
            if (window.localStorage.email) {
                this.email = window.localStorage.email;
                const loginURL = `http://localhost:3000/api/session?email=${this.email}`;
                axios.get(loginURL)
                    .then(response => {
                        this.users = response.data;
                    })
            }
            // if token doesn NOT exist, kick them to the login screen
            if ( !window.localStorage.getItem('token') ) {
                this.$router.push('login');
            }
        }
        // async created() {
        //     // let response = await UserService.loginUser(this.email);
        //     // if (response.token) {
        //     //     window.localStorage.setItem('token', response.token);
        //     //     window.localStorage.getItem('email', this.email);
        //     //     this.$router.push('dashboard');
        //     //     console.log(this.email);
        //     // }
        //     //let email = window.localStorage.getItem('email', this.email);
        // }
    }
</script>

<style scoped>
    #header img { width: 50px; }
    h1 { color: #000000; }
    img { width: 81px; }
</style>
