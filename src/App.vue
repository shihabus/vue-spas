<template>
  <div id="app">
    <Navigation />
    <router-view class="container" :user="user" @log-out="logout" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "@/db";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data: function() {
    return {
      user: null,
    };
  },
  methods: {
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.displayName;
      }
    });
    // db.collection("users")
    //   .doc("oGv5PL16KhzzBtX3fCEt")
    //   .get()
    //   .then((snapshot) => {
    //     this.user = snapshot.data().name;
    //   });
  },
};
</script>

<style lang="scss">
$primary: orange;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
