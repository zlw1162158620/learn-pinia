import { defineStore } from 'pinia';
import { Names } from './store-name';

type User = {
  name:string,
  age:number
}
// 模拟异步操作数据
const asyncSetUser = ():Promise<User> => {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const userObj:User = {name:"小黑子",age:43} 
      resolve(userObj);
    },300)
  })
}
// 创建store
export const useTestStore = defineStore(Names.TEST,{
  state: () => {
    return {
      name: '小飞机',
      count: 1,
      user:<User>{}
    }
  },
  getters:{
    getNamePlugs():string{
      return this.name + "来咯";
    }
  },
  actions:{
    setCurrent(num:number){
      this.count = num;
    },
    async setUser(){
      this.user = await asyncSetUser()
    }
  }
})