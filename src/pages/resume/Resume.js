import React from 'react';
import SelfInterview from './SelfInterview';
import UserInfo from './UserInfo';
import Experience from './Experience';
import License from './License';
import Prize from './Prize';
import Project from './Project';

const Resume = () => {
  return (
    <div>
      <h1>Resume</h1>
      <UserInfo />
      <SelfInterview />
      <Experience />
      <License />
      <Prize />
      <Project />
    </div>
  );
};

export default Resume;