<template>
    <el-form :model="form" :rules="rules" ref="form">
        <el-table :data="form.datas" highlight-current-row style="width: 100%">
            <el-table-column prop="index" label="序号" width="60">
                <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="企业名称">
                <template slot-scope="scope">
                    <template v-if="scope.row.action == 'view'">
                        {{ scope.row.name }}
                    </template>
                    <template v-else>
                        <el-form-item :prop="'datas.' + scope.$index + '.name'" :rules='rules.name'>
                            <el-select size="mini" v-model.trim="scope.row.name" style="width: 120px;" placeholder="">
                                <el-option label="企业一" value="企业一"></el-option>
                                <el-option label="企业二" value="企业二"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="数量">
                <template slot-scope="scope">
                    <template v-if="scope.row.action == 'view'">
                        {{ scope.row.num }}
                    </template>
                    <template v-else>
                        <el-form-item :prop="'datas.' + scope.$index + '.num'" :rules='rules.num'>
                            <el-input size="mini" v-model.number="scope.row.num" style="width: 60px;" placeholder=""  ></el-input>
                        </el-form-item>
                    </template>
                </template>
            </el-table-column>

            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <template v-if="scope.row.action == 'view'">
                        <el-button size="mini" @click="click_edit(scope.row, scope.$index)">编辑</el-button>
                        <el-button size="mini" @click="click_delete(scope.row, scope.$index)">删除</el-button>
                    </template>
                    <template v-else>
                        <el-button size="mini" @click="click_save(scope.row, scope.$index)">保存</el-button>
                        <el-button size="mini" @click="click_delete(scope.row, scope.$index)">删除</el-button>
                        <!-- <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">取消</el-button> -->
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
</template>

<script>

export default {
    name: '',
    components: {},
    props: {
        rowData: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
            form: {
                datas: [
                    { name: "企业一", num: 20 },
                    { name: "企业二", num: 32 },
                ],
            },

            //表单验证规则
            rules: {
                name: [{
                    type: 'string',
                    required: true,
                    trigger: 'blur',
                    message: '请选择企业',
                }],
                num: [{
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '请输入下发数量',
                },
                {
                    type: 'number',
                    trigger: 'blur',
                    min: 1,
                    max: 999,
                    message: '最小1，最大999',
                }],
            }
        }
    },

    created() {
        this.form.datas.map(item => {
            this.$set(item, "action", "view")
            return item;
        });
    },

    watch: {
    },
    computed: {
    },
    mounted() {
    },
    methods: {


        //可以外部调用做正则校验
        submit() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        resolve(valid)
                    }
                    else {
                        console.log(valid)
                        reject(valid)
                    }
                })
            })
        },

        validateField(form, index) {
            let result = true;
            for (let item of this.$refs[form].fields) {
                if (item.prop.split(".")[1] == index) {
                    this.$refs[form].validateField(item.prop, (error) => {
                        if (error != "") {
                            result = false;
                        }
                    });
                }
                if (!result) break;
            }
            return result;
        },

        //对部分表单字段进行重置
        resetField(form, index) {
            this.$refs[form].fields.forEach(item => {
                if (item.prop.split(".")[1] == index) {
                    item.resetField();
                }
            })
        },

        //插入一条添加操作的数据
        click_add() {
          
            this.form.datas.push({
                name: undefined,
                num: undefined,
                action: undefined
            });
        },

        //新增-重置操作
        click_reset(item, index) {
            this.resetField('form', index);
        },

        //编辑-保存操作
        click_save(item, index) {
            if (!this.validateField('form', index)) return;
            item.action = "view";
        },

        //编辑-取消操作
        click_cancle(item, index) {
            this.resetField('form', index);
            item.action = "view";
        },

        //编辑操作
        click_edit(item, index) {
            item.action = "edit";
        },

        //删除操作
        click_delete(item, index) {
            this.$confirm("确定删除该条数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    //模拟删除一条数据
                    this.form.datas.splice(index, 1);
                })
                .catch(() => { });
        },

    },
    beforeDestroy() {
    }
}
</script>
<style  scoped></style>