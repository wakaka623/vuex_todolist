import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有任务列表
    list:[],
    //文本输入框中的值
    inputValue:'AAA',
     //保存默认的选项卡值
    viewKey:'all'

  },
  mutations: {
    initList(state,list){
      state.list=list
    },
    setInputValue(state,value){
      state.inputValue=value
    },
    //添加列表项
    addItem(state){
      const obj={
        id:state.nextId,
        info:state.inputValue.trim(),
        done:false
      }
      //将创建好的事项添加到数组list中
      state.list.push(obj)
      //nextId值自增
      state.nextId++
      state.inputValue=''
    },
    //删除列表数据
    removeItem(state,id){
      const index=state.list.findIndex(x=>x.id===id)
      console.log(index)
      if(index!=-1) state.list.splice(index,1)
    },
    changeStatus(state,param){
      //根据id改变对应事项的状态
      const index=state.list.findIndex(x=>x.id===param.id)
      console.log(index)
      if(index!=-1) state.list[index].done=param.status
    },
    cleanDone(state){
      state.list = state.list.filter( x => x.done === false )
    },
    changeKey(state,key){
      //当用户点击“全部”，“已完成”，“未完成”选项卡时触发
      state.viewKey = key
    }
  },
  actions: {
    getList(context){
      axios.get('./list.json').then(({data})=>{
        console.log(data);
        context.commit('initList',data)
      })
    }
  },
  modules: {
  },
  getters:{
    unDoneLength(state){
      const temp = state.list.filter( x => x.done === false )
      console.log(temp)
      return temp.length
    }
  },
  infoList(state){
    if(state.viewKey === 'all'){
      return state.list
    }
    if(state.viewKey === 'undone'){
      return state.list.filter( x => x.done === false )
    }
    if(state.viewKey === 'done'){
      return state.list.filter( x => x.done === true )
    }
  }
})
