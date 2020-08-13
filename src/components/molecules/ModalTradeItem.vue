<template>
  <Modal
    :id="modalId"
    title="Trade Item"
    :buttonName="buttonText"
    @button="mainButtonAction()"
  >
    <div v-if="state === 'WAITING_USER_INPUT' || state === 'ERROR_SENDING_MESSAGE'">
      <p class="mt-0">Send message about item:</p>
      <textarea class="form-control" v-model="message"></textarea>
      <p v-if="state === 'ERROR_SENDING_MESSAGE'" class="text-danger mt-3 mb-0">
        An error ocurred when trying to send message. Try again!
      </p>
    </div>

    <div v-else-if="state === 'SENDING_MESSAGE'">
      <p>
        <span class="spinner-border spinner-border-sm text-primary mr-2" role="status"></span>
        Sending message
      </p>
    </div>

    <div v-else-if="state === 'MESSAGE_SENT'">
      <p>Your message has been sent. Please wait for the item's poster to respond.</p>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/atoms/Modal.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ModalTradeItem",
  props: ["item"],
  components: {
    Modal,
  },
  data() {
    return {
      state: "WAITING_USER_INPUT",
      message: "",
    };
  },
  methods: {
    ...mapActions(["postUserMessage"]),
    async sendMessage() {
      this.state = "SENDING_MESSAGE";

      try {
        await this.postUserMessage({
          id: this.item.posterId,
          postMsg: this.message
        });

        this.text = this.defaultMessage;
        this.state = "MESSAGE_SENT";
      } catch (err) {
        this.state = "ERROR_SENDING_MESSAGE";
        console.error(err);
      }
    },
    mainButtonAction() {
      switch (this.state) {
        case "WAITING_USER_INPUT":
          this.sendMessage();
          break;
        case "MESSAGE_SENT":
          $(`#${this.modalId}`).modal("hide");
          break;
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
    modalId() {
      return `trade-item-${this.itemId}`;
    },
    itemId() {
      return this.item && this.item.id;
    },
    buttonText() {
      switch (this.state) {
        case "WAITING_USER_INPUT":
          return "Send message";
        case "MESSAGE_SENT":
          return "OK";
        case "ERROR_SENDING_MESSAGE":
          return "Send message";
        default:
          return null;
      }
    },
  },
  mounted() {
    const currentUserUsername = this.user.username;
    const itemName = this.item.title;

    let defaultMessage = "";
    const type = this.item.type;
    if (type === 1 || type === 3)
      defaultMessage = `${currentUserUsername} is requesting ${itemName}`;
    else if (type === 2 || type === 4)
      defaultMessage = `${currentUserUsername} is offering ${itemName}`;

    this.message = defaultMessage;
  }
}
</script>

<style>

</style>