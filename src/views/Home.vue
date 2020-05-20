<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="user of users" :key="user.id">
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers: function () {
      const baseURI = 'https://jsonplaceholder.typicode.com/users'
      this.$http.get(baseURI)
        .then((result) => {
          this.users = result.data;
        })
    }
  }
}
</script>
