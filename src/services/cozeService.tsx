import {
  CozeAPI,
  COZE_CN_BASE_URL,
  ChatStatus,
  RoleType,
  ChatEventType,
} from "@coze/api";

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
        content: "不要调用任何外部工具, 用c写一个斐波那契数列",
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

async function streamChat() {
  const stream = await client.chat.stream({
    bot_id: "7477479625686499378",
    additional_messages: [
      {
        role: RoleType.User,
        content: "Hello!",
        content_type: "text",
      },
    ],
  });

  for await (const part of stream) {
    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
      process.stdout.write(part.data.content); // 实时响应
    }
  }
}

// 调用
quickChat().catch((error) => console.error("Error:", error));
streamChat().catch((error) => console.error("Error:", error));
