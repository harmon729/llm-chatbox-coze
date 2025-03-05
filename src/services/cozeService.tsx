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
  allowPersonalAccessTokenInBrowser: true, // 允许在浏览器中使用PAT（注意：生产环境不推荐）
});

/**
 * 上传文件到Coze API
 * @param file 要上传的文件
 * @returns 文件对象信息
 */
export async function uploadFile(file: File) {
  try {
    // 将文件对象直接传递给API
    const fileObj = await client.files.upload({
      file: file,
    });

    return {
      success: true,
      fileObj,
    };
  } catch (error) {
    console.error("文件上传失败:", error);
    return {
      success: false,
      error,
    };
  }
}

/**
 * 获取已上传的文件信息
 * @param fileId 文件ID
 * @returns 文件详细信息
 */
export async function retrieveFile(fileId: string) {
  try {
    const fileInfo = await client.files.retrieve(fileId);
    return {
      success: true,
      fileInfo,
    };
  } catch (error) {
    console.error("获取文件信息失败:", error);
    return {
      success: false,
      error,
    };
  }
}

/**
 * 发送消息并等待完整响应
 * @param message 用户输入的消息内容
 * @returns 返回AI的完整响应
 */
export async function quickChat(message: string) {
  try {
    const v = await client.chat.createAndPoll({
      bot_id: "7477479625686499378",
      additional_messages: [
        {
          role: RoleType.User,
          content: message,
          content_type: "text",
        },
      ],
    });

    if (v.chat.status === ChatStatus.COMPLETED && v.messages) {
      // 找到助手的回复
      const assistantMessage = v.messages.find(
        (msg) => msg.role === RoleType.Assistant
      );

      return {
        content: assistantMessage?.content || "没有收到回复",
        success: true,
      };
    }

    return {
      content: "对话未完成",
      success: false,
    };
  } catch (error) {
    console.error("发送消息失败:", error);
    return {
      content: "发送消息失败，请稍后重试",
      success: false,
    };
  }
}

/**
 * 流式聊天函数 - 立即返回每一部分响应
 * @param message 用户输入的消息
 * @param onPartialResponse 每收到一部分响应就会调用此回调函数
 * @param onComplete 响应完成时调用此回调函数
 * @param onError 发生错误时调用此回调函数
 */
export async function streamChat(
  message: string,
  onPartialResponse: (partialContent: string) => void,
  onComplete: (fullContent: string) => void,
  onError: (error: Error | unknown) => void
) {
  try {
    const stream = await client.chat.stream({
      bot_id: "7477479625686499378",
      additional_messages: [
        {
          role: RoleType.User,
          content: message,
          content_type: "object_string",
        },
      ],
    });

    let fullResponse = "";

    for await (const part of stream) {
      if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
        const newContent = part.data.content || "";

        // 仅当有新内容时才调用回调
        if (newContent) {
          // 立即发送新接收的部分内容
          onPartialResponse(newContent);

          // 同时累积完整响应
          fullResponse += newContent;
        }
      }
    }

    // 流结束，发送完整响应
    onComplete(fullResponse);
  } catch (error) {
    onError(error);
  }
}

// 调试
// streamChat().catch((error) => console.error("Error:", error));
