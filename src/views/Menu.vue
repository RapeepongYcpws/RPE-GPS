<template>
  <div>
    <div class="row p-3 gx-0 navbar-wrapper">
      <div class="col-auto align-self-center">
        <font-awesome-icon
          @click="onMenuClick()"
          :icon="['fas', 'bars']"
          class="pointer icon-bar-menu"
        />
      </div>
      <div class="col px-3">
        <span class="title">Rapee </span>
        <span class="title-gps"> GPS </span>
      </div>
    </div>
    <div class="back-drop" v-if="isOpenMenu" @click="onMenuClick()"></div>
    <div id="menu" class="menu-wrapper">
      <div class="row g-0 p-3">
        <div class="col-auto title">Rapee</div>
        <div class="col-auto title-gps align-self-center ms-2">GPS</div>
        <div class="col-auto ms-auto">
          <img class="image-logo" src="../assets/gps-logo.png" />
        </div>
      </div>

      <div class="item-wrapper">
        <router-link to="/" class="item-menu pointer">
          <img src="../assets/images/icon-menu/car.png" />
          <span>แผนที่</span>
        </router-link>
        <router-link to="/history" class="item-menu pointer">
          <img src="../assets/images/icon-menu/history.png" />
          <span>ข้อมูลย้อนหลัง</span>
        </router-link>
        <router-link to="/report" class="item-menu pointer">
          <img src="../assets/images/icon-menu/report.png" />
          <span>รายงาน</span>
        </router-link>
        <router-link to="/profile" class="item-menu pointer">
          <img src="../assets/images/icon-menu/profile.png" />
          <span>โปรไฟล์</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenMenu: false,
    };
  },
  methods: {
    onMenuClick() {
      var thisf = this;
      if (this.isOpenMenu) {
        this.closeNavMenu();
        setTimeout(function () {
          thisf.isOpenMenu = false;
        }, 10);
      } else {
        this.isOpenMenu = true;
        setTimeout(function () {
          thisf.openNavMenu();
        }, 10);
      }
    },
    openNavMenu() {
      document.getElementById("menu").style.transform = "translateX(0%)";
    },
    closeNavMenu() {
      document.getElementById("menu").style.transform = "translateX(-100%)";
    },
  },
};
</script>

<style scoped>
.menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #555555;
  color: white;
  transition: 0.3s;
  transform: translateX(-100%);
  z-index: 9001;

}
.navbar-wrapper {
  height: 60px;
  background-color: #eeeeee;
}
.back-drop {
  background-color: rgba(51, 51, 51, 0.274);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: vis 0.3s;
  z-index: 9000;
}
.icon-bar-menu {
  font-size: 26px;
  color: rgb(0, 51, 146);
}
.navbar-wrapper .title {
  font-size: 1.3rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}
.navbar-wrapper .title-gps {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(0, 88, 252);
}
.menu-wrapper .title {
  font-size: 2rem;
  font-weight: 500;
  color: rgb(255, 255, 255);
}
.menu-wrapper .title-gps {
  font-size: 1.6rem;
  font-weight: 300;
  color: rgb(0, 217, 255);
}
.menu-wrapper .image-logo {
  width: 50px;
}
.menu-wrapper .item-wrapper {
}
.menu-wrapper .item-wrapper a.item-menu {
  display: block;
  padding: 8px 20px;
  transition: 0.2s;
  text-decoration: none;
  color: white;
}
.menu-wrapper .item-wrapper .item-menu:hover {
  background-color: #333;
}
.menu-wrapper .item-wrapper .item-menu img {
  height: 35px;
  margin-right: 15px;
}
</style>