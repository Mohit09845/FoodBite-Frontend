import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { User2, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const UserNameMenu = () => {
    const { user, logout } = useAuth0();
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.picture || 'https://via.placeholder.com/150'}alt="User Avatar"/>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="flex gap-2 space-y-2">
                        <Avatar className="cursor-pointer my-2">
                            <AvatarImage src={user?.picture} alt="userPic.jpg" />
                        </Avatar>
                        <div>
                            <h4 className="font-medium">{user?.name}</h4>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col text-gray-600 my-2">
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2 size='22' />
                            <Button variant="link" size='sm'>
                                <Link to="/user-profile" className="hover:text-orange-500">View Profile</Link>
                            </Button>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <LogOut size='22' />
                            <Button onClick={() => logout()} variant="link" size='sm' className="hover:text-orange-500">Logout</Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div >
    )
}

export default UserNameMenu