import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const UserAvatar = () => {
    const { user } = useUser();
    console.log('%c [ user ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', user)
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
