<template>
  <div id="app">
    <Navigation :user="user" @log-out="logout" />
    <router-view
      class="container"
      :user="user"
      @log-out="logout"
      @add-meeting="addMeeting"
    />
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
    addMeeting: function(payload) {
      console.log("payload", this.user.uid);
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .add({
          name: payload,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
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
