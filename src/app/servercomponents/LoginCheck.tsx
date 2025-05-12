'use server'
import {createUser,getUser,updateUser,deleteUser,comparePassword} from "@/lib/users"
import { auth } from "@/lib/auth"
import ShowUserMessages from "@/app/clientcomponents/ShowUserMessages";

export default async function LoginCheck() {
  'use server'        
  const session = await auth()
  let userdb = null;
  let messages = null;
  if (session){
    userdb = await getUser({email: session.user?.email as string  })
    // if (userdb===null){
    // }else{
    // }
    if (userdb?.messages){
      messages = userdb?.messages;
      userdb = await updateUser(userdb.id, {messages: ""});
      console.log(messages);
    }
  }else{
    //session not present
  }
    return (
        <>
        {messages ? 
            <ShowUserMessages messages={messages}/>
        :
            <></>
        }
        </>
        );
}