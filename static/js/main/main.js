import { Recorder} from "../utils/recorder.js"
import { add_chat_bubble,set_main_error} from "./main_actions.js";
import main_events from "./main_events.js";
export const socket = io("/");
export const recorder = new Recorder(socket)
socket.on("connect", () => {
    let user_id = window.localStorage.getItem("user_id")
    if(!user_id) {
        user_id = window.crypto.randomUUID()
        window.localStorage.setItem("user_id",user_id)
    }
    recorder.user_id = user_id
})

socket.on("record:process_response", (data) => {
    const {message,time,user_id,username} = data
    console.log(message,time,user_id)
    console.log(`message:${data.message}`)
    add_chat_bubble(username,time,message)
})

main_events()

