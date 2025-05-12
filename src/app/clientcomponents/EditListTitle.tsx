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

interface IEditListTitleProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  fnSaved: (title: string) => void;    
  initialTitle: string;  
  operation: "edit" | "add";
}

const EditListTitle: React.FunctionComponent<IEditListTitleProps> = (props) => {
    const { open, setOpen ,fnSaved, initialTitle,operation} = props;
    const [title, setTitle] = React.useState<string>("");

    React.useEffect(() => {
      if (operation === "edit") {
        setTitle(initialTitle);
      }else{
        setTitle("New List");
      }  
    }, [initialTitle,open,operation]);

    if ( (!initialTitle || initialTitle === "") && operation === "edit") {
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
            <DialogTitle>{operation==="add"? "Create ": "Edit "} List</DialogTitle>
            <DialogDescription>
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                 List Title
                </Label>
                <Input id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
            <Button onClick={()=>{setOpen(false);fnSaved(title);}}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </>
  ) ;
};

export default EditListTitle;
