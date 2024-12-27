<template>
    <div>
        <el-button @click="addText" style="margin:  15px 0; ">添加补充字段</el-button>
        <div v-for="item, index in dataList">
            <el-button @click="deleteText" type="danger" v-if="index == dataList.length - 1"
                style="margin-bottom: 15px;">删除字段</el-button>
            <el-form :ref="`form${index}`" :model="item" :rules="rules" :key="index" label-width="80px">
                <el-form-item label="中文名称" prop="chineseName">
                    <el-input v-model="item.chineseName"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="englishName">
                    <el-input v-model="item.englishName"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-button v-if="dataList.length != 0" @click="submitForms" style="margin:  15px 0; ">提交</el-button>
    </div>
</template>
<script>

export default {
    name: 'addForm',
    components: {},
    data() {
        return {
            dataList: [],
            rules: {
                chineseName: [
                    { required: true, message: "请输入英文名称", trigger: "blur" },
                    { pattern: /^[\u4e00-\u9fa5]+$/, message: "只能输入中文", trigger: "blur" }
                ],
                englishName: [
                    { required: true, message: "请输入英文名称", trigger: "blur" },
                    { pattern: /^[a-zA-Z]+$/, message: "只能输入英文", trigger: "blur" }
                ],
            },
        }
    },
    props: {},
    created() {
    },
    watch: {
    },
    computed: {
    },
    mounted() {

    },
    methods: {
        addText() {
            this.dataList.push({ chineseName: '', englishName: '' });
        },
        deleteText() {
            this.dataList.pop();
        },
        submitForms() {
            const formDataArray = [];
            let valid = true;
            this.dataList.forEach((item, index) => {
                this.$refs[`form${index}`][0].validate((validForm) => {
                    if (!validForm) {
                        valid = false;
                    }
                });
                formDataArray.push(this.$refs[`form${index}`][0].model);
            });
            if (valid) {
                console.log(formDataArray);
                // 在这里处理提交的表单数据
            } else {
                console.log('表单验证失败');
            }
        }
    },
    beforeDestroy() {
    }
}
</script>
<style scoped></style>