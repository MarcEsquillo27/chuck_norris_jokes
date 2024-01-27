<template>
  <!-- IF JOKE IS DISPLAY -->
  <div v-if="!progress_circular" class="mt-5" flat> 
      <v-row>
        <v-col cols="auto">
          Category:
        </v-col>
          <v-col cols="auto">
            <!-- SELECT CATEGORIES -->
            <v-autocomplete 
            v-model="select_category"
            :items="select_categories" 
            outlined 
            dense
            block/>
         </v-col>
         <!-- SEARCH BUTTON -->
          <v-col cols="auto">
            <v-btn @click="searchCategory(select_category)">Search</v-btn>
          </v-col>
      </v-row>
      <!-- JOKE CONTENT -->
      <v-row>
        <v-col cols="12">
          <v-card outlined v-for="(item, index) in chuck_norris_jokes" :key="index">
            <!-- DATE -->
            <v-card-subtitle>
              {{changeDateFormat(item.updated_at)}}
            </v-card-subtitle>
            <!-- JOKE -->
            <v-card-text>
              {{ item.value }}
            </v-card-text>
            <!-- LINK -->
            <v-card-text class="mb-2">
              <a style="float: right;" 
              :href="item.url" 
              target="_blank">Joke Page</a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!--ELSE NO DISPLAY YET -->
    <div v-else class="text-center">
      <v-progress-circular
      indeterminate
      color="primary"
      />
    </div>
</template>

<script>
import axios from "axios"
import moment from "moment"
export default {

  data: () => ({
    select_categories: [],
    chuck_norris_jokes:[],
    select_category:"",
    progress_circular:false
  }),
  methods:{
    //CHANGE FORMAT DATE
    changeDateFormat(val){
      return moment(val).format("YYYY-MM-DD HH:mm")
    },
    //FIRST LOAD
    getAllCategories(){
      axios({
        method:"get",
        url: "http://127.0.0.1:5000/chucknorris/categories"
      }).then((res)=>{
        this.select_categories = res.data
      }).catch((err)=>{
        alert('Something went wrong: '+ err.message)
      })
    },
    randomJoke(){
      axios({
        method:"get",
        url: "http://127.0.0.1:5000/chucknorris/random"
      }).then((res)=>{
        this.chuck_norris_jokes.push(res.data) 
      }).catch((err)=>{
        alert('Something went wrong: '+ err.message)
      })
    },


    //@CLICK FUNCTION
    async searchCategory(val){
      if(!val){
        alert("Please Select Category first!")
        return false
      }
      this.progress_circular = true
      await axios({
        method:"get",
        url: `http://127.0.0.1:5000/chucknorris/category/${val}`
      }).then((res)=>{
        
        this.chuck_norris_jokes = []
        this.chuck_norris_jokes.push(res.data) 
        this.progress_circular = false
      }).catch((err)=>{
        alert('Something went wrong: '+ err.message)
      })
    }
  },
  mounted(){
    this.getAllCategories()
    this.randomJoke()
  }
};
</script>

<style>

</style>