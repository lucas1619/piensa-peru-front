<template>
    <div class="login">
        <validation-observer class="form" v-slot="{ invalid }">
            <h2>Iniciar Sesión</h2>
            <form @submit.prevent="login">
                <validation-provider name="E-mail" rules="required|email" v-slot="{ errors }">
                    <input v-model="user.email" type="email" class="input-gray" id="email" placeholder="Correo">
                    <span class="error">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider name="Password" rules="required" v-slot="{ errors }">
                    <input v-model="user.password" type="password" class="input-gray" id="password" placeholder="Contraseña">
                    <span class="error">{{ errors[0] }}</span>
                </validation-provider>
                <button :disabled="invalid" class="btn-blue">Iniciar Sesión</button>
            </form>
        </validation-observer>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            users: [
                {
                    email: 'administrator@piensaperu.com',
                    password: 'administrator',
                    name: 'Lucas Moreno',
                    profile_url: 'https://scontent.flim28-1.fna.fbcdn.net/v/t39.30808-6/277575534_3105695723002460_4484264584628206518_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEXnCSSf1CYI7GXQsQbMuth2d1PcJ3r1tnZ3U9wnevW2XTWW6Jed7Xj6u62_vfnhy0_2eEF4c9dsX23wEtSMLSj&_nc_ohc=Y68W962wW3EAX89OQzn&tn=_z217WjB1uPHVkfj&_nc_ht=scontent.flim28-1.fna&oh=00_AT9LY4QNMoOhQJxgEmObV3fAVHe3zP5u4Z_sQmLA-ENUoQ&oe=629622B9',
                    role: 'admin',
                    id: 1
                },
                {
                    email: 'expert@piensaperu.com',
                    password: 'expert',
                    name: 'Gabriel Vasquez',
                    profile_url: 'https://scontent.flim28-1.fna.fbcdn.net/v/t1.18169-9/14046040_1233766163341583_8501734657531617663_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH_7br48O1JD2Zb35K7ycDwTw3NRAmfIZFPDc1ECZ8hkbX9A9nz2nmDPScwz5EEAL4AxpEqf-LAtvPXcoR5ffS1&_nc_ohc=GVThG1ayktAAX_-IkV1&_nc_ht=scontent.flim28-1.fna&oh=00_AT-auDu6Dqz0Fto6I3jsIJ1z5E6hOA4vLUZE9B3L79jBBQ&oe=62B61636',
                    role: 'expert',
                    id: 2
                },
                {
                    email: 'expert2@piensaperu.com',
                    password: 'expert2',
                    name: 'Dana Vallejos',
                    profile_url: 'https://scontent.flim28-1.fna.fbcdn.net/v/t1.6435-9/78695618_2983459298350470_260946123957469184_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHEvOcsrz5FfqNElnbZZMIF2CEIHJ0NUxvYIQgcnQ1TGwS3bDlvJJGHpDKClj339yRGpMi7EFfmqWYyat5wSFl6&_nc_ohc=7mI37UVJOwkAX_Q7lQ-&_nc_oc=AQldmsIgoOI0DtiS5K3-Jxqm3IbS28rjxOe5vnRoQymeJZ4wkMkueuX_GdyT8ke0Ay4&_nc_ht=scontent.flim28-1.fna&oh=00_AT854OD_81zl3F1VzpPXbl_v7fvXcK97VDRtXH3J7jMkhQ&oe=62B77A6D',
                    role: 'expert',
                    id: 3
                }
            ]
        }
    },
    methods: {
        login() {
            const user = this.users.find(user => user.email === this.user.email && user.password === this.user.password)
            if (user) {
                this.$store.commit('setUser', user)
                this.$store.commit('setToken', 'token')
                
                this.$router.push('/')
            } else {
                alert('Usuario o contraseña incorrectos')
            }
        }
    },
    created() {
        //if user exist in store, redirect to home
        if (this.$store.state.user) {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
        width: 30%;
        background-color: white;
        padding: 20px 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        input {
            margin: 5px 0;
            width: 100%;
        }
        button {
            margin: 20px 0;
            width: 100%;
        }
    }
}
</style>