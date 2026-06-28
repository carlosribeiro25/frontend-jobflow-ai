import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button-variants";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "../ui/sheet";
import { useIsMobile } from "@/modules/auth/hooks/use-mobile";

export default function WhatsappAction() {
    const isMobile = useIsMobile()
    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className={buttonVariants({
                            size: "icon",
                            className: "bg-green-400 hover:bg-green-400 w-2 h-5 cursor-pointer : ",
                        })}
                    >
                        <WhatsAppIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent side="top">
                    <SheetHeader>
                        <SheetTitle >Conectar WhatsApp</SheetTitle>
                        <SheetDescription>
                            Deseja conectar uma nova instância do WhatsApp?
                        </SheetDescription>
                    </SheetHeader>

                    <div className="p-2">
                        <Link
                            to="/conectWhatsapp"
                            className={buttonVariants({
                                className: "w-full ",
                            })}
                        >
                            Continuar
                        </Link>
                    </div>
                </SheetContent>
            </Sheet >
        )
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to='/conectWhatsapp'
                        className={buttonVariants({
                            size: "icon",
                            className: "rounded-full  hover:bg-green-500 w-5 h-5"
                        })}
                    >
                        <Button
                        className={buttonVariants({
                            size: "icon",
                            className: "bg-green-400 hover:bg-green-400 w-3 h-5 cursor-pointer : ",
                        })}
                    >
                        <WhatsAppIcon />
                    </Button>
            
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">Conectar Whatsapp</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}