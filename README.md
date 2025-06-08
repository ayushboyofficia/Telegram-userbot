# 🚀 Advanced Telegram Userbot

A powerful Telegram userbot with amazing animation modules, fun commands, and utility features!

## ✨ Features

### 🎨 Animation Modules
- **Heart Animation** - Colorful heart sequence
- **Loading Spinners** - Various loading animations
- **Clock Animation** - Time-based animations
- **Moon Phases** - Lunar cycle animation
- **Fire Effects** - Explosive animations
- **Dance Moves** - Fun dance emojis
- **Matrix Style** - Hacker-themed animations
- **Custom Animations** - Create your own!

### 🎮 Fun Commands
- **Reactions** - Express emotions with animated emojis
- **Random Quotes** - Inspirational quotes
- **Jokes** - Random jokes to lighten the mood
- **Games** - Coin flip, dice roll, magic 8-ball
- **Text Tools** - Reverse, mock, ASCII art

### 🛠️ Utility Features
- **Time & Date** - Current time display
- **Calculator** - Mathematical expressions
- **QR Codes** - Generate QR codes
- **Base64** - Encode/decode text
- **Hashing** - MD5, SHA1, SHA256
- **Ping Test** - Check bot latency

### 👑 Admin Tools
- **Message Purging** - Bulk delete messages
- **Chat Info** - Detailed chat statistics
- **Bot Stats** - Performance monitoring
- **Code Evaluation** - Execute JavaScript
- **Prefix Management** - Customize command prefix

## 🚀 Quick Start

1. **Get API Credentials**
   - Visit [my.telegram.org/apps](https://my.telegram.org/apps)
   - Create a new application
   - Note down your `API ID` and `API Hash`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Bot**
   ```bash
   npm start
   ```

4. **First Time Setup**
   - Enter your API ID and API Hash
   - Provide your phone number
   - Enter the verification code
   - If 2FA is enabled, enter your password

## 📱 Commands

### Animation Commands
```
.heart      - Heart animation
.loading    - Loading spinner
.clock      - Clock animation
.moon       - Moon phases
.earth      - Earth rotation
.fire       - Fire animation
.dance      - Dance animation
.rain       - Rain animation
.snake      - Snake growing
.typing     - Typing animation
.matrix     - Matrix loading
.hack       - Hacker animation
.boom       - Explosion sequence
.love       - Love animation
.wave       - Wave animation
.rainbow    - Rainbow colors
```

### Fun Commands
```
.react <mood>           - Random reactions (happy, sad, angry, love, cool)
.quote                  - Random inspirational quote
.joke                   - Random joke
.flip                   - Coin flip
.dice                   - Roll a dice
.8ball <question>       - Magic 8-ball
.choose <option1> <option2> ... - Choose randomly
.reverse <text>         - Reverse text
.mock <text>           - mOcK tExT
.ascii <text>          - ASCII art (basic)
```

### Utility Commands
```
.time                   - Current time
.ping                   - Check latency
.calc <expression>      - Calculator
.weather <city>         - Weather info (requires API key)
.shorten <url>          - URL shortener
.qr <text>             - Generate QR code
.base64 encode <text>   - Encode to base64
.base64 decode <text>   - Decode from base64
.hash <text>           - Generate hashes
.help                  - Show help menu
```

### Admin Commands
```
.purge <count>         - Delete messages (max 100)
.info                  - Chat information
.stats                 - Bot statistics
.eval <code>           - Execute JavaScript
.restart               - Restart bot
.prefix <new_prefix>   - Change command prefix
```

## ⚙️ Configuration

The bot automatically creates a `config.json` file with your settings:

```json
{
  "apiId": "your_api_id",
  "apiHash": "your_api_hash",
  "session": "session_string",
  "prefix": ".",
  "owner": "your_user_id"
}
```

## 🔧 Customization

### Adding New Animations
Edit `src/plugins/animations.js` and add your animation frames:

```javascript
const ANIMATIONS = {
    myAnimation: ['frame1', 'frame2', 'frame3'],
    // ... other animations
};
```

### Creating New Plugins
Create a new file in `src/plugins/` directory:

```javascript
export default {
    name: 'my-plugin',
    description: 'My custom plugin',
    
    handler: async (event, client, config) => {
        // Your plugin logic here
    }
};
```

## 🛡️ Security Notes

- Keep your API credentials secure
- Don't share your session string
- Be careful with the `eval` command
- Only use trusted plugins

## 📝 License

MIT License - feel free to modify and distribute!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new animations
- Create new plugins
- Fix bugs
- Improve documentation

## ⚠️ Disclaimer

This userbot is for educational purposes. Use responsibly and follow Telegram's Terms of Service.

---

**Made with ❤️ for the Telegram community**
