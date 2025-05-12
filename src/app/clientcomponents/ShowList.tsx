'use client';
import * as React from 'react';
import {getUserLists} from '@/lib/users';
import { set } from 'zod';
import {Button} from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { AppContext } from '@/app/clientcomponents/HomePage';
import { List,ListItem,Prisma } from '@prisma/client';
import { noSSR } from 'next/dynamic';
type ListWithItems = Prisma.ListGetPayload<{
  include: { items: true };
}>;  

interface IShowListProps {
  email: string,
  noofUpdates: number,
}

const ShowList: React.FunctionComponent<IShowListProps> = (props) => {
  const { email,noofUpdates } = props;
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
          <div className="flex justify-between items-center mb-4 md:block">
            <h1 className="w-1/2 truncate text-left font-bold text-base md:w-full md:mb-4 md:text-center">
              {list.title || ""}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-right mr-2 text-sm md:hidden">
                {list.updatedAt.toLocaleString()}
              </p>
              <Button onClick={onExpandClick} className="text-sm md:hidden ml-auto px-4 py-2 transition duration-300 hover:shadow-lg hover:shadow-white/50">
                Expand
              </Button>
            </div>
              
          </div>
          {/* Responsive two-column layout */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left aligned lines - hidden below md */}
            <div className="text-left space-y-1 hidden md:block">
              <p>{list.items?.[0]?.data || ""}</p>
            </div>
            {/* Right aligned info */}
            <div className="text-right space-y-1 flex flex-col justify-between items-right ">
              <div className='hidden md:block'>
                <Button onClick={onExpandClick} className="text-sm  ml-auto px-4 py-2 transition duration-300 hover:shadow-lg">
                  Expand
                </Button>
              </div>
              
              <p className="hidden text-sm md:block">
                Created: {list.createdAt.toLocaleString()}
              </p>
              <p className="hidden text-sm md:block">
                Updated: {list.updatedAt.toLocaleString()}
              </p>
            </div>
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

    return (
      <>
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
            <h1 className="w-1/2 truncate text-left font-bold text-base md:w-full md:mb-4 md:text-center">
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
                  <p>{item.data}</p>
                  <p>{item.amount}</p>
                </div>

                {/* Second row: timestamps */}
                <div className="ml-2 text-left text-xs space-y-0.5">
                  <p>Created: {item.createdAt.toLocaleString()}</p>
                  <p>Updated: {item.updatedAt.toLocaleString()}</p>
                </div>
              </div>
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
          <div key={index} className="w-full px-4 m-1">
            {generateLists(list)}
          </div>
        )) 
      )}

      {appData?.expandedList !== null && (
        <div className="w-full px-4 m-1">
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
