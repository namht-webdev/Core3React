import React, { lazy, Suspense } from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';
import { QuestionPage } from './QuestionPage';
const AskPage = lazy(() => import('./AskPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="text-4 color-[#5c5a5a]">
        <Header />
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/ask"
            element={
              <Suspense fallback={<p>Loading ...</p>}>
                <AskPage />
              </Suspense>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
