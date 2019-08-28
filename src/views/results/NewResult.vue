<template>

    <v-container>

        <v-card :loading="loading" color="primary">

            <v-stepper v-model="progress">
                <v-stepper-header>
                    <v-stepper-step :complete="progress > 1" step="1">Golf Course</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="progress > 2" step="2">Date</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="progress > 3" step="3">Players</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card elevation="0">
                            <v-select v-model="form.course" color="secondary" label="Select Course" solo
                                      :items="selectCourses"></v-select>
                        </v-card>


                        <v-btn
                                color="primary"
                                @click="form.course ? progress++ : showSnackbar('Please select a course')"
                        >
                            Next
                        </v-btn>

                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card elevation="0">
                            <v-date-picker v-model="form.date" color="secondary" full-width
                                           :max="new Date().toISOString()" class="mb-4"></v-date-picker>
                        </v-card>


                        <v-btn
                                color="primary"
                                @click="form.date ? progress++ : showSnackbar('Please select a date')"
                        >
                            Next
                        </v-btn>

                        <v-btn text @click="progress--">Back</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card elevation="0">

                            <v-btn-toggle class="mb-4">
                                <v-btn text @click="addScore">
                                    <v-icon>add</v-icon>
                                </v-btn>
                                <v-btn text @click="deleteScore(form.scores.length - 1)">
                                    <v-icon>remove</v-icon>
                                </v-btn>
                            </v-btn-toggle>


                            <v-row v-for="(score, index) in form.scores" :key="index">
                                <v-col cols="12">
                                    <v-select v-model="score.player" solo color="secondary" hide-details
                                              :items="selectPlayers" label="Select Player"></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field color="secondary" solo label="Score" type="number"
                                                  v-model.number="score.score"></v-text-field>
                                </v-col>
                                <v-col cols="6" style="padding-top: 12px">
                                    <v-btn large color="error" min-height="48" @click="deleteScore(index)">Delete
                                    </v-btn>
                                </v-col>
                            </v-row>


                        </v-card>


                        <v-btn
                                color="secondary"
                                @click="save"
                                :loading="loading"
                        >
                            Save
                        </v-btn>

                        <v-btn text @click="progress--">Back</v-btn>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>

        </v-card>

        <v-snackbar v-model="snackbar" :timeout="5000">
            {{message}}
            <v-btn @click="snackbar = ''" color="secondary">
                Close
            </v-btn>
        </v-snackbar>


    </v-container>

</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import axios from "axios";


    export default {
        name: "NewResult",

        computed: {
            ...mapGetters(["allCourses", "allPlayers"]),
            selectPlayers() {
                return this.allPlayers.map(e => {
                    return {
                        text: e.name,
                        value: e.id
                    }
                })

            },
            selectCourses() {
                return this.allCourses.map(e => {
                    return {
                        text: e.name,
                        value: e.id
                    }
                })
            }
        },

        data() {
            return {
                form: {
                    course: "",
                    date: "",
                    scores: [{
                        player: "",
                        score: ""
                    }]
                },
                progress: 1,
                loading: false,
                snackbar: false,
                message: ""
            }
        },

        methods: {
            ...mapActions(["fetchResults"]),

            addScore() {
                this.form.scores.push({
                    player: "",
                    score: ""
                })
            },

            deleteScore(index) {
                this.form.scores.splice(index, 1)
            },

            async save() {

                if (this.form.scores.length === 0) {

                    return this.showSnackbar("Please add a score");
                }

                for (let i = 0; i < this.form.scores.length; i++) {
                    if (!this.form.scores[i].player || !this.form.scores[i].score) {

                        return this.showSnackbar("Please complete the form");
                    }
                }

                this.loading = true;

                try {
                    await axios.post("https://golfapi.dylancaulfield.ie/results", this.form);

                    this.showSnackbar("Result created successfully");

                    this.form = {
                        course: "",
                        date: "",
                        scores: [{
                            player: "",
                            score: ""
                        }]
                    };

                    this.loading = false;
                    this.progress = 1;

                    this.fetchResults();
                } catch (e) {

                    this.loading = false;

                    this.showSnackbar("An error has occurred");

                }


            },

            showSnackbar(message) {
                this.message = message;
                this.snackbar = true;
            }
        }
    }
</script>

