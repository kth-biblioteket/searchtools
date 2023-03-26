import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import {
    InstantSearch,
    Hits,
    InfiniteHits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
  } from 'react-instantsearch-dom';

  import NavBar from "./navBar"
  import { Container } from 'react-bootstrap';
  import { useState } from 'react';
  
function Openalex() {
    const searchClient = instantMeiliSearch(
      process.env.REACT_APP_MEILI_URL,
      JSON.parse(sessionStorage.getItem('meili')).apikeys.meili,
      {
        paginationTotalHits: 100,
        primaryKey: 'id',
        attributesToHighlight: []
      }
    );
    
    const Authorships = ({ authorships }) => {
      const [showMoreAuthors, setShowMore] = useState(false);
    
      const handleShowMoreClick = () => {
        setShowMore(true);
      };
      const handleShowLessClick = () => {
        setShowMore(false);
      };
    
      return (
        <ul>
          <li>
            <div>{authorships[0].author.display_name}</div>
            {showMoreAuthors && (
              <ul>
                {authorships.slice(1).map((authorship, index) => (
                  <li key={index}>
                    <div>{authorship.author.display_name}</div>
                    <ul>
                      {authorship.institutions.map((institution, index) => (
                        <li key={index}>{institution.display_name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {!showMoreAuthors && authorships.length > 1 && (
            <button onClick={handleShowMoreClick}>Show more authors</button>
          )}
          {showMoreAuthors && (
            <button onClick={handleShowLessClick}>Show less authors</button>
          )}
        </ul>
      );
    };
    
    return (
      <>
        <Container>
          <main>
            <NavBar />
            <div className="header"><h4>Openalex</h4></div>
            <div className="ais-InstantSearch">
              <InstantSearch indexName="openalex" searchClient={searchClient}>
                <div className="left-panel">
                  <ClearRefinements />
                  <h2>Title</h2>
                  <RefinementList
                    attribute="title"
                    limit={10}
                    showMore />
  
                  <h2>DOI</h2>
                  <RefinementList
                    attribute="doi"
                    limit={10}
                    showMore />
  
                  <h2>Publiceringsdatum</h2>
                  <RefinementList
                    attribute="publication_date"
                    limit={10}
                    showMore />

                  <h2>Institution</h2>
                  <RefinementList
                    attribute="institution"
                    limit={10}
                    showMore />
                  <h2>Utgivare</h2>
                  <RefinementList
                    attribute="publisher"
                    limit={10}
                    showMore />
  
                </div>
                <div className="right-panel">
                  <SearchBox showLoadingIndicator/>
                  <InfiniteHits hitComponent={Hit} />
  
                </div>
                <Configure hitsPerPage={10} />
              </InstantSearch>
            </div>
          </main>
        </Container>
      </>
    );
    function Hit(props) {
      /*
      let ugaff = ""
      if (typeof props.hit.ugAffiliation != "undefined") {
        if (Array.isArray(props.hit.ugAffiliation) && props.hit.ugAffiliation.length > 0) {
          for (let index = 0; index < props.hit.ugAffiliation.length; index++) {
            if (index === 0) {
              ugaff += props.hit.ugAffiliation[index];
            } else {
              ugaff += ', ' + props.hit.ugAffiliation[index];
            }
          }
        } else {
          ugaff = props.hit.ugAffiliation;
        }
  
      }
      */
      return (
        <div>
          <div className="hit-givenName field">
            <div>Titel:</div>
            <div>{props.hit.title}</div>
          </div>
          <div className="hit-displayName field">
            <div>Work Openalex Id:</div>
            <div><a target="_new" href={props.hit.id} >{props.hit.id}</a></div>
          </div>
          <div className="hit-sn field">
            <div>DOI:</div>
            <div><a target="_new" href={props.hit.doi} >{props.hit.doi}</a></div>
          </div>
          <div className="hit-displayName field">
            <div>Authors</div>
            <div><Authorships authorships={props.hit.authorships} /></div>
          </div>
          <div className="hit-title field">
            <div>Publiceringsdatum:</div>
            <div>{props.hit.publication_date}</div>
          </div>
          <div className="hit-mail field">
            <div>Utgivare:</div>
            <div>{props.hit.host_venue.publisher}</div>
          </div>
        </div>
      );
    }
  }


  export default Openalex;