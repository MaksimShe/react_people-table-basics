import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { PersonLink } from '../../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people &&
          people.map((person: Person) => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': location.pathname.endsWith(
                  person.slug,
                ),
              })}
            >
              <td>
                <Link
                  to={person.slug}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={person} whoIs={'mother'} />
              </td>
              <td>
                <PersonLink person={person} whoIs={'father'} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
