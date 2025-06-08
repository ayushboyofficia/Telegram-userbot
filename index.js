import { TelegramApi } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import input from 'input';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    apiId: null,
    apiHash: null,
    session: null,
    prefix: '.',
    owner: null
};

// Load configuration
async function loadConfig() {
    try {
        const configPath = path.join(__dirname, '..', 'config.json');
        if (await fs.pathExists(configPath)) {
            const config = await fs.readJson(configPath);
            Object.assign(CONFIG, config);
        }
    } catch (error) {
        console.log(chalk.yellow('No config file found, will create one...'));
    }
}

// Save configuration
async function saveConfig() {
    try {
        const configPath = path.join(__dirname, '..', 'config.json');
        await fs.writeJson(configPath, CONFIG, { spaces: 2 });
    } catch (error) {
        console.error(chalk.red('Error saving config:'), error);
    }
}

// Display banner
function displayBanner() {
    console.clear();
    const banner = figlet.textSync('USERBOT', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    
    console.log(gradient.rainbow(banner));
    console.log(chalk.cyan('🚀 Advanced Telegram Userbot with Animations'));
    console.log(chalk.yellow('━'.repeat(60)));
}

// Setup function
async function setup() {
    displayBanner();
    
    if (!CONFIG.apiId || !CONFIG.apiHash) {
        console.log(chalk.blue('\n📱 First time setup required!'));
        console.log(chalk.gray('Get your API credentials from: https://my.telegram.org/apps'));
        
        CONFIG.apiId = parseInt(await input.text(chalk.green('Enter your API ID: ')));
        CONFIG.apiHash = await input.text(chalk.green('Enter your API Hash: '));
        
        await saveConfig();
    }
    
    return new TelegramApi(new StringSession(CONFIG.session || ''), CONFIG.apiId, CONFIG.apiHash, {
        connectionRetries: 5,
    });
}

// Load plugins
async function loadPlugins(client) {
    const pluginsDir = path.join(__dirname, 'plugins');
    await fs.ensureDir(pluginsDir);
    
    const pluginFiles = await fs.readdir(pluginsDir);
    const plugins = [];
    
    for (const file of pluginFiles) {
        if (file.endsWith('.js')) {
            try {
                const plugin = await import(`./plugins/${file}`);
                plugins.push(plugin.default);
                console.log(chalk.green(`✅ Loaded plugin: ${file}`));
            } catch (error) {
                console.log(chalk.red(`❌ Failed to load plugin ${file}:`, error.message));
            }
        }
    }
    
    return plugins;
}

// Main function
async function main() {
    await loadConfig();
    const client = await setup();
    
    console.log(chalk.blue('\n🔐 Connecting to Telegram...'));
    
    await client.start({
        phoneNumber: async () => await input.text(chalk.green('Enter your phone number: ')),
        password: async () => await input.password(chalk.green('Enter your password: ')),
        phoneCode: async () => await input.text(chalk.green('Enter the code you received: ')),
        onError: (err) => console.log(chalk.red('Error:', err)),
    });
    
    // Save session
    CONFIG.session = client.session.save();
    await saveConfig();
    
    console.log(chalk.green('✅ Successfully connected!'));
    
    // Get user info
    const me = await client.getMe();
    CONFIG.owner = me.id.toString();
    await saveConfig();
    
    console.log(chalk.cyan(`👋 Welcome, ${me.firstName}!`));
    console.log(chalk.yellow(`🆔 User ID: ${me.id}`));
    console.log(chalk.magenta(`📱 Username: @${me.username || 'N/A'}`));
    
    // Load plugins
    const plugins = await loadPlugins(client);
    console.log(chalk.blue(`\n🔌 Loaded ${plugins.length} plugins`));
    
    // Event handler
    client.addEventHandler(async (event) => {
        try {
            for (const plugin of plugins) {
                if (plugin.handler) {
                    await plugin.handler(event, client, CONFIG);
                }
            }
        } catch (error) {
            console.error(chalk.red('Plugin error:'), error);
        }
    });
    
    console.log(chalk.green('\n🎉 Userbot is now running!'));
    console.log(chalk.gray('Press Ctrl+C to stop'));
}

// Start the bot
main().catch(console.error);
