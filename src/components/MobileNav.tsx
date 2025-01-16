import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Menu } from "lucide-react"

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Menu className="text-orange-500" />
                </SheetTrigger>
                <SheetContent className="space-y-3">
                    <SheetTitle>
                        {
                            isAuthenticated ? (
                                <span className="flex items-center font-bold gap-2">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.picture} alt="userPic.jpg" />
                                    </Avatar>
                                    {user?.email}
                                </span>
                            ) : <span>Welcome to FoodHub</span>
                        }
                    </SheetTitle>
                    <Separator />
                    <SheetDescription className="flex flex-col gap-4">
                        {
                            isAuthenticated ? <MobileNavLinks /> :
                                (<Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-orange-500">Log In</Button>)
                        }
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav