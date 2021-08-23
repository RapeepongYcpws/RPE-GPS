<template>
  <div>
    <Menu />
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-lg-2 col-12 vehicle-list-wrapper">
          <div class="vehicle-list-header">
            <div class="p-2">
              <select
                class="w-100"
                name="vehicleGroup"
                id="vehicleGroup"
                v-model="selectedGroup"
              >
                <option
                  v-for="group in groupList"
                  :key="group.id"
                  :value="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>

            <div class="pb-2 px-1 position-relative">
              <input
                id="search"
                class="input-search w-100"
                placeholder="ค้นหาข้อมูล"
                type="text"
                v-on:keyup.enter="onSearch()"
              />
              <button class="btn-search" @click="onSearch()">
                <font-awesome-icon :icon="['fas', 'search']" class="pointer" />
              </button>
            </div>
            <div class="row">
              <div class="col">
                <button
                  :class="[
                    'chip-status-vehicle-wrapper ',
                    status.selected ? status.statusCss : '',
                  ]"
                  v-for="status in statusList"
                  :key="status.id"
                  @click="statusVehicleSelect(status)"
                >
                  {{ status.name }}
                </button>
              </div>
            </div>
          </div>
          <perfect-scrollbar class="vehicle-list-body">
            <div
              v-for="vehicle in filterVehicle"
              :key="vehicle.id"
              class="row vehicle-item-wrapper g-0 md-elevation-3 pointer"
              @click="onVehicleSelected(vehicle)"
            >
              <div class="col-auto align-self-center">
                <img
                  :class="
                    'image-profile ' +
                    (vehicle.statusCode == 30
                      ? 'running'
                      : vehicle.statusCode == 31
                      ? 'idle'
                      : vehicle.statusCode == 33
                      ? 'stop'
                      : vehicle.statusCode == 41
                      ? 'overspeed'
                      : '')
                  "
                  :src="
                    vehicle.driverId == null
                      ? getImgUrl(`driver/profile.png`)
                      : getImgUrl(`driver/${vehicle.driverId}.png`)
                  "
                  alt=""
                />
              </div>
              <div class="col ps-2">
                <div class="row g-0 py-1">
                  <div class="col-auto">
                    <img
                      class="image-car"
                      src="../assets/images/icon-map/car.png"
                    />
                    <span>{{ vehicle.vehicleName }}</span>
                  </div>
                  <div class="col-auto ms-2">{{ vehicle.driverName }}</div>
                </div>
                <div class="row g-0">
                  <div class="col d-flex align-items-center">
                    <img
                      class="image-status"
                      src="../assets/images/icon-map/speed.png"
                    />
                    <span class="ms-1"> {{ vehicle.speed }} km/h</span>
                  </div>
                  <div class="col d-flex align-items-center">
                    <img
                      class="image-status"
                      src="../assets/images/icon-map/temp.png"
                    />
                    <span class="ms-1">{{ vehicle.temp }}°</span>
                  </div>
                  <div class="col d-flex align-items-center">
                    <img
                      class="image-status"
                      src="../assets/images/icon-map/loading.png"
                    />
                    <span class="ms-1">{{ vehicle.update }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <img
                      class="image-status"
                      src="../assets/images/icon-map/placeholder.png"
                    />
                    <span class="address-text">{{ vehicle.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </perfect-scrollbar>
          <!-- <span @click="checkMap()">TEST</span> -->
        </div>
        <div class="col-12 col-lg position-relative overflow-hidden">
          <GmapMap
            class="h-100 w-100"
            :center="centerMapPosition"
            :zoom="zoomMap"
            :options="mapOption"
            ref="mapRef"
          >
            <GmapMarker
              :position="focusMarkerPosition"
              :icon="{ url: getImgUrl('images/focus7.gif') }"
            />
            <GmapMarker
              :key="index"
              v-for="(marker, index) in vehicleList"
              :position="marker.position"
              :icon="marker.icon"
              @click="centerMapPosition = marker.position"
            />
          </GmapMap>
          <div class="position-absolute bottom-0 w-100 px-3">
            <div
              ref="markerDetailTap"
              class="shadow-sm vehicle-detail-wrapper"
              style="z-index: 999"
            >
              <div
                class="row g-0 justify-content-end pointer shadow-sm"
                @click="hideMarkerDetailTap()"
              >
                <div class="col-auto py-2 px-3 text-dark">เก็บ</div>
              </div>
              <div class="marker-detail-content">
                <MarkerDetail :vehicleProp="vehicleSelected" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
import MarkerDetail from "../components/map/MarkerDetail.vue";

export default {
  name: "Map",
  components: {
    Menu,
    MarkerDetail,
  },
  data() {
    return {
      mapClass: {
        height: "calc(100vh - 60px)",
      },
      statusList: [
        {
          id: 1,
          name: "ทั้งหมด",
          selected: true,
          statusCss: "all",
          statusCode: 10,
        },
        {
          id: 2,
          name: "เดินทาง",
          selected: true,
          statusCss: "running",
          statusCode: 30,
        },
        {
          id: 3,
          name: "หยุด",
          selected: true,
          statusCss: "idle",
          statusCode: 31,
        },
        {
          id: 4,
          name: "จอด",
          selected: true,
          statusCss: "stop",
          statusCode: 33,
        },
        {
          id: 5,
          name: "ความเร็วเกินกำหนด",
          selected: true,
          statusCss: "overspeed",
          statusCode: 41,
        },
      ],
      icon: "logo.png",
      searchKeyword: "",
      centerMapPosition: { lat: 13.645875, lng: 100.621862 },
      focusMarkerPosition: { lat: 13.645875, lng: 100.621862 },
      zoomMap: 17,
      mapOption: {
        disableDefaultUI: true,
        minZoom: 7,
        panControl: true,
        gestureHandling: "greedy",
      },
      selectedGroup: 0,
      groupList: [
        {
          id: 0,
          name: "ทั้งหมด",
        },
        {
          id: 1,
          name: "กลุ่ม A",
        },
        {
          id: 2,
          name: "กลุ่ม B",
        },
        {
          id: 3,
          name: "กลุ่ม C",
        },
        {
          id: 4,
          name: "กลุ่ม D",
        },
      ],
      vehicleList: [
        {
          id: 1,
          groupId: 1,
          vehicleName: "อกง-5",
          statusCode: 30,
          driverId: 1,
          driverName: "รพีพงษ์  อยู่ชัยภัทรวศิน",
          speed: 50,
          temp: 43,
          update: "14:22",
          location: "แบริ่ง 12 ต.สำโรงเหนือ อ.เมือง สมุทรปราการ",
          position: { lng: 100.6211759592811, lat: 13.645541217746437 },
          icon: {
            url: this.getImgUrl(`images/icon-vehicle/30.png`),
          },
        },
        {
          id: 2,
          groupId: 1,
          vehicleName: "อกง-512",
          statusCode: 31,
          driverId: 2,
          driverName: "สมชาย หวังดี",
          speed: 62,
          temp: 50,
          update: "08:51",
          location: "แขวง บางนา เขตบางนา กรุงเทพมหานคร",
          position: { lng: 100.62000974106702, lat: 13.64219197759615 },
          icon: {
            url: this.getImgUrl(`images/icon-vehicle/31.png`),
          },
        },
        {
          id: 3,
          groupId: 1,
          vehicleName: "นรย-5026",
          statusCode: 33,
          driverId: 3,
          driverName: "สมพงษ์ วงคำเหลา",
          speed: 24,
          temp: 38,
          update: "12:44",
          location: "แบริ่ง 12 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ",
          position: { lng: 100.61279983595585, lat: 13.650133971921255 },
          icon: {
            url: this.getImgUrl(`images/icon-vehicle/33.png`),
          },
        },
        {
          id: 4,
          groupId: 2,
          vehicleName: "ฆกห-224",
          statusCode: 30,
          driverId: 4,
          driverName: "สมศรี มีใจ",
          speed: 68,
          temp: 38,
          update: "14:15",
          location: "แบริ่ง 12 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ",
          position: { lng: 100.60440711350785, lat: 13.652947952711605 },
          icon: {
            url: this.getImgUrl(`images/icon-vehicle/30.png`),
          },
        },
        {
          id: 5,
          groupId: 1,
          vehicleName: "ทมน-665",
          statusCode: 41,
          driverId: null,
          driverName: "",
          speed: 86,
          temp: 56,
          update: "14:25",
          location: "แบริ่ง 12 ต.สำโรงเหนือ อ.เมือง จ.สมุทรปราการ",
          position: { lng: 100.63769082358476, lat: 13.6450076827335 },
          icon: {
            url: this.getImgUrl(`images/icon-vehicle/41.png`),
          },
        },
      ],
      vehicleSelected: null,
      filterList: [],
    };
  },
  created() {},
  methods: {
    statusVehicleSelect(status) {
      console.log(status);
      if (status.id == 1) {
        var checkEvery = this.statusList.every((x) => x.selected);
        console.log("checkEvery " + checkEvery);
        this.statusList.map((x) => (x.selected = !checkEvery));
      } else {
        status.selected = !status.selected;
        var checkEvery = this.statusList
          .filter((x) => x.id != 1)
          .every((y) => y.selected);
        if (checkEvery) {
          this.statusList.map((x) => (x.selected = true));
        } else {
          this.statusList.find((x) => x.id == 1).selected = false;
        }
      }
    },
    checkMap() {
      console.log("group select ==> " + this.filterList);
      // map.clear();
    },
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    onSearch(e) {
      this.searchKeyword = document.getElementById("search").value;
      console.log(this.searchKeyword);
    },
    onVehicleSelected(vehicle) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: vehicle.position.lat, lng: vehicle.position.lng });
      });
      this.vehicleSelected = vehicle;
      let findGroup = this.groupList.find(
        (x) => x.id == this.vehicleSelected.groupId
      );
      this.vehicleSelected.groupName = Boolean(findGroup)
        ? findGroup.name
        : "-";
      // console.log(this.vehicleSelected);
      this.focusMarkerPosition.lat = vehicle.position.lat;
      this.focusMarkerPosition.lng = vehicle.position.lng;
      // this.centerMapPosition = {
      //   lat: vehicle.position.lat,
      //   lng: vehicle.position.lng,
      // };
      // console.log(this.centerMapPosition);
    },
    hideMarkerDetailTap() {
      console.log();
      if (this.$refs.markerDetailTap.style.transform == "translateY(184px)") {
        this.$refs.markerDetailTap.style.transform = "translateY(0px)";
      } else {
        this.$refs.markerDetailTap.style.transform = "translateY(184px)";
      }
    },
  },
  computed: {
    filterVehicle() {
      var filterVehicle = this.vehicleList.filter((vehicle) => {
        return this.statusList.find(
          (status) => status.statusCode == vehicle.statusCode && status.selected
        );
      });
      if (this.selectedGroup != 0) {
        filterVehicle = filterVehicle.filter(
          (vehicle) => vehicle.groupId == this.selectedGroup
        );
      }
      console.log("filterVehicle22 => " + filterVehicle.length);
      // return filterVehicle.filter(x => x.vehicleName.includes(this.searchKeyword) );
      return filterVehicle.filter(
        (x) =>
          x.vehicleName.includes(this.searchKeyword) ||
          x.driverName.includes(this.searchKeyword) ||
          x.location.includes(this.searchKeyword)
      );
    },
  },
  mounted() {
    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 13.658677243533429, lng: 100.60100432449697})
    // });
    if (this.filterVehicle.length > 0) {
      this.onVehicleSelected(this.filterVehicle[0]);
    }
  },
};
</script>

<style  scoped>
.vehicle-list-wrapper {
  /* padding: 6px 20px; */
  min-width: 400px !important;
  min-height: "600px";
  height: calc(100vh - 60px);
}
.vehicle-list-wrapper .vehicle-list-header {
  padding: 0 20px;
  height: 135px;
}
.vehicle-list-header select {
  padding: 4px 8px;
  border: none;
  border-bottom: solid 1px #aaa;
}
.vehicle-list-wrapper .vehicle-list-body {
  max-height: calc(100vh - 195px);
  overflow-y: auto;
  padding: 5px 20px;
}
.chip-status-vehicle-wrapper {
  padding: 4px 10px;
  border: none;
  border-radius: 14px;
  background-color: #aaa;
  color: white;
  margin: 0 2px;
  transition: 0.3s;
}
.md-field {
  margin-top: 0px !important;
  margin-bottom: 10px !important;
}
.input-search {
  padding: 8px;
  border: solid 1px #aaa;
  border-radius: 26px;
  outline: none;
  height: 36px;
}
.btn-search {
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  right: 10px;
  border: none;
}
.btn-search:hover {
  background-color: #aaa;
}
.chip-status-vehicle-wrapper:hover {
  background-color: #888;
}
.chip-status-vehicle-wrapper.all {
  background-color: rgb(0, 57, 214);
}
.chip-status-vehicle-wrapper.running {
  background-color: rgb(41, 177, 0);
}
.chip-status-vehicle-wrapper.idle {
  background-color: rgb(245, 200, 0);
}
.chip-status-vehicle-wrapper.stop {
  background-color: rgb(221, 33, 0);
}
.chip-status-vehicle-wrapper.overspeed {
  background-color: rgb(141, 0, 223);
}
.vehicle-item-wrapper {
  background-color: white;
  margin-bottom: 12px;
  border-radius: 100px;
  height: 75px;
  padding: 0px 5px;
  font-size: 14px;
  /* box-shadow: 0px 4px 10px rgb(124, 124, 124); */
}
.vehicle-item-wrapper:hover {
  background-color: whitesmoke;
}
.vehicle-item-wrapper .image-profile {
  height: 66px;
  object-fit: cover;
  border-radius: 50%;
  border: solid 3px #aaa;
}
.vehicle-item-wrapper .image-profile.running {
  border-color: rgb(41, 177, 0);
}
.vehicle-item-wrapper .image-profile.idle {
  border-color: rgb(245, 200, 0);
}
.vehicle-item-wrapper .image-profile.stop {
  border-color: rgb(221, 33, 0);
}
.vehicle-item-wrapper .image-profile.overspeed {
  border-color: rgb(141, 0, 223);
}
.vehicle-item-wrapper .image-car {
  height: 18px;
}
.vehicle-item-wrapper .image-status {
  height: 15px;
}
.vehicle-item-wrapper .address-text {
  font-size: 11px;
}
.vehicle-detail-wrapper {
  background-color: whitesmoke;
  width: 100%;
  transition: 0.3s;
  overflow: hidden;
  height: 220px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.marker-detail-content {
  max-height: 184px;
  overflow-y: auto;
}
</style>
