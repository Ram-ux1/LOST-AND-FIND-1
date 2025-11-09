# **App Name**: FindMyStuff

## Core Features:

- Item Posting: Users can post lost or found items with descriptions, images, and location details.
- Image Upload and Display: Enable users to upload images of items, displaying them in item listings. The Image Upload feature resizes images on the client side before uploading to the storage. Implement secure image upload UI to Firebase Storage (preferred) or Cloudinary.
- Smart Matching: An algorithm that identifies potential matches between lost and found items using text similarity and location. A simple matching endpoint GET /matches?itemId=... will return candidate matches using text similarity, using a TF-IDF or simple bag-of-words vector and cosine similarity.
- Claim Verification: A flow where item owners can send claim requests and finders can verify the claim, using email verification tokens or challenge questions.  LLM acts as a tool which can evaluate a submitted claim to suggest an appropriate workflow based on attributes associated with that claim. JWT authentication is utilized to create user sessions.
- Admin Dashboard: A panel for administrators to view, manage, and moderate all items, users, and claims. Admin can view all posts, mark spam, approve images, and change statuses.  Implement admin-only routes and simple role check middleware.
- In-App Contact: Allow users to contact each other regarding items directly through the app using email alerts when new item likely matches their lost/found post. Use background task or real-time triggers, plus Firebase Cloud Function trigger on new item to send email.
- Responsive UI: Application has fully responsive User Interface with light/dark theme switch that is persisted in local storage.

## Style Guidelines:

- Primary color: Strong, friendly purple (#9D4EDD), providing modernity without the coldness of blues. It's distinctive and memorable.
- Background color: Very light, desaturated purple (#F5EEF8), creating a soft backdrop that allows content to stand out.
- Accent color: A pink of slightly similar hue (#D4A373), lending contrast for CTAs, buttons, and other elements, adding energy to the calm palette.
- Headline font: 'Belleza', sans-serif, aligned to art and design; short chunks of text.
- Body font: 'Alegreya', a humanist serif with a literary feel; longer blocks of text.
- Note: currently only Google Fonts are supported.
- Simple, outlined icons from a consistent set.
- Grid-based layout for item listings.
- Subtle transitions for UI elements and loading states using Framer Motion.