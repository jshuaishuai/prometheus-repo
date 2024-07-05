import { PrismaClient } from "@prisma/client";

// 防止在开发环境中频繁创建 Prisma Client 实例
// 通过在全局范围内复用 Prisma Client 实例，减少资源浪费，提升应用程序的性能和稳定性。
declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
