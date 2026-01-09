# Icon Design Guide for LuminaVerse

## Required Icons

### 1. App Icon (icon.png)

- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Location**: `./assets/icon.png`

### 2. Adaptive Icon (Android - adaptive-icon.png)

- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Location**: `./assets/adaptive-icon.png`
- **Safe Zone**: Keep important content in center 660x660px circle
- **Note**: Android will mask this into various shapes

### 3. Notification Icon (optional but recommended)

- **Size**: 96x96 pixels (will be auto-scaled)
- **Format**: PNG
- **Note**: Currently using main icon, works fine

## Design Guidelines

### Brand Colors

- **Primary**: #4a7c7e (Teal) - Main app color
- **Accent**: #FFD700 (Gold) - Used for streaks
- **Background**: White or transparent
- **Text/Icons**: White or teal

### Design Concepts

#### Option 1: Book & Light (Recommended)

- Open book in teal
- Glowing light/rays emanating from pages
- Gold accent for divine light
- Minimalist, spiritual feel
- Clear at small sizes

#### Option 2: Minimalist Cross & Book

- Simple cross silhouette
- Book pages behind
- Teal background with white elements
- Clean, recognizable

#### Option 3: Abstract Light Burst

- Radiating lines from center (sun rays)
- Subtle book shape integrated
- Gradient from teal to lighter blue
- Modern, uplifting

#### Option 4: Scripture Scroll

- Rolled scroll with text lines
- Teal coloring
- Gold ribbon accent
- Classic, timeless

### Design Best Practices

✅ **Do:**

- Keep it simple - icons are viewed at small sizes
- Use high contrast (light on dark or dark on light)
- Make it recognizable at 29x29px (smallest iOS size)
- Use the brand teal color #4a7c7e
- Test on both light and dark backgrounds
- Ensure no text (except for stylized scripture marks)
- Center the main element
- Use universal symbols (book, light, cross)

❌ **Don't:**

- Don't use photos or complex imagery
- Don't use small text or fine details
- Don't fill entire space - leave breathing room
- Don't use more than 2-3 colors
- Don't make it look like other Bible apps
- Don't use copyrighted images

## Design Tools

### Free Options:

1. **Canva** (canva.com)

   - Use "App Icon" template
   - Easy drag-and-drop
   - Free icons and elements
   - Export as PNG

2. **Figma** (figma.com)

   - Professional design tool
   - Free tier available
   - Full control
   - Export at any resolution

3. **AppIcon.co** (appicon.co)
   - Upload a 1024x1024 design
   - Auto-generates all sizes
   - Quick and simple

### Paid Options:

1. **Adobe Illustrator** - Professional vector design
2. **Affinity Designer** - One-time purchase alternative
3. **Hire a designer on Fiverr** ($10-50 for app icon)

## Quick Generation Steps

### Using Canva (Easiest):

1. Go to canva.com and create account
2. Search for "App Icon" template
3. Choose 1024x1024 size
4. Add a book or light icon from Canva library
5. Change color to #4a7c7e
6. Add subtle glow or gradient
7. Download as PNG (transparent background)
8. Save as `icon.png` and `adaptive-icon.png`

### Using AI Image Generator:

1. Use DALL-E, Midjourney, or similar
2. Prompt: "minimalist app icon, open book with glowing light, teal color #4a7c7e, simple spiritual design, flat style, transparent background"
3. Upscale to 1024x1024
4. Remove background if needed
5. Adjust colors in Photoshop/Photopea

### Using Icon Maker:

1. Visit appicon.co or makeappicon.com
2. Upload a simple design or photo
3. Tool auto-generates all required sizes
4. Download the bundle
5. Extract icon.png and adaptive-icon.png

## Testing Your Icon

### Before Finalizing:

1. **Preview at different sizes**:

   - 1024x1024 (App Store listing)
   - 180x180 (iPhone)
   - 120x120 (iPhone)
   - 60x60 (Small)
   - 29x29 (Smallest - Settings)

2. **Test on different backgrounds**:

   - White background (App Store)
   - Black background (iOS dark mode)
   - Home screen with wallpaper
   - In app switcher

3. **Compare with competitors**:

   - Look at other Bible apps
   - Ensure yours stands out
   - Check it's not too similar

4. **Ask for feedback**:
   - Show to 3-5 people
   - Ask "What app is this?"
   - If they guess "Bible" or "spiritual" - perfect!

## Current Placeholder Icon

The app currently uses the default Expo icon (green/teal gradient). This MUST be replaced before App Store submission.

**Rejection Risk**: Using default icons is an automatic rejection from both Apple and Google.

## Installation

Once you have your icon files:

1. Save `icon.png` (1024x1024) to `./assets/icon.png`
2. Save `adaptive-icon.png` (1024x1024) to `./assets/adaptive-icon.png`
3. Run `npx expo prebuild --clean` to regenerate native projects
4. Or just build with EAS - it will use the new icons

## Next Steps

After creating your icon:

1. Replace the placeholder files in `./assets/`
2. Test with `npx expo start` and view on device
3. If it looks good, proceed with EAS build
4. Take screenshots for App Store listing

---

**Need Help?**

If you need a quick professional icon:

- Fiverr: Search "app icon design" ($15-30, 24-48hr delivery)
- Upwork: Post a job for app icon ($25-50)
- 99designs: Run a contest (multiple designers compete)
- Reddit r/freedesign: Request help (free, varies quality)

**Recommended Budget**: $20-30 for professional designer on Fiverr
**Time to Create Yourself**: 30-60 minutes with Canva
**Difficulty**: Easy with templates, Medium from scratch
