---
title: VoiceOn APIs
description: 'Simple document to easily call VoiceOn APIs'
---

# VoiceOn APIs

Simple document to easily call `VoiceOn` APIs.

---

## 1. Getting intents through an audio file

Route: `api/speech-to-intent`

Headers:

1. `content-type`: `audio-wave`

Method: `POST`

Use `recorder.js` which you will find in `static` folder. There are 2 ways to get intents through an audio file.

1. Sending an audio file from the device
2. Creating an audio file on the fly

---

1. **First**: Let's start with `sending an audio file`

   - Audio must be a valid `.wave` file
   - Convert audio file to a blob before sending it to `api/speech-to-intent`
   - Example

     ```javascript
     const wavBlob = await getWaveBlob()
     axios
       .create()
       .post('api/speech-to-intent', wavBlob, {
         headers: {
           'Content-Type': 'audio-wav',
         },
       })
       .then((x) => {
         // While `x` is the response, containing the following
       })
     ```

     - Object ( **`x`** ) Contains the following
     - `text`: Text spoken in the audio file
     - `intent`: Object contains information about the intent
       - `name`: Intent name as specified in Rhasspy sentenses
     - `tokens`: Contains specified variable values in the intent, For example
       - When you say: `Turn on the light`, ( `on` ) here is a variable (`token`), It can be ( `off` ) to tell the app to turn off the light.
       - These variables are accessed through the `tokens` object
       - Variable names are specified through `Rhasspy sentenses`

2. **Second**: `Creating audio file on the fly`

   - Get Microphone permision

   ```javascript
   getMicrophonePermission() {
     // Use a promise-based function
     // Because we've to wait until user gives microphone permision
     return new Promise((resolve, reject) => {
       if (this.audioContext == null) {
         this.audioContext = new AudioContext()
       }
       if (this.recorder == null) {
         const that = this
         navigator.mediaDevices
           .getUserMedia({ audio: true })
           .then(function (stream) {
             const input = that.audioContext.createMediaStreamSource(stream)
             // If your linter is strict on undefined variables
             // Please disable it for the next line
             // eslint-disable-next-line no-undef
             that.recorder = new Recorder(input)
             resolve(true)
           })
       } else {
         resolve(true)
       }
     })
   }
   ```

   - Clear previous recording bytes and start a new recording session

   ```javascript
   this.recorder.clear()
   this.recorder.record()
   ```

   - Start giving commands through your browser microphone, then stop it when finished, and send the exported wave file to the API

   - Full Example using a Vue.js based component

   ```javascript
   import axios from 'axios'
   export default {
     data: () => ({
       tapRecording: false,
       recorder: null,
       interpreting: false,
       audioContext: null,
     }),
     methods: {
       startRecording() {
         const permission = await this.getMicrophonePermission()
         if (permission === true) {
           this.recorder.clear()
           this.recorder.record()
         } else {
           // Need permission to access the Microphone
         }
       },
       getMicrophonePermission() {
         // Use a promise-based function
         // Because we've to wait until user gives microphone permision
         return new Promise((resolve, reject) => {
           if (this.audioContext == null) {
             this.audioContext = new AudioContext()
           }
           if (this.recorder == null) {
             const that = this
             navigator.mediaDevices
               .getUserMedia({ audio: true })
               .then(function (stream) {
                 const input = that.audioContext.createMediaStreamSource(stream)
                 // If your linter is strict on undefined variables
                 // Please disable it for the next line
                 // eslint-disable-next-line no-undef
                 that.recorder = new Recorder(input)
                 resolve(true)
               })
           } else {
             resolve(true)
           }
         })
       },
       stopRecording() {
         this.recorder.stop()
         // Export recording data
         const that = this
         that.$set(that, 'interpreting', true)
         this.recorder.exportWAV(function (blob) {
           that.beginAsync()
           axios
             .create()
             .post('api/speech-to-intent', blob, {
               headers: {
                 'Content-Type': 'audio-wav',
               },
             })
             .then((x) => {
               const confidence = x.data.speech_confidence // confidence is how much Rhasspy is sure about this intent?
               if (
                 // Check if it is a real intent
                 x.data.intent.name.length > 0
               ) {
                 // Handle the response as you prefer
               } else {
                 // Rhasspy converted the voice into string but didn't recognize any knonwn intent in the voice
               }
               that.$set(that, 'tapRecording', false)
             })
             .catch((err) => {
               // Something happened during transcripting the wave file
             })
             .then(() => {
               // Whatever you can do next
             })
         })
       },
     },
   }
   ```

## 2. Getting intents through a text

Route: `api/text-to-intent`

Headers:

1. `content-type`: `text/plain`

Method: `POST`

Example

```javascript
Api().post('api/text-to-intent', 'tell me the time', {
  params: {}, // In case you wanted to send additional params
  headers: { 'Content-Type': 'text/plain' },
})
```

Response: `Same as previous route`

.

## 3. Get last audio file sent

Route: `api/play-recording`

Headers: `none`

Method: `POST`

Example

```javascript
Api().post('api/play-recording', '')
```

Response: `.wave` audio file

.

## A lot of examples to help you understand it very well

`Coming soon`

.

##

.

##

.

##

.
