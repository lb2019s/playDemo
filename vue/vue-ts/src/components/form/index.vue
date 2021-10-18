<template>
  <div>
    <k-form :model="user" :rules="rules" ref="form">
      <k-form-item label="姓名" prop="name">
        <k-input v-model="user.name" placeholder="请输入 姓名"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input
          type="password"
          v-model="user.password"
          placeholder="请输入 密码"
        ></k-input>
      </k-form-item>
      <k-form-item>
        <input type="button" @click="submit" value="提交" />
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KInput from "./k-input.vue";
import KFormItem from "./k-form-item.vue";
import KForm from "./k-form.vue";
export default {
  components: {
    KInput,
    KFormItem,
    KForm,
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      rules: {
        name: { required: true, message: "请输入 姓名" },
        password: { required: true, message: "请输入 密码" },
      },
    };
  },
  methods: {
    submit() {
    try {
      this.$refs.form.validate((valid) => {
        let notice = this.$notice({
          title: "提示",
          message: valid ? "成功" : "失败",
          duration: 1500,
        });
        notice.show();
      });
      } catch (e) {
          console.dir(e)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>