<template>
  <!-- IF JOKE IS DISPLAY -->
  <div v-if="!progress_circular" class="mt-5" flat> 
      <v-row>
        <v-col cols="auto">
          Free Text:
        </v-col>
          <v-col cols="auto">
            <!-- SELECT CATEGORIES -->
            <v-text-field 
            v-model="text_category"
            outlined 
            dense
            block/>
         </v-col>
         <!-- SEARCH BUTTON -->
          <v-col cols="auto">
            <v-btn @click="searchCategory(text_category)">Search</v-btn>
          </v-col>
      </v-row>
      <v-row>
      <!-- JOKE CONTENT -->
      <v-col cols="12">
        <v-card outlined v-if="currentJokes.length > 0">
          <!-- DATE -->
          <v-card-subtitle>
            {{ changeDateFormat(currentJokes[0].updated_at) }}
          </v-card-subtitle>
          <!-- JOKE -->
          <v-card-text>
            {{ currentJokes[0].value }}
          </v-card-text>
          <!-- LINK -->
          <v-card-text class="mb-2">
            <a style="float: right;" :href="currentJokes[0].url" target="_blank">Joke Page</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- PAGINATION -->
    <v-row>
      <v-col cols="12">
        <v-btn @click="prevPage" :disabled="current_page === 1" text><v-icon>mdi-chevron-left</v-icon></v-btn>
        {{ current_page }} of {{ total_pages }}
        <v-btn @click="nextPage" :disabled="current_page === total_pages" text><v-icon>mdi-chevron-right</v-icon></v-btn>
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
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    select_categories: [],
    chuck_norris_jokes: [],
    text_category: "",
    progress_circular: false,
    current_page: 1,
    items_per_page: 1, // Adjusted to display one joke per page
  }),
  computed: {
    // CURRENT JOKES
    currentJokes() {
      const start_index = (this.current_page - 1) * this.items_per_page;
      const end_index = start_index + this.items_per_page;
      return this.chuck_norris_jokes.slice(start_index, end_index);
    },
    //TOTAL PAGES
    total_pages() {
      return Math.ceil(this.chuck_norris_jokes.length / this.items_per_page);
    },
  },
  watch: {
    text_category(newval, oldval) {
      if (newval !== oldval) {
        this.current_page = 1; // Reset current_page to 1 when text_category changes
      }
    },
  },
  methods: {
    //CHANGE FORMAT DATE
    changeDateFormat(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
    //FIRST LOAD
    randomJoke() {
      axios({
        method: "get",
        url: "http://127.0.0.1:5000/chucknorris/random",
      })
        .then((res) => {
          this.chuck_norris_jokes.push(res.data);
        })
        .catch((err) => {
          alert("Something went wrong: " + err.message);
        });
    },
    //@CLICK FUNCTION
    async searchCategory(val) {
      if (!val) {
        alert("Please input the text field first!");
        return false;
      }
      this.progress_circular = true;
      await axios({
        method: "get",
        url: `http://127.0.0.1:5000/chucknorris/freetext/${val}`,
      })
        .then((res) => {
          let result_joke = res.data.result;
          this.chuck_norris_jokes = result_joke;
          this.progress_circular = false;
        })
        .catch((err) => {
          alert("Something went wrong: " + err.message);
        });
    },
    // PREVIOUS PAGE
    prevPage() {
      if (this.current_page > 1) {
        this.current_page--;
      }
    },
    // NEXT PAGE
    nextPage() {
      if (this.current_page < this.total_pages) {
        this.current_page++;
      }
    },
  },
  // FIRST LOAD
  mounted() {
    this.randomJoke();
  },
};
</script>

<style>

</style>