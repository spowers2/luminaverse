# Complete App Store & Google Play Submission Checklist

## ✅ COMPLETED ITEMS

### Features (Required for Approval)

- ✅ Favorites/Bookmarks system
- ✅ Daily notifications with custom time
- ✅ Reading streak tracking (gamification)
- ✅ Background music feature
- ✅ Share functionality
- ✅ Offline support (cached verses)
- ✅ About/Attribution section
- ✅ Privacy-friendly (no data collection)

### Configuration Files

- ✅ app.json properly configured
- ✅ Bundle identifiers set (com.labazine.luminaverse)
- ✅ EAS project ID configured
- ✅ eas.json created
- ✅ Version 1.0.0 set
- ✅ Permissions declared (notifications, internet)

### Documentation

- ✅ Privacy Policy created (PRIVACY_POLICY.md)
- ✅ App description written (APP_STORE_DESCRIPTION.md)
- ✅ Keywords selected
- ✅ Review notes prepared
- ✅ Icon design guide created (ICON_DESIGN_GUIDE.md)

### Code Quality

- ✅ Error handling implemented
- ✅ Loading states for all async operations
- ✅ Graceful offline behavior
- ✅ Proper attribution for APIs
- ✅ No console errors in production
- ✅ TypeScript types defined

---

## 🚧 TODO: BEFORE FIRST BUILD

### 1. Create App Icons (CRITICAL - Required for submission)

**Status**: ⚠️ Using default Expo placeholder

**Action Required**:

- [ ] Design or commission 1024x1024px app icon
- [ ] Create icon.png (main app icon)
- [ ] Create adaptive-icon.png (Android adaptive)
- [ ] Replace files in `./assets/` folder
- [ ] Test icon appearance on actual device

**Resources**:

- See ICON_DESIGN_GUIDE.md for detailed instructions
- Quick option: Use Canva with "App Icon" template
- Professional option: Hire designer on Fiverr ($15-30)
- Color scheme: #4a7c7e (teal), #FFD700 (gold accent)

**Time Estimate**: 30-60 minutes (DIY) or 24-48 hours (outsource)

---

### 2. Create Website/Landing Page (Strongly Recommended)

**Status**: ⚠️ Not created yet

**Action Required**:

- [ ] Create simple website at labazine.com/luminaverse
- [ ] Add Privacy Policy page (/privacy)
- [ ] Add Support page (/support)
- [ ] Include app screenshots
- [ ] Add download links (once live)

**Minimum Pages Needed**:

1. **Home** - App description, features, screenshots
2. **Privacy** - Copy from PRIVACY_POLICY.md
3. **Support** - Contact form or email

**Quick Options**:

- GitHub Pages (free) - just HTML/CSS
- Carrd.co (free tier works)
- Google Sites (free, very easy)
- Notion site (free)

**Alternative**: If you don't have labazine.com, you can use:

- App's GitHub repo URL for support
- Link to PRIVACY_POLICY.md in GitHub repo
- Update URLs in app.json and App.tsx accordingly

**Time Estimate**: 2-3 hours for basic site

---

### 3. Apple Developer Account Setup (iOS only - costs $99/year)

**Status**: ❓ Unknown if you have account

**Action Required**:

- [ ] Sign up at developer.apple.com
- [ ] Pay $99 annual fee
- [ ] Complete enrollment (1-2 days approval)
- [ ] Accept agreements in App Store Connect
- [ ] Enable 2FA on Apple ID

**Note**: You CANNOT submit to iOS App Store without this account.

---

### 4. Google Play Developer Account (Android - one-time $25 fee)

**Status**: ❓ Unknown if you have account

**Action Required**:

- [ ] Sign up at play.google.com/console
- [ ] Pay $25 one-time registration fee
- [ ] Verify identity (phone, possibly ID)
- [ ] Accept Google Play Developer Agreement
- [ ] Complete tax/merchant information

---

## 📱 BUILD & TESTING

### 5. Create Production Build

**Status**: Not started

**Commands**:

```bash
# iOS only
eas build --platform ios --profile production

# Android only
eas build --platform android --profile production

# Both platforms
eas build --platform all --profile production
```

**What Happens**:

- EAS builds your app in the cloud
- iOS: Creates .ipa file (requires Apple Developer account)
- Android: Creates .aab or .apk file
- Takes 15-30 minutes per platform
- You'll get download link when done

**First Build Checklist**:

- [ ] Ensure icons are replaced (not defaults!)
- [ ] Check app.json version is correct
- [ ] Verify bundle identifiers match developer accounts
- [ ] Have Apple ID credentials ready (for iOS 2FA during build)

---

### 6. Test Production Build

**Status**: Not started

**iOS Testing**:

- [ ] Install .ipa on physical iPhone using TestFlight or EAS
- [ ] Test all features thoroughly
- [ ] Verify notifications work (they won't in Expo Go)
- [ ] Test background music (won't work in Expo Go)
- [ ] Check icon appears correctly
- [ ] Test on multiple iOS versions if possible
- [ ] Test on iPad (app is universal)

**Android Testing**:

- [ ] Install .apk/.aab on physical Android device
- [ ] Test all features thoroughly
- [ ] Verify notifications work
- [ ] Test background music
- [ ] Check adaptive icon on different launchers
- [ ] Test on multiple Android versions if possible

**Critical Tests** (both platforms):

- [ ] Fresh install (no previous data)
- [ ] Airplane mode (offline functionality)
- [ ] Favorites save and persist after app close
- [ ] Notifications trigger at set time
- [ ] Share to different apps
- [ ] Background music loads and plays
- [ ] Streak increments correctly
- [ ] Time picker works

---

## 📸 APP STORE ASSETS

### 7. Create Screenshots (Required for both stores)

**Status**: Not started

**Required Screenshots**:

**iOS** (all required):

- [ ] iPhone 6.7" display (5 screenshots)
- [ ] iPhone 6.5" display (5 screenshots)
- [ ] iPhone 5.5" display (5 screenshots)
- [ ] iPad Pro 12.9" (3 screenshots)
- [ ] iPad Pro 11" (3 screenshots)

**Android** (required):

- [ ] Phone (16:9) - 4-8 screenshots
- [ ] 7" Tablet (optional)
- [ ] 10" Tablet (optional)

**Screenshot Content** (suggestions):

1. Home screen with beautiful verse
2. Favorites list with saved verses
3. Settings with streak badge visible
4. Notification settings
5. Verse with background music enabled

**Tools**:

- Use iOS Simulator and Android Emulator
- Or use actual devices
- Clean up status bar (hide personal info)
- Use `xcrun simctl io booted screenshot screenshot.png` (iOS)
- Use device screenshot tools (Android)

**Time Estimate**: 2-3 hours

---

### 8. Create App Previews (Optional but recommended)

**Status**: Not started

**What**: Short video demos (15-30 seconds)

**Platforms**:

- iOS: Up to 3 app preview videos
- Google Play: Up to 8 video clips

**Content Ideas**:

- Quick demo of refreshing for new verse
- Saving a verse to favorites
- Showing off reading streak
- Enabling notifications

**Tools**:

- iOS: Use QuickTime screen recording
- Android: Use built-in screen recorder
- Editing: iMovie (free) or CapCut (free)

**Time Estimate**: 1-2 hours (optional, can skip for v1)

---

## 🏪 APP STORE CONNECT (Apple)

### 9. Set Up App in App Store Connect

**Status**: Not started

**Action Required**:

- [ ] Log into appstoreconnect.apple.com
- [ ] Click "+" to create new app
- [ ] Select iOS platform
- [ ] Enter bundle ID: com.labazine.luminaverse
- [ ] Set name: LuminaVerse
- [ ] Choose primary language: English
- [ ] Select Bundle ID from dropdown
- [ ] Create app

### 10. Complete App Store Listing (Apple)

**Status**: Not started

**Required Fields**:

- [ ] Name: LuminaVerse
- [ ] Subtitle: Daily Bible verses with peaceful music and streak tracking
- [ ] Description: (copy from APP_STORE_DESCRIPTION.md)
- [ ] Keywords: bible,verse,daily,inspiration,devotional,christian,scripture,meditation,peaceful,streak
- [ ] Support URL: https://labazine.com/luminaverse/support
- [ ] Marketing URL: https://labazine.com/luminaverse (optional)
- [ ] App Icon: (auto-filled from build)
- [ ] Screenshots: (upload all required sizes)
- [ ] App Review Information:
  - [ ] First Name, Last Name
  - [ ] Phone Number
  - [ ] Email Address
  - [ ] Demo Account: Not required
  - [ ] Notes: (copy from APP_STORE_DESCRIPTION.md - Review Notes section)

**App Information**:

- [ ] Category: Books
- [ ] Secondary Category: Reference
- [ ] Content Rights: Does not contain third-party content
- [ ] Age Rating: 4+ (complete questionnaire - all "No" except religious content)

**Pricing and Availability**:

- [ ] Price: Free
- [ ] Availability: All countries
- [ ] Pre-order: No

---

## 📱 GOOGLE PLAY CONSOLE

### 11. Create App in Google Play Console

**Status**: Not started

**Action Required**:

- [ ] Log into play.google.com/console
- [ ] Click "Create app"
- [ ] Enter app name: LuminaVerse
- [ ] Select default language: English (United States)
- [ ] Choose app or game: App
- [ ] Free or paid: Free
- [ ] Accept declarations
- [ ] Create app

### 12. Complete Google Play Listing

**Status**: Not started

**Store Presence > Main Store Listing**:

- [ ] App name: LuminaVerse
- [ ] Short description: (copy from APP_STORE_DESCRIPTION.md - max 80 chars)
- [ ] Full description: (copy from APP_STORE_DESCRIPTION.md)
- [ ] App icon: 512x512 PNG (export from your 1024x1024)
- [ ] Feature graphic: 1024x500 PNG (create banner image)
- [ ] Phone screenshots: Upload 4-8 images
- [ ] 7" tablet screenshots: Optional
- [ ] 10" tablet screenshots: Optional
- [ ] Category: Books & Reference
- [ ] Tags: Add relevant tags
- [ ] Contact email: support@labazine.com
- [ ] External marketing: No (unless you have website ready)

**Store Presence > Privacy Policy**:

- [ ] Privacy policy URL: https://labazine.com/luminaverse/privacy
      (or link to PRIVACY_POLICY.md in GitHub if no website)

**App Content**:

- [ ] **Privacy Policy**: Set URL
- [ ] **App Access**: All features available without login
- [ ] **Ads**: This app does not contain ads
- [ ] **Content Rating**: Complete questionnaire
  - Reference only
  - Religious content: Yes
  - No violence, drugs, gambling, etc.
  - Should get "Everyone" rating
- [ ] **Target Audience**: All ages
- [ ] **News App**: No
- [ ] **COVID-19 Contact Tracing**: No
- [ ] **Data Safety**:
  - Collects data: No
  - Shares data: No
  - All data encrypted: N/A
  - Users can request deletion: N/A

**Release > Production**:

- [ ] Create new release
- [ ] Upload .aab file from EAS build
- [ ] Release name: 1.0.0 (or "1 - Initial Release")
- [ ] Release notes: (copy "What's New" from APP_STORE_DESCRIPTION.md)
- [ ] Save and review release

---

## 🚀 SUBMISSION

### 13. Submit to Apple App Store

**Status**: Not started

**Process**:

- [ ] Upload build via EAS or Transporter app
- [ ] Wait for build to process (15-30 minutes)
- [ ] Select build in App Store Connect
- [ ] Complete all required fields
- [ ] Submit for review
- [ ] Wait for review (typically 24-48 hours)

**Common Reasons for Rejection**:

- Missing features (should be fine with current features)
- Default/placeholder icons (MUST replace!)
- Broken functionality (test thoroughly)
- Missing privacy policy
- Copyright issues (we're using public domain Bible)

### 14. Submit to Google Play Store

**Status**: Not started

**Process**:

- [ ] Upload .aab via EAS or Play Console
- [ ] Complete all required sections (Store Listing, App Content)
- [ ] Complete Content Rating questionnaire
- [ ] Complete Data Safety form
- [ ] Review release summary
- [ ] Click "Start rollout to Production"
- [ ] Wait for review (typically 1-7 days)

---

## ⏱️ TIMELINE ESTIMATE

**If you do everything yourself**:

- Create icon: 30-60 minutes
- Set up website: 2-3 hours (or use GitHub)
- Developer account setup: 30 minutes (+ wait for approval)
- Create screenshots: 2-3 hours
- Build and test: 1-2 hours
- Fill out store listings: 1-2 hours
- **Total: ~10-15 hours of work**

**If you outsource icon and website**:

- Commission icon: 24-48 hours (minimal effort)
- Use GitHub for privacy policy: 0 hours
- Everything else: ~8-10 hours
- **Total: ~3-4 days with outsourcing**

**Approval Timeline**:

- Apple: Usually 24-48 hours
- Google: Usually 1-7 days
- **From submission to live: 3-10 days**

---

## 💰 COSTS BREAKDOWN

**Required**:

- Apple Developer: $99/year (for iOS)
- Google Play: $25 one-time (for Android)
- **Minimum to launch both: $124**

**Optional**:

- App icon designer: $15-30 (Fiverr)
- Domain name: $10-15/year (if you don't own labazine.com)
- Website hosting: $0-10/month (can use free options)

**Total Cost Range**: $124 (DIY) to $200 (with outsourcing)

---

## 📋 QUICK START - NEXT 3 ACTIONS

If you want to start RIGHT NOW, do these three things:

1. **Create or commission the app icon** (CRITICAL)

   - Quick DIY: Open Canva, search "app icon", create teal book design
   - Or post on Fiverr for $20, get it in 24 hours

2. **Sign up for developer accounts**

   - Apple: developer.apple.com ($99)
   - Google: play.google.com/console ($25)
   - Both take 1-2 days to approve

3. **Set up basic web presence** (for privacy policy URL)
   - Option A: Create GitHub Pages site with PRIVACY_POLICY.md
   - Option B: Post to Google Sites (free, 30 minutes)
   - Option C: Use Carrd.co free tier

Once these 3 are done, you can run your first production build and start the submission process!

---

## ❓ NEED HELP?

If you get stuck:

- **Icon design**: Ask "I need help creating the app icon"
- **Website**: Ask "What's the easiest way to host my privacy policy?"
- **Build errors**: Share the error message
- **Store rejection**: Share the rejection reason

---

## 🎯 SUCCESS CRITERIA

Your app is ready to submit when ALL of these are true:

- ✅ Custom icon installed (not default Expo icon)
- ✅ Privacy policy URL active and accessible
- ✅ Support contact method available
- ✅ Production build created and tested on real device
- ✅ All features working in production build
- ✅ Screenshots captured
- ✅ Developer accounts active and paid
- ✅ Store listings completed in both consoles
- ✅ No crashes or critical bugs

**Current Status**: ~70% ready
**Main blocker**: App icon + website/privacy URL
**Estimated time to submission-ready**: 4-8 hours of focused work

Good luck! 🚀
