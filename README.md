# Directus Browser Notification Interface

A Directus interface extension that enables browser notifications for platform notifications. This extension allows users to receive browser notifications when new notifications arrive in Directus.

## Features

- Browser notification support
- Automatic permission handling
- Real-time notification updates
- Click-through navigation to relevant content
- Clean and simple interface

## Installation

1. Install the extension:

```bash
npm install directus-extension-browser-notification
```

2. Add the extension to your Directus project:

```bash
npx directus-extension link
```

3. Restart your Directus instance

## Usage

1. Add the "Browser Notification" interface to your desired collection
2. Users will see a button to enable browser notifications
3. Once enabled, users will receive browser notifications for new Directus notifications
4. Clicking a notification will navigate to the relevant content

## Requirements

- Directus 10.0.0 or later
- Modern browser with Notification API support

## Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## License

MIT

## Author

[Ricardo Paes](https://github.com/paesjr)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
