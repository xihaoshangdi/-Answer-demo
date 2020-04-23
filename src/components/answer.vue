<template>
    <div>
        <div class="header">
            <div class="menu">
                <div v-for="(stage, index) in stages" :key="index" :class="{select:selected(index)}">
                    {{stage}}:{{index}}:{{currentStage}}
                </div>
            </div>
            <div class="childmenu">
                <div v-for="(stage, index) in childStage" :key="index" :class="{select:detail.menu===stage}">
                   {{stage}}
                </div>
            </div>
        </div>

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
            },
            stages: {
                type: Array,
                // eslint-disable-next-line vue/require-valid-default-prop
                default: []
            },
            childStage: {
                type: Array,
                // eslint-disable-next-line vue/require-valid-default-prop
                default: []
            },
            currentStage: {
                type: Number,
                default: 0
            }
        },
        created() {
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            console.log("detail", this.detail);
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        },
        methods: {
            selected(index) {
                return this.currentStage === index;
            },
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
                    let data = {
                        detail: this.detail,
                        currentStage: this.currentStage,
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
    .select {
        color: #fff;
        background: #108ee9;
    }

    .header {
        display: flex;
        flex-direction: column;
        .menu {
            display: flex;
            flex-direction: row;
            border: 1px solid #000;
        }
        .childmenu{
            display: flex;
            border: 1px solid #000;
        }
    }

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
  