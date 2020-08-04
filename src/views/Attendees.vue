<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8" v-if="user !== null && user.uid === userID">
        <h1 class="font-weight-light text-center">Attendees</h1>

        <div class="card bg-light mb-4">
          <div class="card-body text-center">
            <div class="input-group input-group-lg">
              <input
                type="text"
                placeholder="Search Attendees"
                class="form-control"
                v-model="searchQuery"
                ref="searchQuery"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-sm btn-outline-info"
                  title="Pick a random attendee"
                  @click="chooseRandom"
                >
                  <font-awesome-icon icon="random"></font-awesome-icon>
                </button>
                <button
                  class="btn btn-sm btn-outline-info"
                  title="Reset Search"
                  @click="resetQuery"
                >
                  <font-awesome-icon icon="undo"></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        v-for="attendee in filteredAttendees"
        :key="attendee.id"
      >
        <div class="card">
          <div
            class="card-body px-3 py-2 d-flex align-items-center justify-content-center"
          >
            <div
              class="btn-group pr-2"
              v-if="user !== null && user.uid === userID"
            >
              <button
                class="btn btn-sm"
                :class="[
                  attendee.star ? 'text-danger' : '',
                  'btn-outline-secondary',
                ]"
                title="Give user a Star"
                @click="toggleStar(attendee.id)"
              >
                <font-awesome-icon icon="star"></font-awesome-icon>
              </button>
              <a
                class="btn btn-sm btn-outline-secondary"
                title="Send user an email"
                :href="'mailto:' + attendee.email"
              >
                <font-awesome-icon icon="envelope"></font-awesome-icon>
              </a>
              <button
                class="btn btn-sm btn-outline-secondary"
                title="Delete Attendee"
                @click="deleteAttendee(attendee.id)"
              >
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </button>
            </div>
            <div>{{ attendee.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/db";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "Attendees",
  props: ["user"],
  data() {
    return {
      attendees: [],
      displayAttendees: [],
      searchQuery: "",
      userID: this.$route.params.userID,
      meetingID: this.$route.params.meetingID,
    };
  },
  components: { FontAwesomeIcon },
  computed: {
    filteredAttendees: function() {
      const dataFilter = (item) =>
        item.name.toLowerCase().match(this.searchQuery.toLowerCase());
      return this.displayAttendees.filter(dataFilter);
    },
  },
  methods: {
    deleteAttendee: function(id) {
      if (this.user && this.user.uid === this.userID) {
        db.collection("users")
          .doc(this.userID)
          .collection("meetings")
          .doc(this.meetingID)
          .collection("attendees")
          .doc(id)
          .delete();
      }
    },
    toggleStar: function(id) {
      if (this.user && this.user.uid === this.userID) {
        const reference = db
          .collection("users")
          .doc(this.userID)
          .collection("meetings")
          .doc(this.meetingID)
          .collection("attendees")
          .doc(id);

        reference.get().then((doc) => {
          const star = doc.data().star;
          if (star) {
            reference.update({
              star: !star,
            });
          } else {
            reference.update({
              star: true,
            });
          }
        });
      }
    },
    chooseRandom: function() {
      const randomAttendee = Math.floor(Math.random() * this.attendees.length);
      this.displayAttendees = [this.attendees[randomAttendee]];
    },
    resetQuery: function() {
      this.displayAttendees = this.attendees;
      this.searchQuery = "";
      this.$ref.searchQuery.focus();
    },
  },
  mounted() {
    db.collection("users")
      .doc(this.userID)
      .collection("meetings")
      .doc(this.meetingID)
      .collection("attendees")
      .onSnapshot((snapshot) => {
        const snapData = [];
        snapshot.forEach((doc) => {
          console.log("doc", doc.data());
          snapData.push({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().displayName,
            star: doc.data().star,
          });
        });
        this.attendees = snapData;
        this.displayAttendees = snapData;
      });
  },
};
</script>
