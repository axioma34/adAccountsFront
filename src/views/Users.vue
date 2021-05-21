<template>
  <Crud :items="users" :item="item" :title="'Users'" :headers="headers" :url="url" :rules="rules"/>
</template>

<script>
import Crud from '@/components/Crud.vue'

export default {
  components: { Crud },
  name: "Users",
  data: () => ({
    headers: [
      { text: 'Id', value: 'id', align: ' d-none' },
      {
        text: 'Email',
        align: 'start',
        sortable: false,
        value: 'email',
      },
      {text: 'Name', value: 'name', sortable: false},
      {text: 'Is admin', value: 'is_admin', sortable: false},
      {text: 'Active', value: 'active', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
      { text: 'Password', value: 'password', align: ' d-none' },
    ],
    item: {
      email: '',
      is_admin: false,
      name: '',
      active: true,
      password: ''
    },
    rules: {
      email: [value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }]
    },
    users: [],
    url: '/user/'
  }),

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const response = await this.axios.get(this.url + 'list')
        response.data.forEach((user) => {
          user.is_admin = !!user.roles.includes('ROLE_ADMIN')
          user.password = ''
          delete user.roles
          this.users.push(user)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style scoped>

</style>