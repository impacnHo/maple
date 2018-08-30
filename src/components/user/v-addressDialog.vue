<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn outline small fab color="blue darken-3" slot="activator">
      <v-icon dark>{{icon}}</v-icon>
    </v-btn>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex lg12 md12 sm12 xs12>
                <v-text-field label="姓名" required v-model="data.name" :rules="[rules.nameRule]"></v-text-field>
              </v-flex>
              <v-flex lg12 md12 sm12 xs12>
                <v-text-field label="地址" required v-model="data.address" :rules="[rules.addressRule]"
                              :counter="40"></v-text-field>
              </v-flex>
              <v-flex lg12 md12 sm12 xs12>
                <v-text-field label="联系电话" required v-model="data.tel" :rules="[rules.telRule]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" flat @click="dialog = false">取消</v-btn>
          <v-btn :disabled="!valid" color="blue darken-3" flat @click="submit">提交</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "v-addressDialog",
    props: ['title', 'icon', 'id', 'name', 'address', 'tel', 'method'],
    data() {
      return {
        dialog: false,
        valid: true,
        rules: {
          nameRule: value => (value.length > 1 && value.length < 5) || '姓名长度必须为2-4',
          addressRule: value => (value.length > 10 && value.length < 40) || '地址长度必须为10-40',
          telRule: value => (/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) || '请填写正确的手机号码',
        },
        data: {
          id: 0,
          name: '',
          address: '',
          tel: ''
        }
      }
    },
    methods: {
      submit() {
        // 校验
        if (this.canSubmit === false) {
          alert('请填写所有信息')
          return false
        }

        // 数据项
        let submitMethod = this.method == 'save' ? 'POST' : 'PATCH'
        let consignee
        if (submitMethod === 'POST') {
          consignee = {
            name: this.data.name,
            address: this.data.address,
            tel: this.data.tel
          }
        } else {
          consignee = {
            id: this.data.id,
            name: this.data.name,
            address: this.data.address,
            tel: this.data.tel
          }
        }

        // 提交
        let me = this
        const options = {
          method: submitMethod,
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/userConsignee/',
          data: consignee
        }

        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            console.log(response.data.message)
          } else {
            alert('认证失败')
            me.$axios.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.dialog = false
        this.$emit('refreshData')
      },
      getData() {
        this.data.id = this.id == null ? 0 : this.id
        this.data.name = this.name == null ? '' : this.name
        this.data.address = this.address == null ? '' : this.address
        this.data.tel = this.tel == null ? '' : this.tel
      }
    },
    computed: {
      canSubmit() {
        if (this.data.name === '' || this.data.address === '' || this.data.tel === '')
          return false;
        else
          return true
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>

</style>
