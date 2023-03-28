<template>
  <h2>name:{{ name }}</h2>
  <h2>count:{{ count }}</h2>
  <hr>
  <h2>user:{{ user }}</h2>
  <hr>
  <h2>getters:{{ getNamePlugs }}</h2>
  <button @click="change">改名</button>
  <button @click="add">count+1</button>
  <button @click="reset">reset</button>
</template>
<script setup lang="ts">
  import { useTestStore } from './store';
  import { storeToRefs } from 'pinia';
  const Test = useTestStore();
  /* 
    pinia解构不再具有响应式，须通过storeToRefs添加响应式，
    其原理大概是将换入对象通过toRaw转成普通对象，然后遍历其属性添加一层ref响应式
  */
  // const { name,count,user } = Test;
  const { name,count,user,getNamePlugs } = storeToRefs(Test);

  const reset = () => {
    // 让state变回store初始化的数据状态
    Test.$reset()
  }

  const change = () => {
    // console.log(Test.$state)
    Test.setUser();
  }

  const add = () => {
    // 第一种 直接修改state的值
    Test.count++;

    // 第二种 通过$patch修改 
    /* Test.$patch({
      name: "大飞机"
    }) */

    // 第三种 通过传入一个工厂函数
    /* Test.$patch((state)=>{
      if(1){
        state.name = '超大飞机'
      }
    }) */

    // 第四种 通过$state,但需要修改整个对象属性，不然报错
    // Test.$state = {
    //   name:"微型飞机",
    //   count: 2
    // }

    // 第五种 通过Action
    // Test.setCurrent(567);
  }
  // state修改就会执行回调
  /* Test.$subscribe((args,state)=>{
    // console.log(args)
    // console.log(state)
    console.log("subscribe-change")
  }) */
  
  // 调用action方法就会执行回调
  /* Test.$onAction((args:any) =>{
    console.log(args);
    args.after(()=>{ // 最后执行
      console.log("康康什么时候执行") // 执行顺序 onAction->subscribe->after
    })
    console.log('onAction-change')
  }) */
</script>

<style scoped>

</style>
