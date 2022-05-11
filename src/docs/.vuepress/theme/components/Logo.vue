<template>
  <div class="main-container">
    <img class="my-photo" src="/img/me.webp" title="Marcin Jahn photo" />
    <div class="text-container">
      <h1 id="main-title" class="title">Marcin Jahn's</h1>
      <h2 id="subtitle" class="title">Tech Notebook</h2>
      <!-- <p class="description">Notes on IT topics</p> -->
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

.title {
  color: white;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
            0px 8px 13px rgba(0,0,0,0.1),
            0px 18px 23px rgba(0,0,0,0.1);
}

#main-title {
  font-size 3rem;
  margin-top: 0;
  margin-bottom: 0;
}

#subtitle {
  font-size 2.5rem;
  margin-top: 0;
  text-decoration: none;
  border-bottom: 0;
  color: #CCC;
}

.description {
  color: rgba(0,0,0,0.6) !important;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
  font-size: 1.6rem;
  line-height: 1.3;
  color: lighten($textColor, 40%);
  margin-bottom: 0;
}

@media (max-width: $MQMobile) {
  .main-container {
    flex-direction: column;
  }

  .text-container {
    align-items: center;
  }
}
</style>