<template>
  <div>
    <div class="fixed-sidebar">
      <div class="fixed-sidebar-left sidebar--small" id="sidebar-left">
        <router-link to="/s-app/news-feed" class="logo">
          <div class="img-wrap m-auto">
            <img src="/img/favicon.png" alt="Swampum" />
          </div>
        </router-link>

        <div id="closed-sticky-bar" class="mCustomScrollbar" data-mcs-theme="dark">
          <ul class="left-menu">
            <li>
              <a href="#" class="js-sidebar-open">
                <svg
                  class="olymp-menu-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="OPEN MENU"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon" />
                </svg>
              </a>
            </li>
            <li>
              <router-link to="/s-app/news-feed">
                <svg
                  class="olymp-newsfeed-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="NEWSFEED"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon" />
                </svg>
              </router-link>
            </li>
            <li class="more">
              <router-link to="">
                <svg class="olymp-star-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                </svg>
              </router-link>
              <div id="left-bar-dropdown" class="more-dropdown more-with-triangle triangle-left-top">
                <div class="mCustomScrollbar" data-mcs-theme="dark">
                  <div class="ui-block-title ui-block-title-small mb-0">
                    <h6 class="title">Groups</h6>
                  </div>

                  <ul class="sticky-bar-dropdown">
                    <li>
                      <router-link to="/s-app/my-groups">Memberships</router-link>
                    </li>
                    <li>
                      <a href="#">Moderated groups</a>
                    </li>
                    <li>
                      <a href="#" data-toggle="modal" data-target="#create-group">Create new group</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <router-link to="/s-app/requests-area">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="REQUESTS"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon" />
                </svg>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/chat-center">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="MESSAGES"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                </svg>
              </router-link>
            </li>           
            <li>
              <router-link to="/s-app/my-post-area">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="MY POSTS"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
                </svg>
              </router-link>
            </li>
            <li class="more">
              <router-link to="">
                <svg class="olymp-info-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-info-icon" />
                </svg>
              </router-link>
              <div id="left-bar-dropdown" class="more-dropdown more-with-triangle triangle-left-top">
                <div class="mCustomScrollbar" data-mcs-theme="dark">
                  <div class="ui-block-title ui-block-title-small mb-0">
                    <h6 class="title">Support</h6>
                  </div>

                  <ul class="sticky-bar-dropdown">
                    <li>
                      <router-link to="/contact-us">Contact us</router-link>
                    </li>
                    <li>
                      <a href="#">Help center</a>
                    </li>
                    <li>
                      <router-link to="/landing-terms">Terms and conditions</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <router-link to="/s-app/points">
                <svg
                  class="olymp-points-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="POINTS"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-points-icon" />
                </svg>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
        <router-link to="/s-app/news-feed" class="logo">
          <div class="img-wrap">
            <img src="/img/favicon.png" alt="Swampum" />
          </div>
          <div class="title-block">
            <h6 class="logo-title">Swampum</h6>
          </div>
        </router-link>

        <div class="mCustomScrollbar" data-mcs-theme="dark">
          <ul class="left-menu">
            <li>
              <a href="#" class="js-sidebar-open">
                <svg class="olymp-close-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
                </svg>
                <span class="left-menu-title">Collapse menu</span>
              </a>
            </li>
            <li>
              <router-link to="/s-app/news-feed">
                <svg class="olymp-newsfeed-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon" />
                </svg>
                <span class="left-menu-title">Newsfeed</span>
              </router-link>
            </li>
            <li>
              <a
                class="collapsed"
                data-toggle="collapse"
                data-parent="#sidebar-left-1"
                href="#collapse-groups"
                aria-expanded="false"
                aria-controls="collapse-groups"
              >
                <svg class="olymp-star-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                </svg>
                <div class="collapsible">
                  <span class="left-menu-title">Groups</span>
                  <svg class="olymp-dropdown-arrow-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                  </svg>
                </div>
              </a>
              <div
                id="collapse-groups"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne"
              >
                <ul class="left-menu-title">
                  <li>
                    <router-link to="/s-app/my-groups">Memberships</router-link>
                  </li>
                  <li>
                    <a href="#">Moderated groups</a>
                  </li>
                  <li>
                    <a href="#" data-toggle="modal" data-target="#create-group">Create new group</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link to="/s-app/requests-area">
                <svg class="olymp-happy-faces-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon" />
                </svg>
                <span class="left-menu-title">Requests</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/chat-center">
                <svg class="olymp-happy-faces-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                </svg>
                <span class="left-menu-title">Messages</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/my-post-area">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
                </svg>
                <span class="left-menu-title">My posts</span>
              </router-link>
            </li>
            <li>
              <a
                class="collapsed"
                data-toggle="collapse"
                data-parent="#sidebar-left-1"
                href="#collapse-support"
                aria-expanded="false"
                aria-controls="collapse-support"
              >
                <svg class="olymp-info-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-info-icon" />
                </svg>
                <div class="collapsible">
                  <span class="left-menu-title">Support</span>
                  <svg class="olymp-dropdown-arrow-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                  </svg>
                </div>
              </a>
              <div
                id="collapse-support"
                class="collapse"
                role="tabpanel"
                aria-labelledby="headingOne"
              >
                <ul class="left-menu-title">
                  <li>
                    <router-link to="/contact-us">Contact us</router-link>
                  </li>
                  <li>
                    <a href="#">Help center</a>
                  </li>
                  <li>
                    <router-link to="/landing-terms">Terms and conditions</router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link to="/s-app/points">
                <svg class="olymp-points-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-points-icon" />
                </svg>
                <span class="left-menu-title">Points</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fixed-sidebar fixed-sidebar-responsive">
      <div class="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
        <a href="#" class="logo js-sidebar-open">
          <img src="/img/favicon.png" alt="Swampum" class="m-auto" />
        </a>
      </div>

      <div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
        <router-link to="/s-app/news-feed" class="logo">
          <div class="img-wrap">
            <img src="/img/favicon.png" alt="Swampum" />
          </div>
          <div class="title-block">
            <h6 class="logo-title">Swampum</h6>
          </div>
        </router-link>

        <div class="mCustomScrollbar" data-mcs-theme="dark">
          <div class="control-block">
            <div class="author-page author vcard inline-items">
              <div class="author-thumb">
                <img alt="author" src="/img/author-page.jpg" class="avatar" />
                <span class="icon-status online"></span>
              </div>
              <router-link to="/s-app/news-feed" class="author-name fn">
                <div class="author-title">
                  James Spiegel
                  <svg class="olymp-dropdown-arrow-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                  </svg>
                </div>
                <span class="author-subtitle">SPACE COWBOY</span>
              </router-link>
            </div>
          </div>

          <div class="ui-block-title ui-block-title-small">
            <h6 class="title">MAIN SECTIONS</h6>
          </div>

          <ul class="left-menu">
            <li>
              <a href="#" class="js-sidebar-open">
                <svg class="olymp-close-icon left-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
                </svg>
                <span class="left-menu-title">Collapse menu</span>
              </a>
            </li>
            <li>
              <router-link to="/s-app/news-feed">
                <svg
                  class="olymp-newsfeed-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="NEWSFEED"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-newsfeed-icon" />
                </svg>
                <span class="left-menu-title">Newsfeed</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/my-groups">
                <svg
                  class="olymp-star-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="FAV PAGE"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                </svg>
                <span class="left-menu-title">Groups</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/requests-area">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Requests"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-faces-icon" />
                </svg>
                <span class="left-menu-title">Requests</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/chat-center">
                <svg
                  class="olymp-happy-faces-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Messages"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                </svg>
                <span class="left-menu-title">Messages</span>
              </router-link>
            </li>
            <li>
              <router-link to="/s-app/points">
                <svg
                  class="olymp-points-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Points"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-points-icon" />
                </svg>
                <span class="left-menu-title">Points</span>
              </router-link>
            </li>
          </ul>

          <div class="ui-block-title ui-block-title-small">
            <h6 class="title">YOUR ACCOUNT</h6>
          </div>

          <ul class="account-settings">
            <li>
              <a href="#">
                <svg class="olymp-menu-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-menu-icon" />
                </svg>

                <span>Profile settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  class="olymp-star-icon left-menu-icon"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="FAV PAGE"
                >
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                </svg>

                <span>Create fav page</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg class="olymp-logout-icon">
                  <use xlink:href="/svg-icons/sprites/icons.svg#olymp-logout-icon" />
                </svg>

                <span>Log out</span>
              </a>
            </li>
          </ul>

          <div class="ui-block-title ui-block-title-small">
            <h6 class="title">About Olympus</h6>
          </div>

          <ul class="about-olympus">
            <li>
              <a href="#">
                <span>Terms and conditions</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>FAQs</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Careers</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ModalCreateGroup />
  </div>
</template>

<script>
import ModalCreateGroup from "@/components/atoms/ModalCreateGroup";
// import $ from "jquery";

export default {
  name: "LeftStickyBar",
  components: {
    ModalCreateGroup
  }
};
</script>

<style scoped>
.collapsible {
  width: calc(100% - 45px);
  padding-right: 25px;
}

.collapsible svg {
  width: 6px;
  height: 4px;
  float: right;
  transition: all .3s ease;
  margin-top: 4px;
}

.collapsed .collapsible svg {
  transform: rotate(-90deg);
}

.triangle-left-top:before {
  transform: rotate(-90deg);
}

#left-bar-dropdown {
  right: unset;
  left: 77px;
  top: 7px;
  padding: 0;
}

.left-menu-title a {
  margin-left: 45px;
}

#closed-sticky-bar {
  overflow: unset !important;
}

.sticky-bar-dropdown a {
  padding: 13px 0 !important;
}
</style>
