import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";




const AgencyPage = async () => {


    const agencyId = await verifyAndAcceptInvitation();
    console.log('%c [ agencyId ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', agencyId)
    // 如果存在agencyId 将其发送到该页面
    // 不存在则发送到创建页面

    const user = await getAuthUserDetails();
    console.log('%c [ user ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', user)

    return (
        <div>
            Agency
        </div>
    );
};

export default AgencyPage;
