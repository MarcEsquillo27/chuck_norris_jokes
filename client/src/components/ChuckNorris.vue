<template>
 <v-container class="fill-height d-flex align-center justify-center">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <v-card>
          <!-- Card content here -->
          <v-card-title>Chuck Norris Jokes</v-card-title>
          <v-card-text>
            <v-tabs color="primary" v-model="tab">
              <!-- CATEGORY TAB -->
        <v-tab href="#category">Category</v-tab>
              <!-- FREE TEXT TAB -->
        <v-tab href="#free_text">Free Text</v-tab>
      </v-tabs>
      <v-tabs-items  v-model="tab">
        <!-- Category Content -->
        <v-tab-item value="category">  
            <Category 
            />          
        </v-tab-item>
        <!-- Free Text Content -->
        <v-tab-item value="free_text">  
            <FreeText 
            />  
        </v-tab-item>
      </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// importing vue files
import Category from './Category.vue'
import FreeText from './FreeText.vue'
  export default {
    components:{
      Category:Category,
      FreeText:FreeText,
    },
    name: 'ChuckNorris',

    data: () => ({
      tab:null, //v-model for tab
    }),
  }
</script>
<style scoped>
.fill-height {
  height: 100%;
}
</style>