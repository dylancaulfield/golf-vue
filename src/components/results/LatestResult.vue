<template>
    <div>
        <v-card v-if="!latestResult.result_id" class="text-center py-6">
            <v-progress-circular
                    indeterminate
                    color="secondary"
            ></v-progress-circular>
        </v-card>
        <v-card v-if="latestResult.result_id">
            <v-chip
                    :key="score.player_id"
                    v-for="score in latestResult.scores"
                    class="ma-2"
                    color="accent"
                    text-color="white"
                    small
            >
                <v-avatar left>
                    <v-icon>person</v-icon>
                </v-avatar>
                {{score.player_name}}
            </v-chip>

            <v-card-title>Latest Result</v-card-title>
            <v-card-text>The latest game was played in {{latestResult.course_name}} on the {{format(new Date(latestResult.date), `do 'of' MMMM`)}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions >
                <v-btn raised color="secondary" :to="{name: 'result', params: {id: latestResult.result_id} }">VIEW</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {format} from "date-fns";


    export default {
        name: "LatestResult",

        computed: {
            ...mapGetters(["latestResult"])
        },

        methods: {
            format,
        }
    }
</script>

<style scoped>

</style>