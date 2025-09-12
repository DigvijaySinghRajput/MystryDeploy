# Mystry World - Anonymous Messaging Platform

A modern, full-stack anonymous messaging application built with Next.js 15, TypeScript, and MongoDB. Users can create profiles, share unique links, and receive anonymous messages from others while maintaining complete privacy.

## 🌟 Features

### Core Functionality

- **Anonymous Messaging**: Send and receive messages without revealing identity
- **User Authentication**: Secure sign-up/sign-in with email verification
- **Profile Management**: Create unique usernames and manage message settings
- **Real-time Search**: Find users by username with live search functionality
- **Message Management**: View, delete, and organize received messages
- **AI-Powered Suggestions**: Get intelligent message suggestions using AI

### Technical Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Built-in theme switching with system preference detection
- **Form Validation**: Comprehensive client and server-side validation with Zod
- **Database Integration**: MongoDB with Mongoose ODM
- **Email Service**: Resend integration for verification emails
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: shadcn/ui components with Radix UI primitives

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- Resend API key for email functionality

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mystry-world.git
   cd mystry-world
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Protected routes
│   │   ├── dashboard/     # User dashboard
│   │   └── page.tsx       # Home page
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Login page
│   │   ├── sign-up/       # Registration page
│   │   └── verify/        # Email verification
│   ├── (message)/         # Message routes
│   │   └── dm/[username]/ # User message pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── message.tsx       # Message card component
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
├── model/                # Database models
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Next Themes** - Theme management

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **Resend** - Email service

### AI Integration

- **Google Generative AI** - Message suggestion generation
- **AI SDK** - React integration for AI features

## 🔧 API Endpoints

### Authentication

- `POST /api/sign-up` - User registration
- `POST /api/verifyemailcode` - Email verification
- `GET /api/auth/[...nextauth]` - NextAuth endpoints

### User Management

- `GET /api/check-username-unique` - Username availability
- `GET /api/search-username` - User search
- `POST /api/accept-messages` - Toggle message acceptance

### Messaging

- `POST /api/send-message` - Send anonymous message
- `GET /api/get-messages` - Retrieve user messages
- `DELETE /api/delete-message/[id]` - Delete message
- `POST /api/suggest-messages` - AI message suggestions

## 🎨 Customization

### Theme Configuration

The app supports both light and dark themes. Customize colors in `src/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  /* Add your custom colors */
}
```

### Component Styling

All components use Tailwind CSS classes and can be customized by modifying the component files in `src/components/`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure session management
- **Input Validation**: Server-side validation with Zod
- **Email Verification**: Required for account activation
- **Rate Limiting**: Built-in protection against abuse
- **CORS Protection**: Configured for secure API access

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and email verification
- [ ] Login/logout functionality
- [ ] Message sending and receiving
- [ ] Username search functionality
- [ ] Message deletion
- [ ] Theme switching
- [ ] Responsive design on mobile/tablet
- [ ] Error handling for invalid inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

If you encounter any issues or have questions:

Contact: [rajputdd15@gmail.com](mailto:your-email@example.com)

---

**Built with ❤️ by Digvijay**

_Last updated: September 2025_
