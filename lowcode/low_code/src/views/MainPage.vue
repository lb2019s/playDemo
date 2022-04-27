<template>
  <div class="home">
    <div>顶栏</div>
    <el-button></el-button>
    <div class="main-content">
      <el-row>
        <el-col :span="4">
          <div class="component-stack block">
            <div class="title">物料库</div>
            <ul>
              <li v-for="item in stacks" :key="item" class="stack-item" draggable="true" @dragstart="handleDrag(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="stage block" @dragover.prevent @drop="handleDrop">
            <render-engine :schema="schema" :addType="addType" @pickType="handlePickType"></render-engine>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="config-panel block">
            <div class="title">编辑面板</div>
            <config-panel :currentType="currentType"></config-panel>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { components } from "@/components"
import RenderEngine from "../fragments/RenderEngine.vue"
import ConfigPanel from "@/fragments/ConfigPanel.vue"
export default {
  components: {
    ...components,
    RenderEngine,
    ConfigPanel
  },
  data() {
    return {
      stacks: [
        'CButton',
        'CInput',
        'CContainer'
      ],
      schema: {
        page: {
          type: 'CContainer',
          children: []
        }
      },
      addType: '',
      currentType: ''
    }
  },
  methods: {
    handleDrop() {
      console.log('drop')
    },
    handleDrag(type) {
      this.addType = type
    },
    handlePickType(type) {
      this.currentType = type
    }
  },
}
</script>

<style lang="less" scoped>
.block {
  border: 1px solid var(--mainLine);
  height: 100vh;
}

.component-stack {
  .stack-item {
    padding: 10px;
    border: 1px solid var(--lineBg);
    margin: 4px 0;
    cursor: pointer;
  }
}
</style>