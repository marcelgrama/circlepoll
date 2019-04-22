import createMailgun from 'mailgun-js';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import logger from '../services/serverLogger';
import config from '../config/server';
import Layout from '../components/Email/Layout';
import A from '../components/Email/A';
import Title from '../components/Email/Title';

const mailgun = createMailgun({
  apiKey: config.mailgunApiKey,
  domain: config.mailgunDomain
});

const from = 'Circle Poll <me@samples.mailgun.org>';
export const sendEmail = (to, template) => {
  const data = {
    from,
    to,
    subject: template.subject,
    html: ReactDOMServer.renderToString(template.jsxBody)
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      logger.error(error);
    } else {
      logger.log(body);
    }
  });
};

export const newPollTemplate = () => ({
  subject: 'New Poll for you',
  jsxBody: (
    <Layout>
      <Title>New Poll for you</Title>
      <p>
        this is the main text<br />this is the main text
      </p>
      <p>
        this is the main text<br />this is the main text
      </p>
      <A href="https://circlepoll.arobs.com">this is a link</A>
    </Layout>
  )
});

export const circleInvitationTemplate = (circleId, name, description) => ({
  subject: 'New invitation from CirclePoll',
  jsxBody: (
    <Layout>
      <Title>{name}</Title>
      <p>{description}</p>
      <A href={`http://localhost:3000/Invitation?id=${circleId}`}>
        Click here to accept your invitation
      </A>
    </Layout>
  )
});
