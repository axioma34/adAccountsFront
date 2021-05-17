<template>
  <Crud :items="accounts" :item="item" :title="'Users'" :headers="headers" :url="url" />
</template>

<script>
import Crud from '@/components/Crud.vue'

export default {
  components: { Crud },
  name: "Users",
  data: () => ({
    headers: [
      {
        text: 'Email',
        align: 'start',
        sortable: false,
        value: 'email',
      },
      {text: 'Roles', value: 'roles', sortable: false},
      {text: 'Name', value: 'name', sortable: false},
      {text: 'Active', value: 'active', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    item: {
      email: '',
      roles: {},
      name: '',
      active: true
    },
    accounts: [],
    url: '/user/'
  }),

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const response = await this.axios.get(this.url + 'list')
        this.accounts = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style scoped>

</style>