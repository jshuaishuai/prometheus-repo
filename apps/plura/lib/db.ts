import { PrismaClient } from '@prisma/client'


declare global {
    var prisma: PrismaClient | undefined;
}

// Re-using a single PrismaClient instance
// 创建一个 PrismaClient 实例并在您的应用程序中重复使用它
// 在开发环境中将 PrismaClient 分配给全局变量只是为了防止热重载创建新实例

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}
