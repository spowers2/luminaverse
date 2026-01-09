# Icon Installation Instructions

## You have a custom icon ready!

The attached icon image (white open book with sparkle on transparent background) needs to be saved to your assets folder.

### Steps to Install the Icon:

1. **Save the icon image** from your attachment as a PNG file
2. **Resize if needed**: Ensure it's 1024x1024 pixels
3. **Save it twice** in the `/assets/` folder:
   - `icon.png` (for iOS and general use)
   - `adaptive-icon.png` (for Android adaptive icons)

### Option 1: Manual Save (Easiest)

1. Right-click the attached image in VS Code
2. Save it to your Desktop as `icon.png`
3. Copy the file to: `/Users/scottpowers/Documents/bibleverseapp/bible-verse-mobile/assets/icon.png`
4. Make another copy as: `/Users/scottpowers/Documents/bibleverseapp/bible-verse-mobile/assets/adaptive-icon.png`

### Option 2: Command Line

If you saved the icon to your Desktop:

```bash
cd /Users/scottpowers/Documents/bibleverseapp/bible-verse-mobile/assets
cp ~/Desktop/icon.png ./icon.png
cp ~/Desktop/icon.png ./adaptive-icon.png
```

### Verify Icon Installation

After copying the files, run:

```bash
ls -lh /Users/scottpowers/Documents/bibleverseapp/bible-verse-mobile/assets/*.png
```

You should see:

- icon.png (your new icon)
- adaptive-icon.png (your new icon)
- splash-icon.png (existing)
- favicon.png (existing)

### Test the Icon

1. Stop the current Expo server if running
2. Run: `npx expo start --clear`
3. Reload your app on your phone
4. The new icon should appear (may need to close and reopen Expo Go)

### For Production Build

When you run `eas build --platform all`, EAS will automatically use these icon files for both iOS and Android app icons.

---

**Note**: The icon you provided (white book with star) will look great on the teal background! The design is simple, recognizable, and perfect for a Bible app.
