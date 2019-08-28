<template>
        <v-simple-table>
            <thead>
            <tr>
                <th class="text-left">Player</th>
                <th class="text-left">Par(+/-)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="score in result.scores" :key="score.player_id">
                <td>{{score.player_name}}</td>
                <td>
                                        <span v-if="result.par - score.score !== 0">
                                            {{score.score > result.par ? "+" : "-"}}{{Math.abs(result.par - score.score)}}
                                        </span>
                    <span v-if="result.par - score.score === 0">E</span>
                </td>

            </tr>
            </tbody>
        </v-simple-table>
</template>

<script>
    export default {
        name: "ResultTable",
        props: ["result"]
    }
</script>

<style scoped>

</style>