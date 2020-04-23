<template>
    <div class="home">
        <answer
                :detail="detail"
                :stages="stages"
                :currentStage="currentStage"
                :childStage="childStage"
                @next="next"
                @previous="previous"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import answer from "@/components/answer.vue";

    export default {
        name: "toAnswer",
        data() {
            return {
                detail: {},
                currentStage: 0,
                finish: [],
                process:[0],
            };
        },
        components: {
            answer
        },
        computed: {
            stages() {
                return Object.keys(this.$store.state.stages);
            },
            childStage(){
                console.log('childStage',this.$store.state.stages[this.stages[this.currentStage]]);
                return this.$store.state.stages[this.stages[this.currentStage]]
            },
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
                    stage: data.currentStage,
                    detail: data.detail,
                    answer: data.answer,
                };
                this.finish.push(finishData);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("finish", this.finish);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                // 已经是当前阶段的最后一个  弹窗判断TODO
                let len = this.topics[data.currentStage].length;
                if (data.detail.index === len) {
                    this.currentStage = data.currentStage + 1;
                    this.detail = this.topics[this.currentStage][0];
                } else {
                    this.currentStage = data.currentStage;
                    if (data.detail.process) {//第二阶段 流程图问题
                        console.log(this.process);
                        const index = data.detail.next[String(this.process[this.process.length-1])][data.answer];//取下一题的题号
                        if (data.detail.tip){
                            // console.log(data.detail.tip[this.process[this.process.length-1]][data.answer]);
                            alert(data.detail.tip[String(this.process[this.process.length-1])][data.answer])
                        }
                        this.process.push(data.detail.index);
                        this.detail = this.topics[this.currentStage][index-1];
                    } else {
                        this.detail = this.topics[this.currentStage][data.detail.index];
                    }
                }
            }
        }
    };
</script>
