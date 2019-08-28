import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: "#29b6f6",
                secondary: "#fbc02d",
                accent: "#0086c3"
            },
            dark: {}
        }
    }
});
