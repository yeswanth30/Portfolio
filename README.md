# Yeswanth's Professional Portfolio Website

A modern, responsive, and attractive portfolio website showcasing professional skills, experience, and projects.

## Features

✨ **Modern Design**
- Beautiful gradient themes
- Smooth animations and transitions
- Fully responsive layout
- Dark mode interface

📱 **Responsive Design**
- Mobile-first approach
- Works on all devices (desktop, tablet, mobile)
- Hamburger menu for mobile devices

🎨 **Interactive Elements**
- Smooth scrolling navigation
- Animated skill progress bars
- Hover effects on cards and buttons
- Parallax effects on hero section

⚡ **Performance**
- Lightweight and fast loading
- Optimized animations
- No external dependencies except Font Awesome

## Sections

1. **Hero Section** - Eye-catching introduction with social links
2. **About Me** - Personal information and statistics
3. **Skills** - Technical skills with progress bars
4. **Projects** - Featured projects showcase
5. **Experience** - Professional work experience timeline
6. **Education** - Academic background and certifications
7. **Contact** - Contact form and information

## Customization

### Managing Content

All text content is embedded directly in the `script.js` file at the top. This makes it easy to update your portfolio without touching HTML. Simply edit the `portfolioData` object in `script.js` to update any content.

### Updating Personal Information

Simply edit the `portfolioData` object at the top of `script.js`:

1. **Personal Info**: Update `personal.name`, `personal.title`, and `personal.description`
2. **About Section**: Modify `about.paragraph1` and `about.paragraph2`
3. **Stats**: Update the `about.stats` array
4. **Skills**: Modify skill levels and add/remove items in `skills.mobile`, `skills.frameworks`, and `skills.tools`
5. **Projects**: Update project descriptions, technologies, and icons in the `projects` array
6. **Experience**: Change work history in the `experience` array
7. **Education**: Update education details in the `education` array
8. **Contact**: Modify contact information in `contact` object
9. **Social Links**: Update all social media URLs in the `social` object

### Adding Your Photo

Your photo is already set up! Just make sure `IMG_5624.jpg` is in the same folder. To change it:

1. Replace the image file with your own (keep the filename `IMG_5624.jpg` or update the path in `index.html`)

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main theme color */
    --secondary-color: #8b5cf6;   /* Secondary color */
    --accent-color: #ec4899;     /* Accent color */
    /* ... more colors */
}
```

## Usage

### Option 1: Open Directly (Recommended)
Simply open `index.html` in your web browser. All data is embedded directly in the JavaScript file, so no server is needed!

### Option 2: Using a Local Server

If you prefer using a server, you can use the included Python server:

```bash
python3 server.py
```

Then visit `http://localhost:8000`

Or use Python's built-in server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

### Option 3: Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

- [Font Awesome](https://fontawesome.com) for icons
- Custom CSS animations and effects
- Modern web design patterns

## License

This portfolio template is free to use for personal and commercial projects.

## Support

For any questions or suggestions, feel free to reach out!

---

Made with ❤️ by Yeswanth

