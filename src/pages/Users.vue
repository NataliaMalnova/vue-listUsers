<template>
  <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <table>
            <thead>
              <tr>
                <th @click="sort('name')">Name &#8595;</th>
                <th @click="sort('email')">Email &#8595;</th>
                <th @click="sort('website')">Website &#8595;</th>
              </tr>
            </thead>
            <tbody>
             <tr v-for="user in usersSort" :key="user.id">
                <td>
                  <!-- <img :src="user.img" :alt="user.title"> -->
                  <span>{{ user.name }}</span>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.website }}</td>
              </tr>
            </tbody>
          </table>

          <p style="text-align:center;">
            <span> Сортировка по полю: {{ currentSort }}, Направление сортировки: {{ currentSortDir }} </span>
          </p>
           <p style="text-align:center;" class="navigate">
            <span>{{ this.page.current }}</span> - <span>{{ this.page.length }}</span>
          </p>

        </div>
      </section>
      <section>
      <div class="contaier">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage"> &#8592; </div>
          <div class="btn btnPrimary" @click="nextPage"> &#8594; </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 4
      }
    }
  }, 
  created() {
    axios
      .get('http://jsonplaceholder.typicode.com/users')
        .then(response => {
          console.log(response.data)
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
    // this.users = [
    //   { id: 1, name: 'Jack', age: 22, gender: 'male' },
    //   { id: 2, name: 'Alex', age: 24, gender: 'male' }
    // ]
  },
  computed: {
    usersSort () {
      return this.users.sort((a, b) => {
        let mod = 1
        if (this.currentSortDir === 'desc') mod = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      }).filter((row, index) => {
        let start = (this.page.current-1)*this.page.length
        let end = this.page.current * this.page.length
        if (index >= start && index < end) return true
      })
    }
  },
  methods: {
    sort (e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    // Pagination
    prevPage () {
      if (this.page.current > 1) this.page.current-=1
    },
    nextPage () {
      if ((this.page.current * this.page.length) < this.users.length) this.page.current+=1
    }
  }
  
}
</script>
  
<style lang="scss" scoped>
  tbody, th{
    width: 100%;
  }
  tr{
    display: flex;
    justify-content: space-between;
  }
  td{
    width: 100%;
    display: flex;
    flex-grow: 0;
  }
  .navigate{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      //padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      margin: 8px; 
      border-radius: 5px;
      background: #eee;
    }
  }
  .button-list {
  width: 100%;
  text-align: center;

  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
  
}
</style>