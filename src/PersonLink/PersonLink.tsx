import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
  whoIs: 'mother' | 'father';
};

export const PersonLink: React.FC<Props> = ({ person, whoIs }) => {
  let displayName = '';

  if (whoIs === 'mother') {
    displayName = person.motherName || '-';
  } else {
    displayName = person.fatherName || '-';
  }

  return person[whoIs] ? (
    <Link
      to={`/people/${person[whoIs]?.slug}`}
      className={
        whoIs === 'mother' && displayName !== '-' ? 'has-text-danger' : ''
      }
    >
      {displayName}
    </Link>
  ) : (
    displayName
  );
};
