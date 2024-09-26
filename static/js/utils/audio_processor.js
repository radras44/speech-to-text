export class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super()
        this.isRecording = false
        this.chunkSize = 4096
        this.buffer
        this.initialChunkState = new Int16Array([])
        this.chunk = this.initialChunkState
        this.port.onmessage = (e) => {
            if (!e.data.scope) return
            if (e.data.scope == "start") {
                this.isRecording = true
            }
            if (e.data.scope == "stop") {
                this.isRecording = false
            }

        }
    }

    process(inputs) {
        if (this.isRecording) {
            const input = inputs[0]
            const f32Arr = input[0]
            this._processBuffer(f32Arr)
        }
        return true
    }

    _processBuffer(f32Arr) {
        const i16Arr = this._float32ToInt16(f32Arr)
            this.chunk = new Int16Array([...this.chunk, ...i16Arr])
        if (this.chunk.length >= this.chunkSize) {
            this.port.postMessage({
                scope: "send_chunk",
                chunk: this.chunk
            })
            this.chunk = this.initialChunkState
        }
    }

    _float32ToInt16(float32Array) {
        const int16Array = new Int16Array(float32Array.length);
        for (let i = 0; i < float32Array.length; i++) {
            int16Array[i] = Math.max(-32768, Math.min(32767, Math.round(float32Array[i] * 32767)));
        }
        return int16Array;
    }
}

registerProcessor("recorder-worklet", AudioProcessor)