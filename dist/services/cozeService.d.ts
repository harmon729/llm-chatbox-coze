/**
 * 上传文件到Coze API
 * @param file 要上传的文件
 * @returns 文件对象信息
 */
export declare function uploadFile(file: File): Promise<{
    success: boolean;
    fileObj: import("@coze/api").FileObject;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    fileObj?: undefined;
}>;
/**
 * 获取已上传的文件信息
 * @param fileId 文件ID
 * @returns 文件详细信息
 */
export declare function retrieveFile(fileId: string): Promise<{
    success: boolean;
    fileInfo: import("@coze/api").FileObject;
    error?: undefined;
} | {
    success: boolean;
    error: unknown;
    fileInfo?: undefined;
}>;
/**
 * 发送消息并等待完整响应
 * @param message 用户输入的消息内容
 * @returns 返回AI的完整响应
 */
export declare function quickChat(message: string): Promise<{
    content: string;
    success: boolean;
}>;
/**
 * 流式聊天函数 - 立即返回每一部分响应
 * @param message 用户输入的消息
 * @param onPartialResponse 每收到一部分响应就会调用此回调函数
 * @param onComplete 响应完成时调用此回调函数
 * @param onError 发生错误时调用此回调函数
 */
export declare function streamChat(message: string, onPartialResponse: (partialContent: string) => void, onComplete: (fullContent: string) => void, onError: (error: Error | unknown) => void): Promise<void>;
//# sourceMappingURL=cozeService.d.ts.map