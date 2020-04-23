<template>
    <div>
        <div class="answer-box">
            <div class="topic">{{detail.topic}}</div>
            <div class="options" v-if="!detail.isMultiple">
                <div v-for="option in detail.options" :key="option.label" class="answer-option">
                    <el-radio v-model="answer" :label="option.label">{{option.value}}</el-radio>
                </div>
            </div>
            <div class="options" v-else>
                <el-checkbox-group v-model="answerList">
                    <div v-for="option in detail.options" :key="option.label" class="anwser-option">
                        <el-checkbox :label="option.label">{{option.value}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
            <div class="edit">
                <el-button type="primary" @click="previous" :disabled="detail.index === 1">上一题</el-button>
                <el-button type="success" @click="next">下一题</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src


    export default {
        name: "Home",
        components: {},
        data() {
            return {
                answer: "",
                answerList: []
            };
        },
        props: {
            detail: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        created() {
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            console.log("detail", this.detail);
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        },
        methods: {

            previous() {
                this.answer = "";
                this.answerList = [];
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("answer", this.answer);
                this.$emit("previous");
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            },
            next() {
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("answer", this.answer);
                console.log("answerList", this.answerList);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                if (this.answer === "" && this.answerList.length === 0) {
                    this.$message("请选择答案");
                } else {
                    this.answerList.sort();
                    let data = {
                        detail: this.detail,
                        answer: this.detail.isMultiple ? this.answerList.join(",") : this.answer
                    };
                    this.answer = "";
                    this.answerList = [];
                    this.$emit("next", data);
                }
            }
        }

    };
</script>

<style lang="scss" scoped>
    .answer-box {
        display: flex;
        align-items: center;
        margin-top: 50px;
        flex-flow: column;

        .options {
            margin-top: 50px;
            margin-bottom: 50px;
        }
    }

</style>
  