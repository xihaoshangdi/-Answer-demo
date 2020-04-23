<template>
    <div class="home">
        <el-select v-model="value" placeholder="请选择" @change="change">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="success" @click="fly">开始</el-button>
    </div>
</template>

<script>
    import HashBank from "@/assets/HashBank";
    import config from "@/assets/config";

    export default {
        name: "Home",
        data() {
            return {
                stages: [],
                options: [{
                    value: "农林喷洒",
                    label: "农林喷洒"
                }, {
                    value: "跳伞作业",
                    label: "跳伞作业"
                }, {
                    value: "训练飞行",
                    label: "训练飞行"
                }],
                value: "",
                topics: []
            };
        },
        components: {},
        methods: {
            getRandom(min, max) {//获取随机数
                return min + Math.floor(Math.random() * (max - min + 1)); //从min值开始
            },
            randomArr(start, end, len) {//获取一个随机数组 用于抽题
                let topicArray = [];
                let state = true;
                while (state) {
                    let number = this.getRandom(start, end);
                    if (!topicArray.includes(number)) {
                        topicArray.push(number);
                        if (topicArray.length === len) {
                            state = false;
                        }
                    }
                }
                topicArray.sort((a, b) => a - b);
                return topicArray;
            },
            change() {
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
                console.log("value", this.value);
                console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
            },
            async fly() {//抽题逻辑实现
                let current = HashBank[this.value];//获取对应的阶段
                this.stages = current.stages;//包含所有子菜单的对象
                this.$store.commit("SET_STAGES", this.stages);
                let arr = await this.$store.dispatch("loadTopic", current.topics);//获取所有题库
                arr.map((item, index) => {
                    const topic = current.topics[index];
                    const topicArr = [];
                    if (config[this.value][topic]) {
                        const ranTopicArr = this.randomArr(0, item.length - 1, config[this.value][topic]);
                        ranTopicArr.forEach((i, index) => {
                            item[i].index = index + 1;
                            topicArr.push(item[i]);
                        });
                        this.$store.commit("ADD_TOPICS", topicArr);
                    } else {//流程图的题不进行数据清洗，直接全部导入
                        this.$store.commit("ADD_TOPICS", item);
                    }
                });
                // console.log(this.$store.state.topics);
                await this.$router.push({path: "toAnswer"});
            }
        }
    };
</script>
