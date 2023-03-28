import { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'
type Options = {
  key ?: string
}

const __piniaKey__ = 'piniaKey';

const getStorage = (key:string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string)  : {}
}

const setStorage = (key:string,value:any) => {
  localStorage.setItem(key,JSON.stringify(value));
}

// 数据持续化插件
export const piniaDataPersistencePlugin = (options:Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    let data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`);
    store.$subscribe(() => {
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`,toRaw(store.$state))
      console.log("change");
    })

    return {...data}
  }
}