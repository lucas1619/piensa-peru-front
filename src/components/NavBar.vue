<template>
    <nav class="nav">
        <div class="container">
            <img :src="require('@/assets/logo.png')" alt="Logo piensa peru">
            <div v-if="user" class="nav-right">
                <ul v-if="user.role === 'admin'">
                    <li>Inicio</li>
                    <li>Candidatos</li>
                    <li>Página principal de usuarios</li>
                </ul>
                <ul v-if="user.role === 'expert'">
                    <li>Inicio</li>
                    <li>Escribir publicación</li>
                </ul>
                <div :style="{
                    backgroundImage: 'url(' + user.profile_url + ')'
                }" class="profile"></div>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'NavBar',
    computed: {
        ...mapState(['user'])
    }


}
</script>

<style lang="scss" scoped>
.nav {
    background: white;
    width: 100%;
}
.nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh !important;
    img {
        height: auto;
    }
}
.nav-right {
    display: flex;
    ul {
        display: flex;
        align-items: center;

        li {
            margin-left: 20px;
        }
    }
    .profile {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #F4F4F4;
        margin-left: 20px;
        /*cover */
        background-size: cover;
        background-position: center;
    }
}
</style>