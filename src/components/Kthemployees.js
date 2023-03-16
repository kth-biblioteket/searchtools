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
  
function Kthemployees() {
    const searchClient = instantMeiliSearch(
      "https://ref.lib.kth.se/meili",
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
            <div className="header"><h4>KTH Anställda(historik)</h4></div>
            <div className="ais-InstantSearch">
              <InstantSearch indexName="kthanst" searchClient={searchClient}>
                <div className="left-panel">
                  <ClearRefinements />
                  <h2>Organisationsnamn</h2>
                  <RefinementList
                    attribute="Orgnamn"
                    limit={10}
                    showMore />
  
                  <h2>Skola/avd</h2>
                  <RefinementList
                    attribute="Bef_ben"
                    limit={10}
                    showMore />
  
                  <h2>Efternamn</h2>
                  <RefinementList
                    attribute="Enamn"
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
            <div>{props.hit.Fnamn}</div>
          </div>
          <div className="hit-Enamn field">
            <div>Efternamn:</div>
            <div><Highlight attribute="Enamn" hit={props.hit} /></div>
          </div>
          <div className="hit-KTH_id field">
            <div>KTH-id:</div>
            <div>{props.hit.KTH_id}</div>
          </div>
          <div className="hit-Orgnamn field">
            <div>Organisation:</div>
            <div>{props.hit.Orgnamn}</div>
          </div>
          <div className="hit-Bef_ben field">
            <div>Skola/avd:</div>
            <div>{props.hit.Bef_ben}</div>
          </div>
          <div className="hit-ORCIDid field">
            <div>ORCID:</div>
            <div>{props.hit.ORCIDid}</div>
          </div>
          <div className="hit-Anst_nuv_bef field">
            <div>Befattning nuvarande:</div>
            <div>{props.hit.Anst_nuv_bef}</div>
          </div>
          <div className="hit-Bef_t_o_m field">
            <div>Befattning t.o.m:</div>
            <div>{props.hit.Bef_t_o_m}</div>
          </div>
          <div className="hit-Fil_datum field">
            <div>Uppdaterad:</div>
            <div>{props.hit.Fil_datum}</div>
          </div>
  
        </div>
      );
    }
  }

  export default Kthemployees;