import { set_main_error } from "../main/main_actions.js"

export class Recorder {
    constructor(socket) {
        this.socket = socket
        this.user_id
        this.isRecording
        this.microphone
        this.context
        this.processor
        this.initialized
        this.length
        this.initialized = false
    }

    async init() {
        this.context = new AudioContext()
        this.microphone = await navigator.mediaDevices.getUserMedia({
            audio: { channelCount: 1 }
        })
        this.source = this.context.createMediaStreamSource(this.microphone)
        await this.context.audioWorklet.addModule("static/js/utils/audio_processor.js")
        this.processorNode = new AudioWorkletNode(this.context, "recorder-worklet")
        this.source.connect(this.processorNode)
        this.processorNode.port.onmessage = (e) => {
            if (e.data.scope == "send_chunk") {
                const chunk = e.data.chunk
                this.send_chunk(chunk)
            }
        }
        this.initialized = true
    }

    send_chunk(chunk) {
        this.length += chunk.length
        this.socket.emit("record:catch_chunk", {
            user_id: this.user_id,
            chunk: chunk
        })
    }

    start() {
        if (!this.initialized) {
            this.init().catch((e) => {
                set_main_error("a ocurrido un problema en la inicializaron del contexto de grabación:\n",e)
                console.log(e)
            })
        }
        this.length = 0
        this.processorNode.port.postMessage({ scope: "start" })
        this.isRecording = true
    }

    stop() {
        const username = window.localStorage.getItem("username") || null
        this.processorNode.port.postMessage({ scope: "stop" })
        this.isRecording = false
        this.socket.emit("record:process", {
            user_id: this.user_id,
            username: username,
            sample_rate: this.context.sampleRate,
            length: this.length
        })
    }


}

