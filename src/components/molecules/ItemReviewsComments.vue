<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <ul class="comments__list-review">
        <li class="comments__item-review">
          <div class="comment-entry comment comments__article">
            <div class="comments__body ovh">
              <h5 class="title">{{comment.sender.firstName}}</h5>

              <div class="comment-content comment">{{comment.msg}}</div>

              <header class="comment-meta comments__header-review">
                <time
                  class="published comments__time-review"
                  datetime="2017-10-02 12:00:00"
                >{{comment.createdAt | date}}</time>
              </header>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemHelper from "@/mixins/ItemHelper";
export default {
  name: "ItemReviewsComments",
  props: ["comments"],
  mixins: [ItemHelper],
  filters: {
    date(date) {
      if (!date) return "";
      const dt = new Date(date);
      const f = d => (d < 10 ? "0" + d : d);
      return (
        f(dt.getMonth() + 1) + "/" + f(dt.getDate()) + "/" + dt.getFullYear()
      );
    }
  }
};
</script>

<style>
</style>