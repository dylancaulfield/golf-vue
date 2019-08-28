<template>
    <v-container>


        <v-card>
            <v-card-text>
                <v-text-field
                        outlined
                        label="Filter Courses"
                        v-model="courseNameFilter"
                        prepend-inner-icon="search"
                        :messages="resultsShownMessage"
                >

                </v-text-field>
            </v-card-text>
        </v-card>


        <v-card class="mt-4">
            <v-list-item-group>
                <v-subheader>RESULTS</v-subheader>
                <v-list-item :key="result.id" v-for="result in filteredCourses"
                             :to="{name:'result', params: {id: result.id}}">
                    <v-list-item-content>
                        <v-list-item-title>{{result.course}}</v-list-item-title>
                        <v-list-item-subtitle>{{format(new Date(result.date), "do MMMM")}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>

        </v-card>


        <v-btn
                to="/results/new"
                fixed
                fab
                bottom
                right
                style="margin-bottom: 51px; margin-right: 15px"
                color="secondary"
        >
            <v-icon>add</v-icon>
        </v-btn>


    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import format from "date-fns/format";

    export default {
        name: "Results",

        computed: {
            ...mapGetters(["allResults"]),
            resultsShownMessage() {
                return `Showing ${this.filteredCourses.length} results out of ${this.allResults.length}`
            },
            filteredCourses() {
                return this.allResults.filter(e => e.course.toLowerCase().includes(this.courseNameFilter.toLowerCase()))
            }

        },

        methods: {
            format
        },

        data() {
            return {
                courseNameFilter: ""
            }
        }
    }
</script>

<style scoped>

</style>