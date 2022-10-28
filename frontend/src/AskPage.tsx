import React from 'react';
import { PageTitle } from './PageTitle';
import { Page } from './Page';
import { Form } from './Form';
import { Field } from './Field';

export const AskPage = () => (
  <Page>
    <PageTitle title="Ask a question" />
    <Form submitCaption="Submit Your Question">
      <Field name="title" label="Title"></Field>
      <Field name="content" label="Content" type="TextArea"></Field>
    </Form>
  </Page>
);

export default AskPage;
