import * as React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface IYesNoMessageBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  fnResult: (result: "yes"|"no") => void;    
  mMessage: string;  
}

const YesNoMessageBox: React.FunctionComponent<IYesNoMessageBoxProps> = (props) => {
    const { open, setOpen ,fnResult, mMessage} = props;
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
      setMessage(mMessage);
    }, [mMessage,open]);

    if (!mMessage || mMessage === "")  {
      return null; // or return a placeholder
    }

    return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm animate-in fade-in zoom-in-95 duration-1000">
            <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              {message}
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            </div>
            </div>
            <DialogFooter>
            <Button onClick={()=>{setOpen(false);fnResult("yes");}}>Yes</Button>
            <Button onClick={()=>{setOpen(false);fnResult("no");}}>No</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </>
  ) ;
};

export default YesNoMessageBox;
