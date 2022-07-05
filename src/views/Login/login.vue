<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        type="number"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
        required
        maxlength="11"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        left-icon="smile-o"
        name="code"
        placeholder="密码"
        :rules="rules.code"
        required
        maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            native-type="button"
            @click="sendSmsCode"
            :disabled="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from "@/api/user";
import ToutiaoIcon from "@/components/ToutiaoIcon";
import { Toast } from "vant";
export default {
  components: { ToutiaoIcon },
  data() {
    return {
      isDisabled: false,
      isCountDownShow: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            requied: true,
            message: "手机号不能为空",
          },
          {
            pattern: /1[3456789]\d{9}/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            requied: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    // 倒计时业务逻辑
    // 页面初始化的时候默认展示验证码按钮
    // 点击按钮之后》
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
        console.log("正在发送验证码");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        this.isCountDownShow = true;
        await getSmsCode(this.user.mobile);
        this.$toast.success("发送验证码成功!");
      } catch (e) {
        this.$toast.fail(e.response.data.message || "错误");
        this.isCountDownShow = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 158px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
