import { useRead } from '../../apiReqests/useRead';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const People = () => {
  const { people, hasError, isLoading } = useRead();
  const location = useLocation();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {people?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people?.length !== 0 && !isLoading && (
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
                          <Link to={person.slug}>{person.name}</Link>
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother ? (
                            <Link
                              to={person.mother.slug}
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </Link>
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {person.father ? (
                            <Link to={person.father.slug}>
                              {person.fatherName}
                            </Link>
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
