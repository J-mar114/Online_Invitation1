# James & Emily - Wedding Invitation Website

A beautiful, elegant, and modern online wedding invitation website built with **pure HTML, CSS, and vanilla JavaScript** (no frameworks).

## Features

✨ **Elegant Envelope Opening Animation** - Professional introduction experience
💌 **Full Wedding Invitation** - All sections for a complete wedding website
⏰ **Countdown Timer** - Dynamically counts down to the wedding date
🖼️ **Photo Gallery** - Masonry-style gallery with lightbox viewer
📝 **RSVP Form** - Beautiful form with validation and confirmation
🎵 **Music Control** - Play/pause background wedding music
📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
✨ **Scroll Animations** - Beautiful reveal animations as you scroll
🌸 **Floating Particles** - Elegant decorative elements throughout
🎨 **Premium Design** - Emerald green and champagne gold color scheme

## Getting Started

### Opening the Website

1. **Open `index.html` in your web browser**
   - Simply double-click `index.html`
   - Or right-click → Open with → Your preferred browser
   - Or drag `index.html` into your browser

2. **No server required!**
   - This is a static website
   - Works offline
   - No backend needed

### File Structure

```
wedding-invitation/
├── index.html          # Main website
├── style.css           # All styling
├── script.js           # All interactions and animations
├── images/
│   ├── gallery/        # Wedding photo gallery (add your photos here)
│   └── README.txt      # Image customization guide
├── audio/
│   └── README.txt      # Audio setup guide
└── README.md           # This file
```

## How to Customize

### 1. Couple Names and Date

Edit `index.html` and find these lines:

```html
<span class="name-item">James</span>
<span class="ampersand">&</span>
<span class="name-item">Emily</span>
```

Replace "James" and "Emily" with your names.

Find and replace the wedding date:
```html
<p class="wedding-date">December 20, 2026</p>
```

### 2. Wedding Details (Venue, Time, Location)

Find the "Wedding Details" section in `index.html`:

```html
<h3>Ceremony</h3>
<p><strong>📅 Date:</strong> December 20, 2026</p>
<p><strong>⏰ Time:</strong> 10:00 AM</p>
<p><strong>📍 Venue:</strong> The Emerald Garden</p>
```

Update with your actual wedding details.

Also update the countdown timer in `script.js`:

```javascript
const weddingDate = new Date('December 20, 2026 10:00:00').getTime();
```

Change the date/time to match your wedding.

### 3. Your Story

Find the "Our Story" section in `index.html` and update the timeline entries:

```html
<h3>How We Met</h3>
<p>It was a beautiful spring evening...</p>
```

Replace with your actual story.

### 4. Add Your Photos

**Couple Photos:**
1. Save your photos as:
   - `images/bride.jpg`
   - `images/groom.jpg`
2. Edit `index.html` and find couple image sections
3. Change from Unsplash URLs to local images:
   ```html
   <img src="images/bride.jpg" alt="Bride">
   ```

**Gallery Photos:**
1. Save your photos in `images/gallery/` folder
   - `photo1.jpg`, `photo2.jpg`, etc.
2. Edit `index.html` gallery section
3. Update the image sources

### 5. Add Background Music

1. Find a royalty-free wedding song (MP3 format)
2. Save as `audio/wedding-music.mp3` in the audio folder
3. No code changes needed - it will automatically appear

### 6. Color Customization

Edit `style.css` to change colors. At the top, find:

```css
:root {
    --primary: #0F6B50;          /* Emerald Green */
    --dark-primary: #084C3A;     /* Dark Emerald */
    --soft-sage: #DDEDE5;        /* Soft Sage */
    --gold: #D4AF6A;             /* Champagne Gold */
    --cream: #FFFDF7;            /* Cream */
    --white: #FFFFFF;            /* White */
    --dark-text: #26332E;        /* Dark Text */
}
```

Change these hex codes to your preferred colors.

### 7. Font Customization

The website uses Google Fonts:
- **Headings**: Cormorant Garamond (serif)
- **Body**: Poppins (sans-serif)

To change fonts, edit `index.html` line with Google Fonts link, or edit `style.css`:

```css
--serif: 'Your Font Name', serif;
--sans: 'Your Font Name', sans-serif;
```

## Features Overview

### Envelope Opening Animation
- Elegant full-screen envelope
- Click to open with smooth animation
- Transitions into the main website

### Hero Section
- Couple names displayed prominently
- Wedding date
- Decorative elements
- Fade-in text animations

### Couple Section
- Profile photos in circular frames
- Hover effects
- Responsive layout

### Our Story Timeline
- Beautiful timeline design
- Each story point animates on scroll
- Alternating left-right layout on desktop
- Mobile-friendly single column

### Countdown Timer
- Real-time countdown to wedding
- Updates every second
- Shows: Days, Hours, Minutes, Seconds
- Message changes when day arrives

### Wedding Details
- Ceremony information
- Reception information
- Location buttons
- Responsive card layout

### Photo Gallery
- Masonry grid layout
- Click to view fullscreen in lightbox
- Close with click or Escape key
- Beautiful zoom animations

### Wedding Program
- Timeline of wedding day schedule
- Hover effects
- Responsive card layout

### RSVP Form
- Full name field
- Number of guests dropdown
- Acceptance/Decline radio buttons
- Optional message field
- Form validation
- Confirmation message on submit

### Additional Features
- Floating animated particles
- Music control button
- Back-to-top button
- Smooth scrolling navigation
- Mobile hamburger menu
- Fully responsive design

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- All modern browsers (2018+)

## Tips for Best Results

1. **Test on mobile** - Open on your phone to verify responsive design
2. **Check file paths** - Ensure image and audio paths are correct
3. **Optimize images** - Compress images for faster loading
4. **Test all buttons** - Verify RSVP form, gallery, and navigation
5. **Update dates** - Make sure countdown and details match your wedding

## Performance Notes

- Lightweight and fast
- No external dependencies
- Optimized animations using CSS and IntersectionObserver
- Smooth scrolling and interactions
- Mobile-optimized
- Small file sizes

## Troubleshooting

**Images not showing?**
- Check file paths are correct
- Ensure image files exist in the images/ folder
- Clear browser cache (Ctrl+Shift+Delete)

**Countdown not updating?**
- Check the wedding date in script.js matches index.html
- Ensure JavaScript is enabled in browser
- Check browser console for errors (F12)

**RSVP form not working?**
- Check all required fields are filled
- Verify JavaScript is enabled
- Form data is logged to browser console (F12)

**Music not playing?**
- Add audio file to audio/wedding-music.mp3
- Check browser allows media playback
- Some browsers require user interaction first

**Layout looks wrong on mobile?**
- Clear browser cache
- Try different mobile device sizes
- Check that viewport meta tag is present in HTML

## Sharing the Website

### Online Hosting (Free Options)
1. **GitHub Pages** - Free hosting for static sites
2. **Netlify** - Drag and drop deployment
3. **Vercel** - Static site hosting
4. **Firebase Hosting** - Google's hosting solution

### Share via Email
- Compress folder into ZIP file
- Send to guests
- They can extract and open index.html

### Share via Link
- Upload to hosting service
- Send them the URL
- Works on any device with browser

## License

This wedding invitation template is free to use and modify for personal use.

## Support

For questions or customization help:
- Check the comments in HTML, CSS, and JavaScript
- Review the README files in images/ and audio/ folders
- Test in browser developer tools (F12)

---

**Customized for: James & Emily**
**Wedding Date: December 20, 2026**
**Made with ❤️ using HTML, CSS, and JavaScript**

Enjoy your wedding website! 💕
