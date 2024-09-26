import { recorder } from "./main.js"
import { set_main_error } from "./main_actions.js"
const size = "128"
const color = "white"
const playIcon = `<svg class="text-${color} dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
</svg>
`

const stopIcon = `<svg class="text-${color} dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Z"/>
</svg>`

export default function () {
    const button = document.querySelector("#record_button")
    if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", () => {
            if (!window.localStorage.getItem("user_id")) {
                set_main_error("no tiene un id de usuario, intenta recargar la pagina")
                return
            }
            console.log(recorder.isRecording)
            if (recorder.isRecording) {
                console.log("stoping...")
                recorder.stop()
                button.innerHTML = playIcon
            } else {
                console.log("starting...")
                recorder.start()
                button.innerHTML = stopIcon
            }
        })
    }
}

const form = document.querySelector("#edit_user_modal form")
const usernameSpan = document.querySelector(".username_span")
document.addEventListener("DOMContentLoaded", () => {
    const username = window.localStorage.getItem("username")
    if (username) {
        usernameSpan.textContent = username
    }
})
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const username = formData.get("username")
    window.localStorage.setItem("username", username)
    usernameSpan.textContent = username
    form.reset()
})
