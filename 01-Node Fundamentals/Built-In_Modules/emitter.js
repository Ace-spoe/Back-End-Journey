// const event = require("events");
// const evenEmitter = new event();

// evenEmitter.on("Greet" , (name)=>{
//     console.log(`Hi ${name}`);
// })
// console.log("Event Emitters");

// evenEmitter.emit("Greet" , "Billy");

// The Chat Room example
// const EventEmitter = require('events');
// class ChatRoom extends EventEmitter {
//     constructor() {
//         super();
//         this.users = [];
//     }

//     join(username) {
//         this.users.push(username);
//         // Emit event: someone joined
//         this.emit('user-joined', username);
//     }

//     sendMessage(username, message) {
//         // Emit event: a message was sent
//         this.emit('message', username, message);
//     }

//     leave(username) {
//         this.users = this.users.filter(user => user !== username);
//         // Emit event: someone left
//         this.emit('user-left', username);
//     }
// }
// // Create a chat room
// const chat = new ChatRoom();
// // LISTEN: When someone joins
// chat.on('user-joined', (username) => {
//     console.log(`👋 ${username} joined the chat!`);
//     console.log(`👥 Users online: ${chat.users.join(', ')}`);
// });
// // LISTEN: When someone sends a message
// chat.on('message', (username, message) => {
//     console.log(`💬 ${username}: ${message}`);
// });
// // LISTEN: When someone leaves
// chat.on('user-left', (username) => {
//     console.log(`👋 ${username} left the chat`);
//     console.log(`👥 Users online: ${chat.users.join(', ')}`);
// });
// // Now let's use it!
// chat.join('Alice');
// chat.join('Bob');
// chat.sendMessage('Alice', 'Hello everyone!');
// chat.sendMessage('Bob', 'Hi Alice!');
// chat.leave('Alice');
// // Output:
// // 👋 Alice joined the chat!
// // 👥 Users online: Alice
// // 👋 Bob joined the chat!
// // 👥 Users online: Alice, Bob
// // 💬 Alice: Hello everyone!
// // 💬 Bob: Hi Alice!
// // 👋 Alice left the chat
// // 👥 Users online: Bob

//Downlaod Manager
const EventEmitter = require('events')

class DownloadManager extends EventEmitter {
  downloadFile(url) {
    console.log(`📥 Starting download: ${url}`)
    this.emit('start', url)

    // Simulate download progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      this.emit('progress', url, progress)

      if (progress >= 100) {
        clearInterval(interval)
        this.emit('complete', url)
        this.emit('end', url)
      }
    }, 500)

    // Simulate possible error
    if (url.includes('error')) {
      setTimeout(() => {
        this.emit('error', url, 'Invalid URL')
      }, 1000)
    }
  }
}

// Create download manager
const downloader = new DownloadManager()

// Listen to all events
downloader.on('start', (url) => {
  console.log(`🚀 Download started for ${url}`)
})

downloader.on('progress', (url, progress) => {
  console.log(`⏳ ${url}: ${progress}%`)
})

downloader.on('complete', (url) => {
  console.log(`✅ Download complete: ${url}`)
})

downloader.on('error', (url, error) => {
  console.log(`❌ Error downloading ${url}: ${error}`)
})

downloader.on('end', (url) => {
  console.log(`🏁 Finished processing: ${url}`)
  console.log('---')
})

// Start downloads
downloader.downloadFile('https://example.com/file1.zip')
setTimeout(() => {
  downloader.downloadFile('https://example.com/error-file.zip')
}, 3000)

// Output: Events flow naturally as the download progresses!
