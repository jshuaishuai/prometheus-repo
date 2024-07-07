"use server"

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from '@prisma/client';

import { db } from "./db";

export const getAuthUserDetails = async () => {
    const user = await currentUser();
    if (!user) return;
    const userData = await db.user.findUnique({
        where: {
            email: user?.emailAddresses?.[0]?.emailAddress,
        },
        include: {
            Agency: {
                include: {
                    SubAccount: {
                        include: {
                            SidebarOption: true
                        }
                    },
                    SidebarOption: true,
                }
            },
            Permissions: true
        }
    });

    return userData;
}

const createTeamUser = async (agencyId: string, user: User) => {
    if (user.role === 'AGENCY_OWNER') {
        return null;
    }
    const response = await db.user.create({
        data: { ...user }
    })

    return response;
}

export const saveActivityLogsNotification = async ({
    agencyId,
    description,
    subaccountId,
}: {
    agencyId?: string,
    description: string,
    subaccountId?: string
}) => {
    const authUser = await currentUser();
    let userData;
    if (!authUser) {
        // 如果用户未登录，则根据子帐户 ID 查询相关用户。
        const response = await db.user.findFirst({
            where: {
                Agency: {
                    SubAccount: {
                        some: {
                            id: subaccountId
                        }
                    }
                }
            }
        })
        if (response) {
            userData = response;
        }
    } else {
        // 如果用户已登录 (使用 currentUser() 获取)，则直接查询当前用户的数据库记录。
        userData = await db.user.findUnique({
            where: {
                email: authUser?.emailAddresses?.[0]?.emailAddress,
            }
        })
    }

    if (!userData) {
        console.log('Could not find user')
        return;
    }
    let foundAgencyId = agencyId;
    if (!foundAgencyId) {
        if (!subaccountId) {
            throw new Error('You need to provide atleast an agency Id or subaccount Id');
        }
        const response = await db.subAccount.findUnique({
            where: {
                id: subaccountId
            }
        })

        if (response) {
            foundAgencyId = response.agencyId;
        }
    }

    if (subaccountId) {
        await db.notification.create({
            data: {
                notification: `${userData.name} | ${description}`,
                User: {
                    connect: {
                        id: userData.id
                    }
                },
                Agency: {
                    connect: {
                        id: foundAgencyId
                    }
                },
                SubAccount: {
                    connect: {
                        id: subaccountId
                    }
                },
            }
        })
    } else {
        await db.notification.create({
            data: {
                notification: `${userData.name} | ${description}`,
                User: {
                    connect: {
                        id: userData.id
                    }
                },
                Agency: {
                    connect: {
                        id: foundAgencyId
                    }
                },
            }
        })
    }



}

export const verifyAndAcceptInvitation = async () => {
    // 获取当前用户，未登录直接跳转到登录页
    const user = await currentUser();
    if (!user) return redirect('/sign-in');

    // 检查是否存在邀请
    const invitationExist = await db.invitation.findUnique({
        where: {
            email: user?.emailAddresses?.[0]?.emailAddress,
            status: "PENDING"
        }
    })
    // 处理邀请
    //  如果邀请存在，就进入邀请人组织
    // 创建新用户、保存用户加入团队的活动日志
    if (invitationExist) {
        const userDetail = await createTeamUser(invitationExist.agencyId, {
            name: `${user.firstName} ${user.lastName}`,
            avatarUrl: user.imageUrl,
            email: invitationExist.email,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: invitationExist.role,
            agencyId: invitationExist.agencyId,
            id: user.id
        });

        await saveActivityLogsNotification({
            agencyId: invitationExist.agencyId,
            description: 'Accepted invitation',
            subaccountId: undefined,
        });

        // 判断用户是否成功创建，如果创建成功则更新用户角色和删除邀请记录

        if (userDetail) {
            await clerkClient.users.updateUserMetadata(user.id, {
                privateMetadata: {
                    role: userDetail.role || 'SUBACCOUNT_USER'
                }
            })

            await db.invitation.delete({
                where: {
                    id: invitationExist.id
                }
            })
            return userDetail.agencyId;
        } else {
            return null;
        }
    } else {
        const agency = await db.user.findUnique({
            where: {
                email: user.emailAddresses?.[0]?.emailAddress
            }
        })
        return agency ? agency.agencyId : null;
    }
}
