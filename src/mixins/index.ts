// https://github.com/vuejs/vue-class-component#using-mixins
import { timestampToTime } from "../utils/utils";
import { defineComponent } from 'vue';
import messageComponent from "./messageComponent";

const SharedComponents = defineComponent({
  mixins: [messageComponent],
  data(){
      return{
      }
  },
  methods: {
    formatTime(value: string | Date): string {
      return timestampToTime(value, true);
    },
    
  }
});
export default SharedComponents;
