# PrepWise

PrepWise is an AI-powered study planner that helps students build personalized revision schedules based on their subject, topics, and exam date.

## Features

- **Personalized Study Plans**  
  Generate custom schedules tailored to your subject and topic list.

- **Exam-Focused Planning**  
  Build timelines backward from your exam date for efficient preparation.

- **Saved Plans**  
  Store generated schedules for future access and progress tracking.

- **Simple User Experience**  
  Lightweight and easy-to-use interface for quick planning.

## How It Works

1. Enter your **subject**.
2. Add the **topics** you want to study.
3. Set your **exam date**.
4. PrepWise generates a structured, personalized study plan.
5. Save and revisit your plan anytime.

## Use Cases

- Students preparing for school or university exams
- Learners who need structured revision timelines
- Anyone looking to improve study consistency and time management

## Tech Stack
- NextJs
- Database: Supabase
- AI Integration: Groq API

## Installation
### Clone the repository
### git clone https://github.com/KelvinKipchumba67/PrepWise.git

### Navigate into the project
### cd PrepWise

### Install dependencies
npm install

### Start development server
npm run dev

## Environment Variables

Create a `.env` file in the project root and add required values:

# Example
GROQ_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
JWT_TOKEN=your_jwt_token_here

## Project Structure



PrepWise/
├── app/
│   ├── components/
│   ├── api/
│   ├── plans/
│   └── auth/
│   └── dashboard/
├── public/
├── .env.example
├── package.json
└── README.md

## Future Improvements

- Progress tracking dashboard
- Smart reminders and notifications
- Difficulty-based topic prioritization
- Calendar integrations (Google Calendar, Notion, etc.)
- Collaborative study groups

## Contributing

Contributions are welcome

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

Choose a license for your project (e.g., MIT) and add it here.

---

Built to make exam preparation smarter and simpler.
````
