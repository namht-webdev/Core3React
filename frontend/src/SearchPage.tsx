import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTitle } from './PageTitle';
import { searchQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('criteria') || '';
  const [questions, setQuestions] = useState<QuestionData[] | []>([]);
  useEffect(() => {
    const doSearch = async (criteria: string) => {
      setQuestions(await searchQuestions(criteria));
    };
    doSearch(search);
  }, [search]);
  return (
    <Page>
      <PageTitle title="Search Results" />
      {search && <p className="text-[16px] italic">for {search}</p>}
      <QuestionList data={questions} />
    </Page>
  );
};
