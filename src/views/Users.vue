<template>
  <Crud :items="accounts" :item="item" :title="'Accounts'" :headers="headers" :url="url" />
</template>

<script>
import Crud from '@/components/Crud.vue'

export default {
  components: { Crud },
  name: "Accounts",
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Status', value: 'status', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    item: {
      name: '',
      status: true
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