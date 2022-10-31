import React from 'react';
import { PageTitle } from './PageTitle';
import { Page } from './Page';
import { Form } from './Form';
import { Field } from './Field';
import { required, minLength } from './Form';

export const AskPage = () => (
  <Page>
    <PageTitle title="Ask a question" />
    <Form
      submitCaption="Submit Your Question"
      validationRules={{
        title: [{ validator: required }, { validator: minLength, args: 10 }],
        content: [{ validator: required }, { validator: minLength, args: 50 }],
      }}
    >
      <Field name="title" label="Title"></Field>
      <Field name="content" label="Content" type="TextArea"></Field>
    </Form>
  </Page>
);

export default AskPage;
