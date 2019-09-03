<template>
    <v-card class="px-4">

        <v-simple-table class="my-6">
            <tbody>
                <tr>
                    <td>Best Player</td>
                    <td>{{this.result.scores[0].player_name}}</td>
                </tr>
                <tr>
                    <td>Worst Player</td>
                    <td>{{this.result.scores[this.result.scores.length - 1].player_name}}</td>
                </tr>
                <tr>
                    <td>Total Shots Taken</td>
                    <td>{{shotsTaken}}</td>
                </tr>
                <tr>
                    <td>Average Score</td>
                    <td>{{averageScore}}</td>
                </tr>
            </tbody>
        </v-simple-table>



        <div class="mb-6">
            <GChart
                    :settings="{packages: ['corechart']}"
                    type="LineChart"
                    :data="lineChartData"
                    :options="lineChartOptions"
            />

        </div>

        <div class="my-6">
            <GChart
                    :settings="{packages: ['corechart']}"
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
            />

        </div>




    </v-card>
</template>

<script>
    import { GChart } from 'vue-google-charts'

    export default {
        name: "ResultStats",
        props: ["result"],

        data(){
            return {
                lineChartOptions: {
                    hAxis: {
                        title: "Players"
                    },
                    vAxis: {
                        title: "Score"
                    },
                    legend: {
                        position: "top"
                    },
                    title: "Shots Taken",
                    curveType: "function"
                },

                pieChartOptions: {
                    title: "Shots Percentage",
                    is3D: true
                }
            }
        },

        components: {
            GChart
        },

        computed: {
            shotsTaken() {
                return this.result.scores.map(e => e.score).reduce((sum, score) => sum + score);
            },

            averageScore() {
                return Math.round(this.result.scores.map(e => e.score).reduce((sum, score) => sum + score) / this.result.scores.length);
            },

            lineChartData(){

                var labels = [["Player", "Par", "Average", "Score"]];

                var scores = this.result.scores.map(e => {
                    return [e.player_name.split(" ")[0], this.result.par, this.averageScore, e.score]
                });

                return labels.concat(scores)
            },

            pieChartData(){

                var labels = [["Player", "Shots"]];

                var scores = this.result.scores.map(e => {
                    return [e.player_name.split(" ")[0], e.score]
                });

                return labels.concat(scores)

            }
        }
    }
</script>

<style scoped>

    tr>td:first-child {
        font-weight: bold;
    }

</style>