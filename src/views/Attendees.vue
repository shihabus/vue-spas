<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div
        class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        v-for="attendee in attendees"
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
      userID: this.$route.params.userID,
      meetingID: this.$route.params.meetingID,
    };
  },
  components: { FontAwesomeIcon },
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
      });
  },
};
</script>
