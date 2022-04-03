<template>
  <div class="main-container">
    <img class="my-photo" src="/img/me.webp" />
    <div cass="text-container">
      <h1 id="main-title">Marcin Jahn <br>Technology Notebook</h1>
      <p class="description">Notes on IT topics</p>
    </div>
  </div>
</template>

<style lang="stylus">
.main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.text-container {
    display: flex;
    flex-direction: column;
}

.my-photo {
  max-width: 11rem;
  max-height: 11rem;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-right: 2rem;
}

#main-title {
  font-size 3rem;
  margin-top: 0;
}

.description {
  color: rgba(0,0,0,0.6) !important;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
  font-size: 1.6rem;
  line-height: 1.3;
  color: lighten($textColor, 40%);
  margin-bottom: 0;
}
</style>