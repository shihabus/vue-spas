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
            <div>{{ attendee.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/db";
export default {
  name: "Attendees",
  data() {
    return {
      attendees: [],
      userID: this.$route.params.userID,
      meetingID: this.$route.params.meetingID,
    };
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
          });
        });
        this.attendees = snapData;
      });
  },
};
</script>