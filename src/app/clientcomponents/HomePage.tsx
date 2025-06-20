'use client';
import * as React from 'react';
import ShowList,{type ListWithItems} from '@/app/clientcomponents/ShowList';
import NavBar from '@/app/clientcomponents/NavBar';
import { TestDialog } from '@/app/clientcomponents/TestDialog';
import  EditListTitle  from '@/app/clientcomponents/EditListTitle';
import { createListTitle, updateListTitle,deleteListTitle, createListItem, deleteListItem, updateListItem } from '@/lib/users';
import { List,ListItem,Prisma } from '@prisma/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { read } from 'fs';
import YesNoMessageBox from './YesNoMessageBox';
import  EditListItem  from '@/app/clientcomponents/EditListItem';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';



interface IAppContext {
  email: string | null;
  menuclicked: string | null;
  userLists: ListWithItems[] | null;
  selectedList: number | null;
  expandedList: number | null;
  selectedListItem: number | null;
}

interface IAppContextValue {
  appData: IAppContext;
  setAppData: React.Dispatch<React.SetStateAction<IAppContext>>;
}

export const AppContext = React.createContext<IAppContextValue | undefined>(undefined);

interface IHomePageProps {
  email: string;
  showJoyRide: boolean;
}

const joyridesteps = [
  {
    target: '.joyride-step1',
    content: 'In the Navigation bar, you can find the various button. + to add lists , - to remove lists , click expand to expand the list and see the items in it,we have added demo list you can delete any time.',
    disableBeacon: true,
  },

];

const joyridestepssmall = [
  {
    target: '.joyride-step1small',
    content: 'In the Navigation bar, you can find the various button. + to add lists , - to remove lists , click expand to expand the list and see the items in it,we have added demo list you can delete any time.',
    Placement: "bottom",
    disableBeacon: true,
  },

];
const HomePage: React.FC<IHomePageProps> = ({ email,showJoyRide }) => {
  const router = useRouter();
  const [appData, setAppData] = React.useState<IAppContext>({ email, menuclicked: "" ,userLists: null ,selectedList: null, expandedList: null , selectedListItem: null});

  const [openEditListTitle, setOpenEditListTitle] = React.useState(false)
  const [editListTitleOperation, setEditListTitleOperation] = React.useState<"add"|"edit">("edit");
  
  const [openYesNoMessageBox, setOpenYesNoMessageBox] = React.useState(false)  
  const [mMessage, setmMessage] = React.useState("");

  const [openEditListItem, setOpenEditListItem] = React.useState(false)
  const [editListItemOperation, setEditListItemOperation] = React.useState<"add"|"edit">("edit");

  
  const [noofUpdates,setNoOfUpdates] = React.useState<number>(0);

  const {email : memail, menuclicked,userLists,selectedList,expandedList,selectedListItem} = appData;

  const [canuseJoyRide,setcanuseJoyRide] = React.useState(false);
  const [isAboveMd, setIsAboveMd] = React.useState(false);
  const [tourKey, setTourKey] = React.useState(0); // force re-render
  const [tourRun, settourRun] = React.useState(true);

  const fnSaved_EditListTitle = async (title: string) => {
    const selectedListTitle = appData.userLists?.find((list) => list.id === appData.selectedList)?.title || "";
    if (selectedListTitle !== title && title !== "") {
      const updateresult = await updateListTitle(appData.selectedList as number, selectedListTitle, title);
      if (updateresult) {
        toast.success("List title updated successfully");
        console.log("List title updated successfully");
        setNoOfUpdates((prev) => prev + 1);
      }else{
        toast.error("An error occured while updating list title");
        console.log("An error occured while updating list title");
      }
    }
    setOpenEditListTitle(false);
  }

  const fnSaved_CreateListTitle = async (title: string) => {
      const updateresult = await createListTitle(title);
      if (updateresult) {
        toast.success("List created successfully");
        console.log("List created successfully");
        setNoOfUpdates((prev) => prev + 1);
      }else{
        toast.error("An error occured while creating list");
        console.log("An error occured while creating list");
      }
    setOpenEditListTitle(false);
  }

  const fnDelete_Clicked = async (result: "yes"|"no") => {
    if (selectedList && !expandedList){
      if (result === "yes") {
        const deleteresult = await deleteListTitle(selectedList);
        if (deleteresult) {
          toast.success("List deleted successfully");
          console.log("List deleted successfully");
          setNoOfUpdates((prev) => prev + 1);
        }else{
          toast.error("An error occured while deleting list");
          console.log("An error occured while deleting list");
        }
      }
    }
    if (expandedList && selectedListItem){
      if (result === "yes") {
        const deleteresult = await deleteListItem(expandedList,selectedListItem);
        if (deleteresult) {
          toast.success("List item deleted successfully");
          console.log("List item deleted successfully");
          setNoOfUpdates((prev) => prev + 1);
        }else{
          toast.error("An error occured while deleting list item");
          console.log("An error occured while deleting list item");
        }
      }
    }
    setOpenYesNoMessageBox(false);
  }  

  const fnSaved_EditListItem = async (data: string,amount: number) => {
    if (selectedList && expandedList && selectedListItem){
      //const selectedListItemData = appData.userLists?.find((list) => list.id === appData.selectedList)?.items.find((item) => item.id === selectedListItem)?.data || "";
      let selectedListItemData = "";
      let selectedListItemAmount = 0;
      const tmpitem = appData.userLists?.find((list) => list.id === appData.selectedList)?.items.find((item) => item.id === selectedListItem) || null;
      if (tmpitem) {selectedListItemData=tmpitem.data;selectedListItemAmount=tmpitem.amount;}
      if ( (selectedListItemData !== data && data !== "") || (selectedListItemAmount !== amount) ) {
        const updateresult = await updateListItem(expandedList,selectedListItem,data,amount);
        if (updateresult) {
          toast.success("List item updated successfully");
          console.log("List item updated successfully");
          setNoOfUpdates((prev) => prev + 1);
        }else{
          toast.error("An error occured while updating list item");
          console.log("An error occured while updating list item");
        }
      }
    }
    setOpenEditListTitle(false);
  }

  const fnSaved_CreateListItem = async (data: string,amount: number) => {
    if (selectedList && expandedList){  
      const updateresult = await createListItem(expandedList,data,amount);
      if (updateresult) {
        toast.success("List item created successfully");
        console.log("List item created successfully");
        setNoOfUpdates((prev) => prev + 1);
      }else{
        toast.error("An error occured while creating list item");
        console.log("An error occured while creating list item");
      }
    }
    setOpenEditListTitle(false);
  }

  React.useEffect(() => {
    //console.log("AppData changed:", appData);
    
    if (menuclicked!=="") {
      console.log("Menu clicked:", menuclicked);
      if (menuclicked === "edit" && selectedList && !expandedList)  {
        setEditListTitleOperation("edit");
        setOpenEditListTitle(true);
      }
      if (menuclicked === "plus" &&  !expandedList)  {
        setEditListTitleOperation("add");
        setOpenEditListTitle(true);
      }      
      if (menuclicked === "minus" && selectedList && !expandedList)  {
        setmMessage(`Are you sure you want to delete this list ${appData.userLists?.find((list) => list.id === appData.selectedList)?.title } ?`);
        setOpenYesNoMessageBox(true);
      }
      if (menuclicked === "list" )  {
        //if (setAppData){
          setAppData((prev)=>({ ...prev, expandedList: null, selectedList: null, selectedListItem: null}));      
          //setAppData({ ...appData, expandedList: null, selectedList: null});
          setNoOfUpdates((prev) => prev + 1);
        //}        
      }

      if (menuclicked === "plus" &&  expandedList)  {
        setEditListItemOperation("add");
        setOpenEditListItem(true);
      }            
      if (menuclicked === "edit" &&  expandedList)  {
        setEditListItemOperation("edit");
        setOpenEditListItem(true);
      }            

      if (menuclicked === "minus" &&  expandedList && selectedListItem)  {
        console.log("expandedList",expandedList);
        setmMessage(`Are you sure you want to delete this listitem ${appData.userLists?.find((list) => list.id === expandedList)?.items.find((item)=>item.id===appData.selectedListItem)?.data } ?`);
        setOpenYesNoMessageBox(true);
      }            

      if (menuclicked === "help" )  {
        settourRun(true);
        setTourKey((prev) => prev + 1); // force re-render
        setcanuseJoyRide(true);
        // setTimeout(() => {
        //   settourRun(false);
        // }, 1000); // 1000 milliseconds = 1 second
      }                  
      setAppData((prev)=>({ ...prev, menuclicked: "" }));
    }
  },[menuclicked]);


  React.useEffect(() => {

    const isAboveMd = setIsAboveMd(window.matchMedia("(min-width: 768px)").matches);
    setcanuseJoyRide(showJoyRide);
  }, []);
  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      <NavBar email={email} />
      <div className="home-container-style">
        <div className="home-style">
          <ShowList email={email} noofUpdates={noofUpdates} setNoOfUpdates={setNoOfUpdates}/>
          <EditListTitle 
            operation={editListTitleOperation}
            open={openEditListTitle} 
            setOpen={setOpenEditListTitle} 
            fnSaved={editListTitleOperation==="add" ? fnSaved_CreateListTitle : fnSaved_EditListTitle} 
            initialTitle= {appData.selectedList ? appData.userLists?.find((list) => list.id === appData.selectedList)?.title || "" : ""}
          />
          <YesNoMessageBox
            open={openYesNoMessageBox} 
            setOpen={setOpenYesNoMessageBox} 
            mMessage={mMessage}
            fnResult={fnDelete_Clicked}
          />
          <EditListItem
            operation={editListItemOperation}
            initialData={
              appData.selectedListItem ? appData.userLists?.find((list) => list.id === appData.selectedList)?.items.find((item) => item.id === appData.selectedListItem)?.data || "" : ""
            }
            initialAmount={
              appData.selectedListItem ? Number(appData.userLists?.find((list) => list.id === appData.selectedList)?.items.find((item) => item.id === appData.selectedListItem)?.amount) || 0 : 0
            }
            open={openEditListItem} 
            setOpen={setOpenEditListItem} 
            fnSaved={editListItemOperation==="add" ? fnSaved_CreateListItem : fnSaved_EditListItem} 
          />
        </div>
      </div>
      {canuseJoyRide ? <Joyride 
                          steps={ isAboveMd ? joyridesteps : joyridestepssmall } run={tourRun} key={tourKey} stepIndex={0}
                          callback={(data)=>{
                            const { action, index, origin, status, type } = data;

                            // Tour finished or user closed it
                            if (action === ACTIONS.CLOSE){
                              settourRun(false);
                            }
                          }}
                          /> : ""}

    </AppContext.Provider>
  );
};

export default HomePage;
