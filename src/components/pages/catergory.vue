<template>
  <div>
    <div class="list-group sticky-top" v-for="(item, index) in category" :key="item">
      <a
      href="#"
      class="list-group-item list-group-item-action"
      @click="setActive(item, index)"
      :class="{'active' : activeIndex === index}">
        <i class="fa fa-align-left" aria-hidden="true"></i>
        {{ item }}
      </a>
    </div>
  </div>
</template>


<script>
import mainProduct from '../mainProduct'
export default {
  props: {
    category:{
      type: Array,
      default: ()=>{[]}
    }
  },
  data () {
    return {
      activeIndex:''
    }
  },
  methods: {
    setActive(item, index) {
      //  console.log(item, index)
       this.activeIndex = index
       this.$emit('changeCategory', item)
    }
  },
  created() {
  }
}
</script>
