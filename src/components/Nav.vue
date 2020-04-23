<template>
    <div class="header">
        {{currentStage}}:{{subStage}}
        <div class="menu">
            <div v-for="(item, index) in menu" :key="index" :class="{select:selected(index)}">
                {{item}}
            </div>
        </div>
        <div class="submenu" v-if="subStage">
            <div v-for="(item, index) in submenu" :key="index" :class="{select:subStage===item}">
                {{item}}
            </div>
        </div>
    </div>
</template>


<script lang="js">
    export default {
        name: "Nav",
        props: ["currentStage", "subStage"],
        methods: {
            selected(index) {
                return this.currentStage === index;
            }
        },
        created(){
        },
        computed: {
            menu() {
                return Object.keys(this.$store.state.stages);
            },
            submenu() {
                //获取当前阶段
                const stage=this.menu[this.currentStage];
                return this.$store.state.stages[stage]||[];
            }
        },

    };
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        flex-direction: column;

        .menu {
            display: flex;
            flex-direction: row;
            border: 1px solid #000;
        }

        .submenu {
            display: flex;
            border: 1px solid #000;
        }
    }

    .select {
        color: #fff;
        background: #108ee9;
    }
</style>