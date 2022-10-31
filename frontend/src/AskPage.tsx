import React from 'react';
import { PageTitle } from './PageTitle';
import { Page } from './Page';
import { Field } from './Field';
import { Form, required, minLength, Values } from './Form';
import { postQuestion } from './QuestionsData';

export const AskPage = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: question ? true : false };
  };
  return (
    <Page>
      <PageTitle title="Ask a question" />
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, args: 10 }],
          content: [
            { validator: required },
            { validator: minLength, args: 50 },
          ],
        }}
        onSubmit={handleSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
      >
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

export default AskPage;
