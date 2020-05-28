<template>
    <div>

        <div id="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2">
                        <img alt="CheckLink" src="../static/cl-logo.svg" />
                    </div>
                    <div class="col-md-10">
                        <a href="#">Pocket</a>
                    </div>
                </div>
            </div>
        </div>

        
        <editor-content class="editor__content" :editor="editor" />
        
    </div>
</template>

<script>
    import { Editor, EditorContent} from 'tiptap'
    import axios from 'axios'
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'

    export default {
    name: 'Dashboard',
    mounted() {
        this.editor = new Editor({
            extensions: [
                new Heading({ levels: [1, 2, 3] }),
            ],
            content: '<p>This is just a boring paragraph</p>'
        })
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
    },
    components: {
        EditorContent
    },
    data() {
        return {
            users: [],
            email: '',
            editor: null
        }
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style scoped>
    #header img { width: 50px; }
    h1 { color: #000000; }
    img { width: 81px; }
</style>
