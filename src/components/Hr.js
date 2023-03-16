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
  
function Hr() {
    const searchClient = instantMeiliSearch(
      "https://ref.lib.kth.se/meili",
      JSON.parse(sessionStorage.getItem('meili')).apikeys.meili,
      {
        paginationTotalHits: 100,
        primaryKey: 'kthid',
      }
    );
    return (
      <>
        <Container>
          <main>
            <NavBar />
            <div className="header"><h4>KTH HR</h4></div>
            <div className="ais-InstantSearch">
              <InstantSearch indexName="hr" searchClient={searchClient}>
                <div className="left-panel">
                  <ClearRefinements />
                  <h2>Organisationsnamn</h2>
                  <RefinementList
                    attribute="unit_name"
                    limit={10}
                    showMore />
  
                  <h2>Titel</h2>
                  <RefinementList
                    attribute="emp_desc"
                    limit={10}
                    showMore />
  
                  <h2>Efternamn</h2>
                  <RefinementList
                    attribute="lastname"
                    limit={10}
                    showMore />
                  <Configure hitsPerPage={10} />
                </div>
                <div className="right-panel">
                  <SearchBox />
                  <Pagination />
                  <Hits hitComponent={Hit} />
                  <Pagination />
                </div>
              </InstantSearch>
            </div>
          </main>
        </Container>
      </>
    );
    function Hit(props) {
      return (
        <div>
          <div className="hit-Fnamn field">
            <div>Förnamn:</div>
            <div>{props.hit.firstname}</div>
          </div>
          <div className="hit-Enamn field">
            <div>Efternamn:</div>
            <div><Highlight attribute="lastname" hit={props.hit} /></div>
          </div>
          <div className="hit-KTH_id field">
            <div>KTH-id:</div>
            <div>{props.hit.kthid}</div>
          </div>
          <div className="hit-Orgnamn field">
            <div>Organisation:</div>
            <div>{props.hit.unit_name}</div>
          </div>
          <div className="hit-Bef_ben field">
            <div>Titel:</div>
            <div>{props.hit.emp_desc}</div>
          </div>
          <div className="hit-Anst_nuv_bef field">
            <div>Befattning nuvarande:</div>
            <div>{props.hit.emp_beg}</div>
          </div>
          <div className="hit-Bef_t_o_m field">
            <div>Befattning t.o.m:</div>
            <div>{props.hit.emp_end}</div>
          </div>
          <div className="hit-Fil_datum field">
            <div>Uppdaterad:</div>
            <div>{props.hit.emp_lastmod}</div>
          </div>
  
        </div>
      );
    }
  }

  export default Hr;