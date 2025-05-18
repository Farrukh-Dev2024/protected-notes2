import Image from "next/image";
import NavBar from "@/app/clientcomponents/NavBar";
import LoginForm from "@/app/clientcomponents/LoginForm";
import LogOutForm from "@/app/clientcomponents/LogOutForm";
import UserSettingsForm from "@/app/clientcomponents/UserSettingsForm";
import CheckLogin from "@/app/servercomponents/LoginCheck";

import { auth } from "@/lib/auth"
import {createUser,getUser,updateUser,deleteUser,comparePassword} from "@/lib/users"
import { InstallPrompt, PushNotificationManager } from "./clientcomponents/PushNotificationManager";
import HomePage from "./clientcomponents/HomePage";
import ContactMe from "./clientcomponents/ContactMe";


export default async function Home({params,searchParams}:{params:Promise<{showpage: string,}>;searchParams:Promise<{page: string,}>} ) {
  const { showpage } = await params; // url/[showpage]/page.tsx we are not using it for now
  const { page } = await searchParams; // url/[showpage]/page.tsx?page=1
  //console.log("showpage %o",showpage);
  //console.log("page %o",page);

  const session = await auth()
  let userdb = null;
  let isBanned = false;
  let showJoyRide = false;
  userdb = await getUser({email: session?.user?.email as string  })

  if (session && userdb==null){
    userdb = await createUser(session.user?.email as string, "123456789");
    userdb = await updateUser(userdb.id, {name: "NewUser" , messages: "We have created password for you which is '123456789',Kindly change it to your own password;"});
    userdb = await getUser({email: session.user?.email as string  })
    showJoyRide = true;
  }
  if (userdb){
    //console.log("userdb %o",userdb);
    if (userdb?.isBanned){
        isBanned = true;
    }
  }
  const messages = null;
  if (page=="login" && !session){
    return (
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <NavBar email={""} />
        <LoginForm />
      </div>
    );
  }
  if (page=="logout" && session){
    return (
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <NavBar email={userdb?.email as string} />
        <LogOutForm />
      </div>
    );
  }  
  if (page=="usersettings" && session){
    return (
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <NavBar email={userdb?.email as string} />
        <UserSettingsForm email={userdb?.email as string} name={userdb?.name as string}/>
      </div>
    );
  }    
  if (isBanned){
    return(  
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <NavBar email={userdb?.email as string} />
        <CheckLogin />
            <div className="form-container-style">
              <div className="form-style"> 
                <h2 className="form-h2-style !text-red-500">Your account is blocked</h2>
              </div>  
            </div>
      </div>
    );
  }
  if (page=="contactme"){
    return (
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <NavBar email={userdb?.email as string} />
        <ContactMe />
      </div>
    );
  }
  return (
    <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      {/* <PushNotificationManager />
      <InstallPrompt />       */}
      
      {session ? 
          <>
            <CheckLogin />
            <HomePage email={userdb?.email as string} showJoyRide={showJoyRide }/>
            {/* <LogOutForm />  */}
          </>
      :
        <>
          <NavBar email={userdb?.email as string} />
          <LoginForm />
        </>
        }
    </div>
  );
  // return (
  //   <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
  //     <NavBar />
  //     <UserSettingsForm />
  //     <LoginForm />
  //   </div>
  // );  
}
