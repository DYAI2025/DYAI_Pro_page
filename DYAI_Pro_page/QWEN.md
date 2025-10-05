# DYAI - Design Your Augmented Intelligence Website

## Project Overview

This is a static website for "DYAI - Design Your Augmented Intelligence", a consulting and coaching service focused on the integration of artificial intelligence as a strategic partner rather than just a tool. The website is built using modern web technologies with a focus on clean design, responsive layouts, and smooth user experience.

The site consists of 5 main pages:
- **Home page** (`index.html`) - Main landing page with overview of the company philosophy
- **Philosophy page** (`philosophy.html`) - Detailed explanation of the core principles and vision
- **Services page** (`services.html`) - Information about consulting, coaching, and workshop offerings
- **Insights page** (`insights.html`) - Blog section with articles and thought leadership content
- **Contact page** (`contact.html`) - Contact form and direct contact information

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS** - Custom styles and Tailwind CSS for layout and responsive design
- **JavaScript (ES6)** - Dynamic content loading and interactive features
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide Icons** - Lightweight icon library
- **Google Fonts** - Lora (serif) and Poppins (sans-serif) fonts

## Architecture and Structure

### File Structure
```
QJOBc9N/
├── app.js              # Main JavaScript application logic
├── data.js             # Content data for services and insights
├── style.css           # Custom CSS styles
├── index.html          # Home page
├── philosophy.html     # Philosophy and vision page
├── services.html       # Services and offerings page
├── insights.html       # Insights and articles page
└── contact.html        # Contact page with form
```

### JavaScript Architecture

The application uses a modular JavaScript approach with:

- **App object** - Main application controller that initializes all functionality
- **Dynamic header/footer** - Reusable header and footer components loaded via JavaScript
- **Content management** - Services and insights data loaded dynamically from `data.js`
- **Scroll animations** - Intersection Observer for fade-in animations as elements scroll into view
- **Mobile navigation** - Responsive menu toggle for mobile devices

### Data Structure

The content is organized in `data.js` with two main exports:
- `services` - Array of service objects containing icon, title, and description
- `insights` - Array of article objects containing category, title, and summary

## Styling System

### Color Palette
- **Deep Space Blue** (`#0D1B2A`) - Primary dark color for headers, backgrounds
- **Living Coral** (`#FF6F61`) - Accent color for highlights, buttons, and interactive elements
- **Future White** (`#F0F4F8`) - Light background color
- **Structure Grey** (`#415A77`) - Text color for body content

### Typography
- **Poppins** - Sans-serif font for headings and UI elements
- **Lora** - Serif font for body text and longer form content

### Responsive Design
The site uses Tailwind CSS for responsive design with breakpoints for mobile, tablet, and desktop views. The navigation transforms from a hamburger menu on mobile to a horizontal menu on desktop.

## Features

1. **Dynamic Content Loading** - Services and insights are loaded dynamically from data files
2. **Responsive Navigation** - Mobile-friendly hamburger menu that transforms on larger screens
3. **Scroll Animations** - Elements fade in as the user scrolls down the page
4. **Contact Form** - Interactive form with validation and success feedback
5. **Reusable Components** - Header and footer loaded dynamically to maintain consistency
6. **Icon Integration** - Lucide icons for visual enhancement and user experience

## Building and Running

This is a static website that can be run directly in a browser or served through any web server. No build process is required.

To run locally:
1. Navigate to the project directory: `cd /home/dyai/Dokumente/DYAI_home/DYAI_PRO_PAGE/QJOBc9N`
2. Open any HTML file in a browser or serve the directory with any static file server

For example:
```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node's http-server
npx http-server
```

## Development Conventions

- Use semantic HTML5 elements for better accessibility
- Follow Tailwind CSS utility-first approach for styling consistency
- Implement responsive design for all screen sizes
- Use JavaScript modules to organize functionality
- Maintain consistent color palette and typography
- Include data attributes for JavaScript functionality
- Use CSS custom properties for color management

## Project Purpose

DYAI (Design Your Augmented Intelligence) advocates for a paradigm shift in how humans interact with artificial intelligence - moving from seeing AI as a mere tool to viewing it as a strategic partner. The website presents their philosophy based on four core principles:

1. **Partnership over Tool**: Viewing AI as a collaborative partner
2. **Proactive Future Shaping**: Taking initiative in shaping the AI-integrated future
3. **Human-Centered Evolution**: Using AI to enhance human growth and awareness
4. **Conscious Engagement**: Promoting critical and curious engagement with AI

The site serves as a platform to communicate this vision and offer consulting, coaching, and educational services to individuals and organizations looking to develop symbiotic relationships with AI systems.