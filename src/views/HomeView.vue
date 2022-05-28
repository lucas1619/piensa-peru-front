<template>
  <div class="home">
    Home
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {
    if(this.$store.state.user.role === 'expert') {
      this.$router.push('/panel/publicaciones')
    }
  }
}
</script>
