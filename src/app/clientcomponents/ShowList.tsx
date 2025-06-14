'use client';
import * as React from 'react';
import {getUserLists} from '@/lib/users';
import { set } from 'zod';
import {Button} from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { AppContext } from '@/app/clientcomponents/HomePage';
import { List,ListItem,Prisma } from '@prisma/client';
import { noSSR } from 'next/dynamic';
import { AiOutlinePicture } from "react-icons/ai";
import { prisma } from '@/lib/prisma';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import imageCompression from 'browser-image-compression'
import {toast} from 'sonner'
import YesNoMessageBox from './YesNoMessageBox';

// type ListWithItems = Prisma.ListGetPayload<{
//   include: { items: true };
// }>;  
export type ListWithItems= Prisma.ListGetPayload<{
  include: {
    items: {
      include: {
        images: {
          select: { id: true };
        };
      };
    };
  };
}>;



interface IShowListProps {
  email: string,
  noofUpdates: number,
  setNoOfUpdates: React.Dispatch<React.SetStateAction<number>>;
}


const ShowList: React.FunctionComponent<IShowListProps> = (props) => {
  const [openYesNoMessageBox, setOpenYesNoMessageBox] = React.useState(false)  
  const [deleteImageId, setDeleteImageId] = React.useState<number | null>(null);

  function fnDelete_Clicked(result: "yes"|"no") {
    if (result === "yes") {
      // Call deleteImage function
      if (deleteImageId) {deleteImage(deleteImageId);}
    } else {
      //console.log("Delete cancelled");
    }
  }
  const [file, setFile] = React.useState<File | null>(null)
  const [message, setMessage] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [listitemid, setListitemid] = React.useState<number | null>(null)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0]
      if (!image) return
      const compressed = await imageCompression(image, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })
      setFile(compressed);
    }

    const uploadImage = async () => {
      if (!file || !listitemid) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('listitemid', String(listitemid));
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })
      //console.log (res);

      const data = await res.json()
      console.log("Image upload response:", data)
      setMessage(data.message || data.error)
      toast.success(data.message || data.error);

      setFile(null);
      setListitemid(null);
      if (inputRef.current) {
        inputRef.current.value = ''; 
      }      
      setNoOfUpdates((prev) => prev + 1);

    }
    const deleteImage = async (id: number) => {
      const res = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
      })  
      const data = await res.json()
      console.log("Image delete response:", data)
      setMessage(data.message || data.error)
      toast.success(data.message || data.error);

      setNoOfUpdates((prev) => prev + 1);
    }

    const [previewImageUrl, setPreviewImageUrl] = React.useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const { email,noofUpdates,setNoOfUpdates } = props;
  // const [userLists, setUserLists] = React.useState<List[] | null>(null);
  // const [selectedList, setselectedList] = React.useState<number | null>(null);
  // const [expandedList, setexpandedList] = React.useState<number | null>(null);

    const context = React.useContext(AppContext);
    const { appData, setAppData } = context || {};
    
  React.useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const lists = await getUserLists({ email }) as ListWithItems[];
        console.log("Fetched user lists:", lists);
        //setUserLists(lists);
        if (setAppData){
          setAppData((prev)=>({ ...prev, userLists: lists }));
        }
        
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };
    fetchUserLists();
  }
  , [email,noofUpdates]);
  React.useEffect(() => {
    uploadImage();    
  }, [file, listitemid]);

  const generateLists = (list: ListWithItems) => {
    const onSelectedClick = () => {
      //setselectedList(list.id);
      //console.log("List clicked:", list);
        if (setAppData){
          setAppData((prev)=>({ ...prev, selectedList: list.id }));
        }

    };
    const onExpandClick = () => {
      //setexpandedList(list.id);
      //console.log("List clicked:", list);
      if (setAppData){
        setAppData((prev)=>({ ...prev, selectedList: list.id,expandedList: list.id }));      
      }
      
    };
    const firstitem = list.items[0] || null;
    const lastitem = list.items[list.items.length - 1] || null;

    const firstitemdata = firstitem ? firstitem.data : "";
    const firstitemamount = firstitem ? firstitem.amount : 0;
    const lastitemdata = lastitem ? lastitem.data : "";
    const lastitemamount = lastitem ? lastitem.amount : 0;

    const totalAmount = list.items.reduce((acc, item) => acc + item.amount, 0);
    return (
      <>
        <div
          className={`relative m-1 bg-white/20 backdrop-blur-md rounded-xl p-6 text-lg leading-relaxed text-black bg-[url('/bg.png')] bg-cover bg-center
            transition-all duration-500 ease-in-out ${
              appData?.selectedList === list.id ? 'border-2 border-black dark:border-white' : 'border border-amber-300/70'
            }`}
          onClick={onSelectedClick}
        >
          {/* Responsive title and updated date on same line below md */}
          <div className="flex justify-between items-center mb-4 ">
            <h1 className="w-full truncate text-left font-bold text-base md:w-full md:mb-4 md:text-center">
              {list.title || ""}
            </h1>
          </div>          
          {/* Responsive two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left aligned lines - hidden below md */}
            <div className="text-left space-y-1 trun truncate md:whitespace-normal md:overflow-visible md:text-clip">
              <p dangerouslySetInnerHTML={{__html: list.items?.[0]?.data || ""}} />
            </div>
            {/* Right aligned info */}
            <div className="text-right space-y-1 flex flex-col justify-between items-right ">
              <div className=''>
                <Button onClick={onExpandClick} className="text-sm  ml-auto px-4 py-2 transition duration-300 hover:shadow-lg">
                  Expand
                </Button>
              </div>
              
              <p className="hidden text-xs md:block">
                Created: {list.createdAt.toLocaleString()}
              </p>
              <p className="text-xs">
                Updated: {list.updatedAt.toLocaleString()}
              </p>
            </div>
          </div>
            <div className='flex flex-row gap-1 justify-center'>
              <span className="text-xs text-center border border-gray-700 p-1 m-0.5 ">
                FirstItem: {firstitemdata?.length > 10 ? 
                        firstitemdata.slice(0, 10) + "..." 
                      : 
                        firstitemdata
                    }
                    {" " + String(firstitemamount)} 
              </span>
              <span className="text-xs text-center border border-gray-700 p-1 m-0.5 ">
                LastItem: {lastitemdata?.length > 10 ? 
                        lastitemdata.slice(0, 10) + "..." 
                      : 
                        lastitemdata
                    }
                    {" " + String(lastitemamount)} 
              </span>
              <span className="text-xs text-center border border-gray-700 p-1 m-0.5 font-semibold">
                Total: {totalAmount}
              </span>
            </div>
        </div>
      </>
    );
  };


  const generateListExpanded = () => {


    const list = appData?.userLists?.find((list) => list.id === appData.selectedList) as ListWithItems;
    if (!list) return null;
    const listItems = list.items || [];
    const totalAmount = listItems.reduce((acc, item) => acc + item.amount, 0);
    listItems.map((item,index) => {
      // Ensure images is an array
      //console.log("List item %o",item);
      //console.log("List item images %o",item.images);
    });
    return (
      <>
          <YesNoMessageBox
            open={openYesNoMessageBox} 
            setOpen={setOpenYesNoMessageBox} 
            mMessage={"Are you sure you want to delete this image?"}
            fnResult={fnDelete_Clicked}
          />      
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            {previewImageUrl ? (
              <img
                src={previewImageUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] mx-auto rounded-lg"
              />
            ) : (
              <p>No image found.</p>
            )}
          </DialogContent>
        </Dialog>      
        <div className="relative m-1 bg-white/20 backdrop-blur-md border border-amber-300/70 rounded-xl p-6 text-lg leading-relaxed text-black bg-[url('/bg.png')] bg-cover bg-center">
          <div>
            <a onClick={()=>{
                if (setAppData){
                  setAppData((prev)=>({ ...prev, expandedList: null, selectedList: null, selectedListItem: null }));      
                }              
              }}>
                &larr;
            </a>
          </div>
          <div>
            <h1 className="w-full truncate text-left font-bold text-base md:w-full md:mb-4 md:text-center">
              {list.title || ""}
            </h1>
          </div>
          {listItems.map((item, index) => (
            <div 
              key={index} 
              className={` ${appData?.selectedListItem === item.id? "border border-amber-300/70 ": "" } p-4 rounded-lg mb-4`}
              onClick={() => {
                //setselectedListItem(item.id);
                if (setAppData){
                  setAppData((prev)=>({ ...prev, selectedListItem: item.id }));      
                }
              }}
            >
              <div className="mb-4 space-y-1">
                {/* First row: item.data (left), item.amount (right) */}
                <div className="flex justify-between items-center text-base">
                  <p dangerouslySetInnerHTML={{ __html: item.data }} />
                  <p>{item.amount}</p>
                </div>

                {/* Second row: timestamps */}
                <div className="ml-2 text-left text-xs space-y-0.5">
                  <p>Created: {item.createdAt.toLocaleString()}</p>
                  <p>Updated: {item.updatedAt.toLocaleString()}</p>
                </div>
              </div>
              
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,image/jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              >
              </input>                
              {Array.isArray(item.images) && item.images[0]?.id  &&(
                <>
                  <Button
                    className="text-sm m-1 px-4 py-2 transition duration-300 hover:shadow-lg"
                    size={"sm"}
                    variant={"default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      //window.open("api/images/" +  String(item.images[0].id), "_blank");
                      setPreviewImageUrl("api/images/" +  String(item.images[0].id));setIsPreviewOpen(true);                      
                    }}
                  >
                    <AiOutlinePicture />
                    Preview
                  </Button>
                  <Button
                    className="text-sm m-1 px-4 py-2 transition duration-300 hover:shadow-lg"
                    size={"sm"}
                    variant={"default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenYesNoMessageBox(true);
                      setDeleteImageId(item.images[0].id);
                      // TODO: Remove picture URL
                      console.log("Delete picture for item:", item.id);
                    }}
                  >
                    <AiOutlinePicture />
                    Delete
                  </Button>
                </>

              )}
              {!item.images[0]?.id && (
                <>
                    <Button
                      className="text-sm m-1 px-4 py-2 transition duration-300 hover:shadow-lg"
                      size={"sm"}
                      variant={"default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!item.images[0]?.id) {

                          setListitemid(item.id);
                          inputRef.current?.click();
                        }  
                        //window.open(item.pictureUrl, "_blank");
                      }}
                    >
                      <AiOutlinePicture />
                      Add
                    </Button>
                </>
              )}              
              <hr className="border-t border-gray-300 my-4" />
            </div>
          ))}
          <div className="ml-2 text-right font-semibold text-xl space-y-0.5">
            <p>Total: {totalAmount}</p>
          </div>            
        </div>
      </>
    );
  };
  

  return (
    <>
      {appData?.expandedList === null && (
        appData.userLists?.map((list, index) => (
          <div key={index} className="w-full p-1 md:p-4">
            {generateLists(list)}
            {/* {generateLists({
              ...list,
              items: list.items?.map(item => ({
                ...item,
                images: (item as any).images ?? []
              })) ?? []
            })} */}
          </div>          
        )) 
      )}

      {appData?.expandedList !== null && (
        <div className="w-full p-1 md:p-4">
          {generateListExpanded()}
        </div>

      )}    
      {/* {true && (
        userLists?.map((list, index) => (
          <div key={index} className="w-full px-4 m-1">
            {generateLists(list)}
          </div>
        )) 
      )} */}

    </>
  );
};



export default ShowList;
