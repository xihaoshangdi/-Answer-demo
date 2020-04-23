<template>
    <div class="home">
        <Nav
                :current-stage="currentStage"
                :sub-stage="detail.menu"/>
        <answer
                :detail="detail"
                @next="next"
                @previous="previous"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import answer from "@/components/answer.vue";
    import Nav from "@/components/Nav";

    export default {
        name: "toAnswer",
        data() {
            return {
                detail: {},
                currentStage: 0,
                finish: [],
                answered: [],
                process: [0]
            };
        },
        components: {
            Nav,
            answer
        },
        computed: {
            topics() {
                return this.$store.state.topics;
            }
        },
        created() {
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            console.log("this.topics", this.topics);
            console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            this.detail = this.topics[0][0];//第一题
        },
        methods: {
            previous() {
                let last = this.finish[this.finish.length - 1];
                this.detail = last.detail;
                this.finish.pop();
                this.process.pop();
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("finish", this.finish);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            },
            next(data) {
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("data", data);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                let finishData = {
                    answer: data.answer,
                    stage: this.currentStage,
                    detail: data.detail
                };
                this.finish.push(finishData);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("finish", this.finish);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                //
                let len = this.topics[this.currentStage].length;//获取当前阶段的长度
                if (this.detail.index === len) {//切换阶段重新拿题==>题目更新
                    this.answered.push(...this.finish);
                    this.finish = [];
                    this.currentStage = this.currentStage + 1;
                    this.detail = this.topics[this.currentStage][0];
                    return null;
                }
                //
                if (this.detail.process) {//流程图
                    //提示
                    //默认提示
                    if (data.detail.preset) {
                        alert(data.detail.preset);
                    }
                    //选择流程图
                    if (data.detail.tip) {
                        // console.log(data.detail.tip[this.process[this.process.length-1]][data.answer]);
                        if (data.detail.tip[String(this.process[this.process.length - 1])][data.answer]) {
                            alert(data.detail.tip[String(this.process[this.process.length - 1])][data.answer]);
                        }
                    }
                    //检查提示(排除特殊情况)
                    if (!data.detail.special&&data.detail.examine && !(data.answer === data.detail.answer)) {
                        const {status, prompt} = data.detail.examine;
                        if (status === "stay") {
                            alert(prompt);
                            this.finish.pop();
                        } else {
                            //答题重置为当前阶段第1题，清空历史数组
                            this.detail = this.topics[this.currentStage][0];
                            this.finish = [];
                            this.process = [0];
                        }
                        return null;
                    }
                    //特殊情况处理
                    //抽取下一题
                    const beforeIndex = String(this.process[this.process.length - 1]);
                    const index = data.detail.next[beforeIndex][data.answer];
                    this.process.push(data.detail.index);
                    this.detail = this.topics[this.currentStage][index - 1];
                    return null;
                }
                //正常流程
                this.detail = this.topics[this.currentStage][data.detail.index];

            }
        }

    }
    ;
</script>
