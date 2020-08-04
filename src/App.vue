<template>
  <div id="app">
    <Navigation :user="user" @log-out="logout" />
    <router-view
      class="container"
      :user="user"
      :meetings="meetings"
      :error="error"
      @log-out="logout"
      @add-meeting="addMeeting"
      @delete-meeting="deleteMeeting"
      @check-in="CheckIn"
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
      meetings: [],
      error: null,
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
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .add({
          name: payload,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        });
    },
    deleteMeeting: function(meetingId) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .doc(meetingId)
        .delete();
    },
    CheckIn: function(payload) {
      // const { userID, meetingID, displayName, email } = payload;
      console.log("userID", payload.userID, "||", payload.meetingID);
      db.collection("users")
        .doc(payload.userID)
        .collection("meetings")
        .doc(payload.meetingID)
        .get()
        .then((doc) => {
          console.log("doc", doc);
          if (doc.exists) {
            db.collection("users")
              .doc(payload.userID)
              .collection("meetings")
              .doc(payload.meetingID)
              .collection("attendees")
              .add({
                displayName: payload.displayName,
                email: payload.email,
                createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                this.$router.push(
                  "/attendees/" + payload.userID + "/" + payload.meetingID
                );
              });
          } else {
            this.error = "No such meeting";
          }
        });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection("users")
          .doc(this.user.uid)
          .collection("meetings")
          .onSnapshot((snapshot) => {
            const snapData = [];
            snapshot.forEach((doc) => {
              snapData.push({
                id: doc.id,
                name: doc.data().name,
              });
            });
            this.meetings = snapData.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 1;
            });
          });
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
