import { CozeAPI, COZE_CN_BASE_URL, ChatStatus, RoleType } from "@coze/api";

// 使用个人访问令牌初始化客户端
const client = new CozeAPI({
  token: "pat_HKQUAfaYC4ltrLQe2SbsmdwU1g9dODkWxG4vV38h3rsJ4CXP4mrWCEuH6VbOTLK5", // 从 https://www.coze.cn/open/oauth/pats 获取你的 PAT
  baseURL: COZE_CN_BASE_URL,
});

// 简单对话示例
async function quickChat() {
  const v = await client.chat.createAndPoll({
    bot_id: "7477479625686499378",
    additional_messages: [
      {
        role: RoleType.User,
        content: "Hello!",
        content_type: "text",
      },
    ],
  });

  if (v.chat.status === ChatStatus.COMPLETED && v.messages) {
    for (const item of v.messages) {
      console.log("[%s]:[%s]:%s", item.role, item.type, item.content);
    }
    console.log("usage", v.chat.usage);
  }
}
