<template>
  <div class="px-3 py-2">
    <div class="row">
      <div class="col-xxl-6 col-12">
        <div class="row">
          <div class="col-auto">
            <!-- src="../../assets/driver/2.png" -->
            <!-- <img
              class="image-profile-detail"
              :src="
                Boolean(activeVehicle.driverId)
                  ? getImgUrl(`driver/${activeVehicle.driverId}.png`)
                  : getImgUrl(`driver/profile.png`)
              "
            /> -->
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <span class="text-detail-header">รถ</span>
                <span class="text-detail-content">{{
                  vehicleDetail.vehicleName == null
                    ? "-"
                    : vehicleDetail.vehicleName
                }}</span>
              </div>
              <div class="col">
                <span class="text-detail-header">กลุ่ม</span>
                <span class="text-detail-content">
                  {{
                    vehicleDetail.groupName == null
                      ? "-"
                      : vehicleDetail.groupName
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-6 col-12">Graph</div>
    </div>

    <!-- {{ activeVehicle }} -->
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      activeVehicle: Object,
    };
  },
  computed: {
    vehicleDetail() {
      if (this.vehicleProp != null) {
        this.activeVehicle = this.vehicleProp;
      }
      return this.activeVehicle;
    },
  },
  methods: {
    getImgUrl(pic) {
      return require("../../assets/" + pic);
    },
  },
  props: {
    vehicleProp: Object,
  },
};
</script>

<style scoped>
.image-profile-detail {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.text-detail-header {
  color: rgb(0, 119, 230);
  margin-right: 5px;
}
</style>