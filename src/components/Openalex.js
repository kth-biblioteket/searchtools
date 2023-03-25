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
  
function Openalex() {
    const searchClient = instantMeiliSearch(
      process.env.REACT_APP_MEILI_URL,
      JSON.parse(sessionStorage.getItem('meili')).apikeys.meili,
      {
        paginationTotalHits: 100,
        primaryKey: 'id',
      }
    );
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
  
                  <h2>Author</h2>
                  <RefinementList
                    attribute="author"
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
            <div><a target="_new" href={props.hit.id} ><Highlight attribute="id" hit={props.hit} /></a></div>
          </div>
          <div className="hit-sn field">
            <div>DOI:</div>
            <div><a target="_new" href={props.hit.doi} ><Highlight attribute="doi" hit={props.hit} /></a></div>
          </div>
          <div className="hit-displayName field">
            <div>Authorships:</div>
            <div><Highlight attribute="authorships" hit={props.hit} /></div>
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