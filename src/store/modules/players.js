import axios from "axios";

export default {
    state: {
        players: []
    },

    actions: {
        async fetchPlayers({commit}) {
            try {
                const response = await axios.get("https://golfapi.dylancaulfield.ie/players");

                commit("setPlayers", response.data);

            } catch (e) {
                console.log(e)
            }

        }
    },

    mutations: {
        setPlayers: (state, players) => state.players = players
    },

    getters: {
        allPlayers: state => state.players
    }
}