'use client'
import * as React from 'react';
import { toast } from 'sonner'

interface IShowUserMessagesProps {
    messages: string ;
}

const ShowUserMessages: React.FunctionComponent<IShowUserMessagesProps> = (props) => {
    const { messages } = props;
    const [userMessages, setUserMessages] = React.useState<string>("");

    React.useEffect(() => {
        
            
            const parsedMessages = userMessages.split(';').map((msg) => msg.trim()).filter((msg) => msg !== '');
            parsedMessages.forEach((msg) => {
                toast.success(msg)
                console.log(msg); // Log each message to the console
            });
    },[userMessages]);
    React.useEffect(() => {
        setUserMessages(messages);
    }, [messages]);

  return(<>
  
  </>) ;
};

export default ShowUserMessages;
