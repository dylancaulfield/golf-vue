import axios from "axios";

export default {
    state: {
        courses: []
    },

    actions: {
        async fetchCourses({commit}) {
            try {
                const response = await axios.get("https://golfapi.dylancaulfield.ie/courses");

                commit("setCourses", response.data);

            } catch (e) {
                console.log(e)
            }

        }
    },

    mutations: {
        setCourses: (state, courses) => state.courses = courses
    },

    getters: {
        allCourses: state => state.courses
    }
}