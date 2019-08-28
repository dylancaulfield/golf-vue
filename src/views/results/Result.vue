<template>
    <v-container>

        <v-card v-if="!result.result_id" class="text-center py-6">
            <v-progress-circular
                    indeterminate
                    color="secondary"
            ></v-progress-circular>
        </v-card>

        <div v-if="result.result_id">

            <v-card class="mb-4">
                <v-card-title>{{result.course_name}}</v-card-title>

                <v-tabs v-model="tab" grow color="secondary" mobile-break-point="1">
                    <v-tab>Scores</v-tab>
                    <v-tab>Stats</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <ResultTable :result="result" />
                    </v-tab-item>
                    <v-tab-item>
                        <ResultStats :result="result" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card>


        </div>

    </v-container>
</template>

<script>
    import axios from "axios";
    import ResultTable from "../../components/results/ResultTable";
    import ResultStats from "../../components/results/ResultStats";


    export default {
        name: "Result",
        components: {ResultStats, ResultTable},
        data() {
            return {
                result: {},
                tab: null
            }
        },

        created() {
            axios.get("https://golfapi.dylancaulfield.ie/results/" + this.$route.params.id)
                .then(r => {
                    this.result = r.data;

                    this.result.scores.sort((a, b) => {
                        return a.score - b.score
                    })
                })
                .catch(e => {

                })
        }
    }
</script>

<style scoped>

</style>