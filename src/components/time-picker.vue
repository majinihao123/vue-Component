<template>
    <div class="time-picker" @click="openDown" v-clickoutside="clickoutside">
        <div class="content-first">
            <div class="redSpan">*</div>
            <div>期望上门时间</div>
        </div>
        <div class="content-first">
            <div>
                {{ time }}
            </div>
            <i class="el-icon-s-order"></i>
        </div>
        <div v-show="isDropdown" class="dropdown">
            <div class="time">
                <div v-for="item in dayList" class="item" :class="timeValue == item.lable ? 'active' : ''"
                    @click="dayChange(item)">
                    <div>{{ item.lable }}</div>
                    <div>{{ item.ymd }}</div>
                </div>
            </div>
            <div class="timeList">
                <div v-for="item  in  timeToList[timeValue]" @click="timeChange(item)" class="timeBox"
                    :class="clickDay == item.day && clickValue == item.lable ? 'active' : ''">
                    {{ item.lable }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
    name: '',
    directives: { Clickoutside },
    components: {},
    props: {},
    data() {
        return {
            isDropdown: false,
            dayList: [],
            listArray: [
                "08:00~09:00",
                "09:00~10:00",
                "10:00~11:00",
                "11:00~12:00",
                "12:00~13:00",
                "13:00~14:00",
                "14:00~15:00",
                "15:00~16:00",
                "16:00~17:00",
                "17:00~18:00",
                "18:00~19:00",
                "19:00~19:30",
            ],
            timeToList: {
            },
            timeValue: "今天",
            clickValue: "一小时内",
            clickDay: "今天",
            time: "",
        }
    },
    created() {
    },
    watch: {
    },
    computed: {

    },
    mounted() {
        this.initial()
        this.setTime()
        this.getDay()
        this.getTimeToList()
    },
    methods: {

        initial() {
            let minute = this.getMinute()
            let hour = this.getHours()
            if (hour < 9) {
                this.clickValue = "08:00~09:00"
                this.clickDay = "今天"
                return
            }
            if (hour >= 19 && minute > 30) {
                this.clickValue = "08:00~09:00"
                this.clickDay = "明天"
                return
            }
        },

        getTimeToList() {
            this.dayList.forEach((item) => {
                let arr = JSON.parse(JSON.stringify(this.listArray))
                if (item.lable === "今天")
                    arr = this.getTodayList(arr)
                this.timeToList[item.lable] = this.transTime(arr, item.lable)
            })
        },

        openDown() {
            this.isDropdown = true
        },

        clickoutside(e) {
            if (!e) {
                this.isDropdown = false
                this.timeValue = this.clickDay
            }
        },

        dayChange(item) {
            this.timeValue = item.lable
        },

        timeChange(item) {
            this.clickValue = item.lable
            this.clickDay = item.day
            this.setTime()
        },

        setTime() {
            this.time = this.clickDay + ' ' + this.clickValue
            this.$emit('setTime', this.time);
        },

        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        getDay() {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            const afterTomorrow = new Date(today)
            afterTomorrow.setDate(afterTomorrow.getDate() + 2)

            let dayArray = [this.formatDate(today), this.formatDate(tomorrow), this.formatDate(afterTomorrow)]
            let dayName = ['今天', '明天', '后天']
            this.dayList = dayName.map((item, index) => {
                return {
                    lable: item,
                    ymd: dayArray[index]
                }
            })
        },

        transTime(arr, day) {
            let temp = []
            arr.forEach((item) => {
                temp.push({
                    lable: item,
                    day: day
                })
            })
            return temp
        },

        getHours() {
            const now = new Date();
            return now.getHours();
        },

        getMinute() {
            const now = new Date();
            return now.getMinutes();
        },

        getTodayList(arr) {
            let minute = this.getMinute()
            let hour = this.getHours()
            if (hour < 8)
                return arr
            if (hour >= 19 && minute > 30)
                return []
            arr = arr.slice(hour - 7)
            arr = ['一小时内', ...arr]
            return arr
        }

    },
    beforeDestroy() {
    }
}
</script>
<style   scoped>
.time-picker {
    background-color: #f4f5f7;
    width: 336px;
    height: 32px;
    padding: 0 6px;

    position: relative;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .content-first {
        display: flex;
        align-items: center;
        gap: 3px;

        .redSpan {
            color: red;
        }
    }

    .dropdown {
        position: absolute;
        top: 32px;
        right: 0px;
        z-index: 99;
        width: 100%;
        height: 220px;
        background-color: #fff;
        box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.04);
        border-radius: 10px;
        padding: 6px;

        .time {
            display: flex;

            .item {
                width: 33%;
                height: 45px;
                text-align: center;
                font-size: 14px;
                line-height: 18px;
                border-bottom: 1px solid #cccccc;
            }

            .active {
                color: red;
                border-bottom: 1px solid red;
            }
        }

        .timeList {
            padding: 10px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;

            .timeBox {
                width: 93px;
                height: 29px;
                background-color: #f7f8fa;
                text-align: center;
            }

            .timeBox:hover {
                color: red;
            }

            .active {
                color: red;
                background-color: #ffefef;
            }
        }
    }

} 
</style>
  