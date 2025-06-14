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

interface IEditListItemProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  fnSaved: (data: string,amount: number) => void;    
  initialData: string;  
  initialAmount: number;  
  operation: "edit" | "add";
}

const EditListItem: React.FunctionComponent<IEditListItemProps> = (props) => {
    const { open, setOpen ,fnSaved, initialData,initialAmount,operation} = props;
    const [data, setData] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("0");

    React.useEffect(() => {
      if (operation === "edit") {
        setData(initialData);
        setAmount(String(initialAmount));
      }else{
        setData("NewItem");
        setAmount("0");
      }  
    }, [open,operation,initialData,initialAmount]);

    if ( (!initialData || initialData === "") && operation === "edit") {
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
            <DialogTitle>{operation==="add"? "Create ": "Edit "} List item</DialogTitle>
            <DialogDescription>
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data" className="text-right">
                 Data
                </Label>
                <Input id="data" value={data} onChange={(e)=>{setData(e.target.value)}} className="col-span-3" />

                <Label htmlFor="amount" className="text-right">
                 Amount
                </Label>
                <Input
                  id="amount" 
                  value={amount} 
                  onChange={
                    (e)=>{
                      const value = e.target.value;
                      setAmount(value);
                      if (isNaN(Number(value)) && value !== "+" && value !== "-") {
                        setAmount("0");
                      }
                      
                    }
                  } 
                  className="col-span-3" 
                />

            </div>
            </div>
            <DialogFooter>
            <Button onClick={()=>{setOpen(false);fnSaved(data,Number(amount));}}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    </>
  ) ;
};

export default EditListItem;
