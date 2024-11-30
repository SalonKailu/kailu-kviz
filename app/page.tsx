'use client';
import QuizForm from './components/QuizForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <QuizForm />
      </main>
    </div>
  )
}