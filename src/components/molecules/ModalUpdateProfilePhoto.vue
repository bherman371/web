<template>
  <div class="text-center">
    <a href="#" class="upload-photo-item borders" data-toggle="modal" data-target="#choose-from-my-photo">
      <svg class="olymp-photos-icon">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-photos-icon" />
      </svg>

      <h6>Choose from My Photos</h6>
      <span>Choose from your uploaded photos</span>

      <div class="modal-body">
        <div class="tab-content">
          <div class="tab-pane active" id="home" role="tabpanel" aria-expanded="true">
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo1.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo2.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo3.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>

            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo4.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo5.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo6.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>

            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo7.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo8.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <div class="radio">
                <label class="custom-radio">
                  <img src="/img/choose-photo9.jpg" alt="photo" />
                  <input type="radio" name="optionsRadios" />
                </label>
              </div>
            </div>

            <a href="#" class="btn btn-secondary btn-lg btn--half-width">Cancel</a>
            <a href="#" class="btn btn-primary btn-lg btn--half-width">Confirm Photo</a>
          </div>
          <div class="tab-pane" id="profile" role="tabpanel" aria-expanded="false">
            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo10.jpg" alt="photo" />
                <figcaption>
                  <a href="#">South America Vacations</a>
                  <span>Last Added: 2 hours ago</span>
                </figcaption>
              </figure>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo11.jpg" alt="photo" />
                <figcaption>
                  <a href="#">Photoshoot Summer 2016</a>
                  <span>Last Added: 5 weeks ago</span>
                </figcaption>
              </figure>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo12.jpg" alt="photo" />
                <figcaption>
                  <a href="#">Amazing Street Food</a>
                  <span>Last Added: 6 mins ago</span>
                </figcaption>
              </figure>
            </div>

            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo13.jpg" alt="photo" />
                <figcaption>
                  <a href="#">Graffity & Street Art</a>
                  <span>Last Added: 16 hours ago</span>
                </figcaption>
              </figure>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo14.jpg" alt="photo" />
                <figcaption>
                  <a href="#">Amazing Landscapes</a>
                  <span>Last Added: 13 mins ago</span>
                </figcaption>
              </figure>
            </div>
            <div class="choose-photo-item" data-mh="choose-item">
              <figure>
                <img src="/img/choose-photo15.jpg" alt="photo" />
                <figcaption>
                  <a href="#">The Majestic Canyon</a>
                  <span>Last Added: 57 mins ago</span>
                </figcaption>
              </figure>
            </div>

            <a href="#" class="btn btn-secondary btn-lg btn--half-width">Cancel</a>
            <a href="#" class="btn btn-primary btn-lg disabled btn--half-width">Confirm Photo</a>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ModalUpdateProfilePhoto"
};
</script>

<style lang="scss" scoped>
.borders {
  border-left: none;
}
</style>
