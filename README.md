# LuminaVerse 🌟

A beautiful, minimalist Bible verse mobile app for iOS and Android. Experience daily inspiration through randomly selected scripture with a peaceful, distraction-free interface.

## ✨ Features

### Core Features

- 📖 **Random Bible Verses** - Fresh scripture every time you open the app
- ⭐ **Favorites/Bookmarks** - Save meaningful verses for later
- 🔥 **Reading Streaks** - Track consecutive days of reading with gold badge
- 🔔 **Daily Notifications** - Customizable reminder time for daily inspiration
- 🎵 **Peaceful Background Music** - Optional ambient sounds (rain, streams, birds, wind chimes)
- 📤 **Easy Sharing** - Share verses via text, social media, or any app
- 💫 **Beautiful Animations** - Smooth fade-ins and pulsing loader
- 💾 **Offline Support** - Access saved verses without internet
- 🔒 **Privacy-First** - No data collection, everything stays on your device

### Technical Features

- 🔌 **Dual API Fallback** - bible-api.com with bible.org backup
- ⚠️ **Error Handling** - Graceful error messages and retry logic
- 📱 **Universal App** - Optimized for both phones and tablets
- 🎨 **Polished UI** - Teal theme with intuitive navigation

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# On your phone: Scan QR code with Expo Go app
```

### Production Build

```bash
# Build for both platforms
eas build --platform all --profile production

# Or build individually
eas build --platform ios
eas build --platform android
```

## 📱 App Store Submission

This app is ready for submission to the App Store and Google Play!

**See detailed submission guides:**

- 📋 [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) - Complete step-by-step checklist
- 🎨 [ICON_DESIGN_GUIDE.md](./ICON_DESIGN_GUIDE.md) - How to create app icons
- 🚀 [QUICK_START.md](./QUICK_START.md) - Fast-track submission guide
- 📝 [APP_STORE_DESCRIPTION.md](./APP_STORE_DESCRIPTION.md) - Pre-written descriptions and keywords
- 🔒 [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) - Complete privacy policy

**What you need:**

- Custom app icon (1024x1024px) - See ICON_DESIGN_GUIDE.md
- Apple Developer account ($99/year)
- Google Play Developer account ($25 one-time)
- Privacy policy URL (can use GitHub Pages - free)

**Estimated approval chances:** 90-95% ✅

## 📚 Project Structure

```
bible-verse-mobile/
├── App.tsx                      # Main app component (978 lines)
├── app.json                     # Expo configuration
├── eas.json                     # EAS Build configuration
├── package.json                 # Dependencies
├── assets/                      # App icons and images
├── SUBMISSION_CHECKLIST.md      # Complete submission guide
├── ICON_DESIGN_GUIDE.md         # Icon creation help
├── QUICK_START.md               # Fast-track guide
├── APP_STORE_DESCRIPTION.md     # Store listing content
├── PRIVACY_POLICY.md            # Privacy policy
└── APPLE_REVIEW_CHECKLIST.md    # Review preparation
```

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo SDK 54** - Development and build platform
- **TypeScript** - Type-safe code
- **@react-native-async-storage/async-storage** - Local data persistence
- **expo-notifications** - Daily reminders
- **expo-av** - Background music
- **@react-native-community/datetimepicker** - Time selection
- **@expo/vector-icons** - Icon library

## 🎨 Design

- **Primary Color**: #4a7c7e (Teal)
- **Accent Color**: #FFD700 (Gold - for streaks)
- **Typography**: System fonts for optimal readability
- **Layout**: Bottom navigation with Home/Favorites/Settings
- **Animations**: Smooth fades and pulses for delightful UX

## 📖 API Attribution

Bible verses provided by:

- [bible-api.com](https://bible-api.com) (Primary)
- [labs.bible.org](https://labs.bible.org) (Fallback)

All verses use public domain translations.

## 🔐 Privacy

LuminaVerse is privacy-first:

- ❌ No data collection
- ❌ No analytics or tracking
- ❌ No user accounts
- ✅ All data stored locally on your device
- ✅ You own your favorites and settings

See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for full details.

## 📄 License

© 2026 Labazine. All rights reserved.

## 🤝 Support

Need help or have feedback?

- Email: support@labazine.com
- Issues: [GitHub Issues](../../issues)

## 🎯 Roadmap

Future feature ideas:

- [ ] Multiple Bible translations
- [ ] Verse search
- [ ] Themed verse collections
- [ ] Apple Watch complication
- [ ] Widget support
- [ ] Dark mode

---

**Ready to submit to the App Store?** Start with [QUICK_START.md](./QUICK_START.md) 🚀
