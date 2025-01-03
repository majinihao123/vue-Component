<template>
    <div>
        <div id="l-map" class="baiduMap"></div>
        <el-form ref="form" :model="formData">
            <el-form-item label="位置信息" prop="unitName">
                <el-input v-model="formData.positionInfo" placeholder="请输入详细地址" id="suggestId" clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="经度" prop="lng">
                <el-input v-model="formData.lng" placeholder="请选择经度" :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="lat">
                <el-input v-model="formData.lat" placeholder="请选择纬度" :disabled="true">
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {},
            map: null,
            myGeo: null,
            ac: null,
        };
    },
    components: {},
    props: {
        center: {
            type: Array,
            default: () => [108.9470400, 34.2594300]
        },
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = new BMap.Map("l-map", { enableMapClick: false });
            this.map.centerAndZoom(new BMap.Point(this.center[0], this.center[1]), 11);
            this.map.enableScrollWheelZoom(true);
            this.myGeo = new BMap.Geocoder();
            this.initAutocomplete();
            this.map.addEventListener('click', this.handleMapClick);
        },
        initAutocomplete() {
            this.ac = new BMap.Autocomplete({ input: "suggestId", location: this.map });
            this.ac.addEventListener("onconfirm", this.handleConfirm);
        },
        handleConfirm(e) {
            // 鼠标点击下拉列表后的事件
            let _value = e.item.value;
            let address = _value.province + _value.city + _value.district + _value.street + _value.business;
            this.setPlace(address);
        },
        setPlace(address) {
            this.map.clearOverlays(); // 清除地图上所有覆盖物
            const local = new BMap.LocalSearch(this.map, {
                onSearchComplete: () => {
                    const point = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
                    const value = {
                        address,
                        position: [point.lng, point.lat],
                    };
                    this.$set(this.formData, 'lng', point.lng);
                    this.$set(this.formData, 'lat', point.lat);
                    this.$emit('getValue', value);
                    this.map.centerAndZoom(point, 15);
                    this.map.addOverlay(new BMap.Marker(point)); // 添加标注
                },
            });
            local.search(address);
        },
        handleMapClick(e) {
            this.map.clearOverlays(); // 清除地图上所有覆盖物
            const point = new BMap.Point(e.point.lng, e.point.lat);
            const marker = new BMap.Marker(point);
            this.map.addOverlay(marker);
            this.myGeo.getLocation(point, (geocoderResult) => {
                this.$set(this.formData, 'positionInfo', geocoderResult.address);
                this.$set(this.formData, 'lng', e.point.lng);
                this.$set(this.formData, 'lat', e.point.lat);
                const value = {
                    address: geocoderResult.address,
                    position: [e.point.lng, e.point.lat],
                };
                this.$emit('getValue', value);
            });
        },
    },
};
</script>

<style scoped>
.baiduMap {
    width: 100%;
    height: 500px;
}
</style>