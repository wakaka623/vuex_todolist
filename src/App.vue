<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange" />
    <a-button type="primary"  @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="cbStateChanged(item.id,$event)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey ==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey ==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      // list:[]
    }
  },
  created(){
    console.log(this.$store)
    this.$store.dispatch('getList')
  },
  methods:{
    handleInputChange(e){
      console.log(e.target.value);
      this.$store.commit('setInputValue',e.target.value)
    },
    addItemToList(){
      if(this.inputValue.trim()<=0) return this.$message.warning('别闹！啥都没输写，不干了！')
      this.$store.commit('addItem')
    },
    removeItemById(id){
      console.log(id);
      this.$store.commit('removeItem',id)
    },
    cbStateChanged(id,e){
      const param={
        id:id,
        status:e.target.checked
      }
      this.$store.commit('changeStatus',param)
    },
    clean(){
      this.$store.commit('cleanDone')
    },
    changeList( key ){
    //点击“全部”，“已完成”，“未完成”时触发
    this.$store.commit('changeKey',key)
    }
  },
  computed:{
    ...mapState(['list','inputValue','viewKey']),
    ...mapGetters(['unDoneLength','infoList'])
  }
 
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>