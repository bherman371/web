<template>
  <div class="body-bg-white">
    <SPreloader />
    <div class="main-header main-header-fullwidth main-header-has-header-standard mb-0">
      <SLandingPageBar />
      <SImageBackground />
      <div class="header-spacer--standard"></div>

      <div class="container">
        <div class="row display-flex">
          <SLandingContent />
          <SLoginRegistrationForm />
          <SRestorePasswordModal />
          <SRestoreUsername />
          <SSearchModal />
        </div>
      </div>
    </div>

    <NotebookAnimationLandingPage />
    <FindPeopleSectionLandingPage />
    <MeetNewPeopleSectionLandingPage />
    <ComunityReviewsSectionLandingPage />

    <MakeFriendsSectionLandingPage class="mt-5" />

    <Footer />
    <a class="back-to-top" href="#" style="display: none" ref="goTop">
      <img src="svg-icons/back-to-top.svg" alt="arrow" class="back-icon" />
    </a>
  </div>
</template>

<script>
import SPreloader from "@/components/organisms/SPreloader.vue";
import SImageBackground from "@/components/organisms/SImageBackground.vue";
import SLandingPageBar from "@/components/organisms/SLandingPageBar.vue";
import SLandingContent from "@/components/molecules/SLandingContent.vue";
import SLoginRegistrationForm from "@/components/organisms/SLoginRegistrationForm.vue";
import SRestorePasswordModal from "@/components/organisms/SRestorePasswordModal.vue";
import SSearchModal from "@/components/organisms/SSearchModal.vue";
import SRestoreUsername from "@/components/molecules/SRestoreUsername";
import Footer from "@/templates/Footer";

import NotebookAnimationLandingPage from "@/components/molecules/NotebookAnimationLandingPage";
import FindPeopleSectionLandingPage from "@/components/molecules/FindPeopleSectionLandingPage";
import MeetNewPeopleSectionLandingPage from "@/components/molecules/MeetNewPeopleSectionLandingPage";
import ComunityReviewsSectionLandingPage from "@/components/molecules/ComunityReviewsSectionLandingPage";
import MakeFriendsSectionLandingPage from "@/components/molecules/MakeFriendsSectionLandingPage";

export default {
  name: "LandingPage",
  components: {
    SPreloader,
    SImageBackground,
    SLandingPageBar,
    SLandingContent,
    SLoginRegistrationForm,
    SRestorePasswordModal,
    SSearchModal,
    SRestoreUsername,
    NotebookAnimationLandingPage,
    FindPeopleSectionLandingPage,
    MeetNewPeopleSectionLandingPage,
    ComunityReviewsSectionLandingPage,
    MakeFriendsSectionLandingPage,
    Footer
  },
  mounted() {
    $("html,body").animate({
      scrollTop: 0
    });
  }
};
</script>
