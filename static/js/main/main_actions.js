import { socket } from "./main.js"

const main_error = document.querySelector("#main_error")

export function set_main_error(error) {
    main_error.innerHTML = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span>${error}
</div>`
}
const chat = document.querySelector("#chat")
const chatList = document.querySelector("#chat ul")

export function add_chat_bubble(username, time, message) {
    const date = new Date(parseFloat(time))
    const timeDate = `${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")} - ${date.getDate().toString().padStart(2,"0")}/${(date.getMonth() + 1).toString().padStart(2,"0")}/${date.getFullYear()}`
    const li = document.createElement("li")

    li.innerHTML = `<li>
                <div class="flex flex-col items-start gap-4 bg-background_card p-4 rounded-e-xl rounded-es-xl">
                    <div class="max-w-[100%] flex-1 overflow-x-hidden flex space-x-2 rtl:space-x-reverse">
                        <span
                            class="text-sm font-semibold text-text_primary dark:text-white whitespace-nowrap truncate">${username}</span>
                        <span
                            class="text-sm font-normal text-text_disabled dark:text-gray-400 truncate">${timeDate}</span>
                    </div>
                    <p class="text-sm font-normal py-2.5 text-text_secondary dark:text-white">
                        ${message}</p>
                </div>
            </li>`
    chatList.insertBefore(li, chatList.firstChild)
    if(chat.classList.contains("hidden")){
        chat.classList.remove("hidden")
    }
}

export function get_username(defaultMsg = "ingrese un nombre de usuario:", ignoreLocalStorage = false) {
    let username = window.localStorage.getItem("username")
    if (!username || ignoreLocalStorage) {
        let userInput = prompt(defaultMsg)
        while (userInput == null || userInput.trim() == "") {
            userInput = prompt("Ingrese un nombre de usuario de almenos un carácter")
        }
        socket.emit("auth:register", {
            username: userInput
        })
    } else {
        socket.emit("auth:register", {
            username: username
        })
    }
    return username
}