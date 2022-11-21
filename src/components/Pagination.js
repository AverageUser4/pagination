import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useFetch } from '../useFetch'
import Follower from './Follower'

export default function Pagination() {
  const { loading, data, error } = useFetch();

  let { page } = useParams();
  page = page && parseInt(page);
  page = page ?? 1;
  
  const followersPerPage = 10;
  const maxPage = Math.max(Math.ceil(data.length / followersPerPage), 1);
  const indices = { min: Math.max(0, page * followersPerPage - followersPerPage), max: page * followersPerPage - 1 };
  const shownFollowers = data.filter((_, i) => i >= indices.min && i <= indices.max);

  const paginationButtons = [];
  for(let i = 1; i <= maxPage; i++)
    paginationButtons.push(
      <Link
        key={i}
        to={`/${i}`}
        className={'page-btn' + (i === page ? ' active-btn' : '')}
      >{i}</Link>
    );

  function getAdjacentPage(prev = false) {
    let nextPage = page + (prev ? -1 : 1);

    nextPage = nextPage < 1 ? maxPage : nextPage;
    nextPage = nextPage > maxPage ? 1 : nextPage;

    return nextPage;
  }

  if(error)
    return (
      <div className="section-title">

        <h1>Something&apos;s wrong... Please, try again later!</h1>
        <div className="underline"></div>

      </div>
    );

  if(loading)
    return (
      <div className="section-title">

        <h1>Loading...</h1>
        <div className="underline"></div>

      </div>
    );

  if(!shownFollowers.length)
    return (
      <div className="section-title">

        <h1>No such page...</h1>
        <div className="underline"></div>

        <Link className="btn btn--solid" to="/1">Go to page 1</Link>

      </div>
    );

  return (
    <div>

      <div className="section-title">

        <h1>Pagination</h1>
        <div className="underline"></div>

      </div>

      <section className="followers">

        <div className="container">

          {
            shownFollowers.map(person => 
              <Follower
                key={person.id}
                name={person.login}
                imageURL={person.avatar_url}
                profileURL={person.html_url}
              />  
            )
          }

        </div>

        {
          maxPage > 1 &&
            <div className="btn-container">

              <Link 
                className="prev-btn"
                to={`/${getAdjacentPage(true)}`}
              >
                Prev
              </Link>

                {paginationButtons}

              <Link 
                className="next-btn"
                to={`/${getAdjacentPage(false)}`}
              >
                Next
              </Link>

            </div>
        }

      </section>

    </div>
  );
}