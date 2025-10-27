# How to Update Your Portfolio Website

Your portfolio website now dynamically loads all content from the `data.json` file!

## ✅ What Changed

- **Website now uses `data.json`** for all content
- **No need to touch HTML or JavaScript** to update information
- **Changes appear instantly** when you refresh the page (thanks to the local server)

## 🎯 How to Update Your Portfolio

Simply edit the `data.json` file with any text editor. Here's how to update different sections:

### 1. Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "description": "Your description here"
}
```

### 2. Contact Information
```json
"contact": {
  "email": "your-email@example.com",
  "phone": "+1 234 567 8900",
  "location": "Your City, Country"
}
```

### 3. Social Media Links
```json
"social": {
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "twitter": "https://twitter.com/yourhandle",
  "email": "your-email@example.com"
}
```

### 4. Add/Edit Projects
```json
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "imageIcon": "fas fa-icon",
  "playstore": "URL",
  "github": "URL"
}
```

### 5. Update Skills
```json
"skills": {
  "languages": {
    "items": [
      {"name": "Skill Name", "level": 90}
    ]
  }
}
```

### 6. Add Work Experience
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "duration": "Start - End",
  "type": "Full Time",
  "description": "Job description",
  "responsibilities": [
    "Responsibility 1",
    "Responsibility 2"
  ]
}
```

## 🚀 After Making Changes

1. **Save `data.json`**
2. **Refresh your browser** (or reload the page)
3. **Changes appear immediately!**

## 📝 Tips

- Use valid JSON syntax (commas, quotes, brackets)
- Keep the structure consistent
- Test after changes to ensure everything displays correctly
- You can add or remove projects/experiences by editing the arrays

## 🔍 Validating Changes

To check if your JSON is valid, use Python:
```bash
python3 -c "import json; json.load(open('data.json')); print('Valid JSON')"
```

## ⚡ Quick Updates

**Most common updates:**
- Change name/title → Edit `personal` section
- Add new project → Add object to `projects` array
- Update contact info → Edit `contact` section
- Change skills → Edit `skills` section
- Add experience → Add object to `experience` array

**Remember:** Always keep the JSON structure intact with proper commas and quotes!

