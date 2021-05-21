<template>
  <div data-app>
    <v-card>
      <v-data-table
          :headers="headers"
          :items="items"
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                    <v-row>
                      <template v-for="(field, key) in Object.keys(editedItem)">
                      <v-col
                          v-if="field !== 'id'"
                          :key="key"
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-checkbox
                            v-if="typeof editedItem[field] === 'boolean'"
                            v-model="editedItem[field]"
                            :label="field"
                        ></v-checkbox>
                        <v-text-field
                            v-else
                            v-model="editedItem[field]"
                            :rules="rules && rules[field] ? rules[field] : []"
                            :label="field"
                            :required="rules && rules[field]"
                        ></v-text-field>
                      </v-col>
                      </template>
                    </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                  <v-alert
                      v-if="showError"
                      dense
                      outlined
                      type="error"
                  >
                    Something went wrong. Check input data!
                  </v-alert>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
<!--          <v-btn-->
<!--              color="primary"-->
<!--              @click="initialize"-->
<!--          >-->
<!--            Reset-->
<!--          </v-btn>-->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Crud",
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    item: { type: Object, required: true},
    title: { type: String, default: 'My Crud'},
    url: { type: String, required: true},
    rules: { type: Object, default: () => {}}
  },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: this.item,
      defaultItem: this.item,
      valid: true,
      showError: false
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.axios.delete(this.url + this.items[this.editedIndex].id)
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.$refs.form.resetValidation()
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      const passValidation = this.$refs.form.validate()
      if (!passValidation) { return }
      if (this.editedIndex > -1) {
        const response = await this.axios.post(this.url + this.items[this.editedIndex].id, this.editedItem)
        Object.assign(this.items[this.editedIndex], this.normalizeUser(response.data))
      } else {
        const response = await this.axios.post(this.url, this.editedItem)
        this.items.push(this.normalizeUser(response.data))
      }
      this.close()
    },
    normalizeUser (user) {
      user.is_admin = !!user.roles.includes('ROLE_ADMIN')
      user.password = ''
      delete user.roles
      return user
    }
  },
}

</script>

<style scoped>

</style>