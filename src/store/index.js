import Vue from "vue";
import Vuex from "vuex";

const fs = require("fs");
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stages: [],
        topics: []
    },
    mutations: {
        SET_STAGES: (state, arr) => {
            state.stages = arr;
        },
        ADD_TOPICS: (state, arr) => {
            state.topics.push(arr);
        }
    },
    actions: {
        loadTopic(context, data) {
            const path = "C:\\Users\\xihao\\Desktop\\vs\\demo\\src\\assets\\QuestionBank\\";
            let arr = [];
            data.map(item => {
                let All_TOPIC = fs.readFileSync(path + `${item}.json`);
                arr.push(JSON.parse(All_TOPIC.toString()));
            });
            return arr;
        }
    },
    modules: {}
});
