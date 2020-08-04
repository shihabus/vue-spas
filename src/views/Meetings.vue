<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1 class="font-weight-light text-center">Add a Meeting</h1>

        <div class="card bg-light">
          <div class="card-body text-center">
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  name="meetingName"
                  placeholder="Meeting name"
                  aria-describedby="buttonAdd"
                  v-model="meetingName"
                />
                <div class="input-group-append">
                  <button
                    type="submit"
                    class="btn btn-sm btn-info"
                    id="buttonAdd"
                    @click.prevent="handleAdd"
                    ref="meetingName"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-6">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Meetings</h4>
          </div>
          <div class="list-group list-group-flush">
            <div
              class="list-group-item d-flex"
              v-for="meeting in meetings"
              :key="meeting.id"
            >
              <section
                class="btn-group align-self-center"
                role="group"
                aria-label="Meeting Options"
              >
                <button
                  class="btn btn-sm btn-outline-secondary"
                  title="Delete Meeting"
                  @click="$emit('delete-meeting', meeting.id)"
                >
                  <font-awesome-icon icon="trash" />
                </button>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Check In"
                  :to="'/checkin/' + user.uid + ' / ' + meeting.id"
                >
                  <font-awesome-icon icon="link" />
                </router-link>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Attendees"
                  to="/"
                >
                  <font-awesome-icon icon="list-ul" />
                </router-link>
              </section>

              <section class="pl-3 text-left align-self-center">
                {{ meeting.name }}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "Meeting",
  props: ["user", "meetings"],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      meetingName: null,
    };
  },
  methods: {
    handleAdd: function() {
      this.$emit("add-meeting", this.meetingName);
      this.meetingName = null;
      this.$ref.meetingName.focus();
    },
  },
};
</script>
