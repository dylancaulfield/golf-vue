<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item exact to="/">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item exact to="/results">
                    <v-list-item-action>
                        <v-icon>equalizer</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Results</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item disabled exact to="/players">
                    <v-list-item-action>
                        <v-icon>supervisor_account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Players</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item disabled exact to="/courses">
                    <v-list-item-action>
                        <v-icon>golf_course</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Courses</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>The Bogey Men</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer
                color="primary"
                app
        >
            <span class="white--text">&copy; 2019 - Dylan Caulfield</span>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'App',

        props: {
            source: String
        },

        components: {},

        methods: {
            ...mapActions([
                "fetchResults",
                "fetchPlayers",
                "fetchCourses"
            ])
        },

        data: () => ({
            drawer: null
        }),

        created() {
            this.fetchResults();
            this.fetchPlayers();
            this.fetchCourses();
        }
    };
</script>
