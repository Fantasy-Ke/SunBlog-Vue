import { OAuthAccountDetailOutput, OAuthsServiceProxy } from "@/shared/service-proxies";
import { Session } from "@/utils/storage";
import { defineStore } from "pinia";
import { reactive, computed, inject } from "vue";
const _oAuthCService = new OAuthsServiceProxy(inject("$baseurl"), inject("$api"));
interface OauthInfo {
  info?: OAuthAccountDetailOutput | null;
}
export const useAuth = defineStore("auth", () => {
  const store = reactive<OauthInfo>({
    info: Session.get<OAuthAccountDetailOutput>("account_info"),
  });

  /**
   * 登录
   * @param code 登录码
   * @returns
   */
  const login = async (code: string) => {
    await _oAuthCService.login(code).then(async (res) => {
      if (res.success) {
        await getUserInfo();
      }
      return res.result;
    });
  };

  /**
   * 退出登录
   */
  const logout = () => {
    store.info = null;
    Session.clear();
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    await _oAuthCService.userInfo().then((res) => {
      if (res.success) {
        store.info = res.result;
        Session.set("account_info", res.result);
      }
    });
  };

  const info = computed(() => {
    return store.info;
  });

  return { login, logout, getUserInfo, info };
});
