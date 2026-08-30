<!-- README: Image Setup -->

This folder contains images for the wedding invitation website.

Current images used (placeholders from Unsplash):

COUPLE PHOTOS:
- bride.jpg (for Emily - currently using Unsplash CDN)
- groom.jpg (for James - currently using Unsplash CDN)

GALLERY IMAGES:
- gallery/ folder contains wedding gallery photos

All images currently use Unsplash's free image CDN URLs for placeholders.

To customize with your own images:

1. COUPLE PHOTOS:
   Edit index.html, find the sections:
   - "couple-image-frame" divs under "The Happy Couple" section
   - Change src="https://images.unsplash.com/..." to src="images/bride.jpg"
   - Replace with your own photos

2. GALLERY PHOTOS:
   Edit index.html, find the "gallery-grid" section
   - Replace all image URLs with your gallery photos
   - Recommended: save images as:
     - gallery/photo1.jpg
     - gallery/photo2.jpg
     - etc.

3. IMAGE REQUIREMENTS:
   - Couple images: 400x400px (will be displayed as circles)
   - Gallery images: Square format (500x500px) recommended
   - Format: JPG or PNG
   - Optimize file sizes for web loading

The website will work with the current Unsplash placeholder images,
so you can see the design before adding your own photos.
