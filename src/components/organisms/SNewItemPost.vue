<template>
  <div class="ui-block">
    <!-- Post -->

    <article class="hentry post">
      <div class="post__author author vcard inline-items">
        <img src="/img/author-page.jpg" alt="author" />

        <div class="author-date">
          <a class="h6 post__author-name fn" href="#">James Spiegel</a> uploaded 28
          <a href="#">new photos</a>
          <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">7 hours ago</time>
          </div>
        </div>

        <div class="more">
          <svg class="olymp-three-dots-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
          </svg>
          <ul class="more-dropdown">
            <li>
              <a href="#">Edit Post</a>
            </li>
            <li>
              <a href="#">Delete Post</a>
            </li>
            <li>
              <a href="#">Turn Off Notifications</a>
            </li>
            <li>
              <a href="#">Select as Featured</a>
            </li>
          </ul>
        </div>
      </div>

      <p>
        Here are the pics of the incredibly beautiful landscapes of al the food that I’ve tasted while on
        my trip. I’ve never been so full in my entire life! I recommend to everyone that has the chance
        to travel to stop thinking and do it now!
      </p>

      <div class="post-block-photo js-zoom-gallery">
        <a href="/img/post-photo1.jpg" class="half-width">
          <img src="/img/post-photo1.jpg" alt="photo" />
        </a>
        <a href="/img/post-photo2.jpg" class="half-width">
          <img src="/img/post-photo2.jpg" alt="photo" />
        </a>
        <a href="/img/post-photo3.jpg" class="col col-3-width">
          <img src="/img/post-photo3.jpg" alt="photo" />
        </a>
        <a href="/img/post-photo4.jpg" class="col col-3-width">
          <img src="/img/post-photo4.jpg" alt="photo" />
        </a>
        <a href="/img/post-photo5.jpg" class="more-photos col-3-width">
          <img src="/img/post-photo5.jpg" alt="photo" />
          <span class="h2">+24</span>
        </a>
      </div>

      <div class="post-additional-info inline-items">
        <a href="#" class="post-add-icon inline-items">
          <svg class="olymp-heart-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-heart-icon" />
          </svg>
          <span>15</span>
        </a>

        <div class="comments-shared">
          <a href="#" class="post-add-icon inline-items">
            <svg class="olymp-speech-balloon-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
            </svg>
            <span>0</span>
          </a>

          <a href="#" class="post-add-icon inline-items">
            <svg class="olymp-share-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
            </svg>
            <span>16</span>
          </a>
        </div>
      </div>

      <div class="control-block-button post-control-button">
        <a href="#" class="btn btn-control">
          <svg class="olymp-like-post-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-like-post-icon" />
          </svg>
        </a>

        <a href="#" class="btn btn-control">
          <svg class="olymp-comments-post-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
          </svg>
        </a>

        <a href="#" class="btn btn-control">
          <svg class="olymp-share-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
          </svg>
        </a>
      </div>
    </article>

    <!-- ... end Post -->
  </div>
</template>
