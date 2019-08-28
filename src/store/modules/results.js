import axios from "axios"

export default {
    state: {
        results: [],
        latestResult: {}
    },

    actions: {
        async fetchResults({commit}) {
            try {
                var response1 = await axios.get("https://golfapi.dylancaulfield.ie/results");

                commit("setResults", response1.data);

                try {
                    var response2 = await axios.get("https://golfapi.dylancaulfield.ie/results/" + response1.data[0].id);

                    commit("setLatestResult", response2.data);


                } catch (e) {
                    console.log(e)
                }

            } catch (e) {
                console.log(e)
            }

        }
    },

    mutations: {
        setResults: (state, results) => state.results = results,
        setLatestResult: (state, result) => state.latestResult = result
    },

    getters: {
        allResults: state => state.results,
        latestResult: state => state.latestResult
    }
}