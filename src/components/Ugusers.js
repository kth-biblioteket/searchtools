import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import React, { useState } from 'react';
import axios from 'axios';

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
  
// Hjälpfunktion för att formatera datumsträngen YYYYMMDDHHMMSS.fZ
const formatMeiliDate = (dateString) => {
    if (!dateString) return "Okänt datum";

    // Formatera om strängen till YYYY-MM-DDTHH:MM:SS.fZ för att Date-objektet ska tolka den korrekt som UTC
    const formattedString = 
        dateString.substring(0, 4) + '-' + 
        dateString.substring(4, 6) + '-' + 
        dateString.substring(6, 8) + 'T' + 
        dateString.substring(8, 10) + ':' + 
        dateString.substring(10, 12) + ':' + 
        dateString.substring(12, 17); // Inkluderar sekunder, bråkdel och Z

    const date = new Date(formattedString);

    // Använd Intl.DateTimeFormat för en läsbar, lokaliserad sträng
    // Vi formaterar den till svenskt format här för tydlighetens skull
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    return new Intl.DateTimeFormat('sv-SE', options).format(date);
};

function Ugusers() {

  const [indexStats, setIndexStats] = useState(null);
    const meiliConfig = JSON.parse(sessionStorage.getItem('meili'));

    // Hämta metadata för indexet
    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_MEILI_URL}/indexes/ugusers`,
                    {
                        headers: {
                            Authorization: `Bearer ${meiliConfig.apikeys.meili}`,
                        },
                    }
                );
                setIndexStats(response.data);
            } catch (error) {
                console.error("Kunde inte hämta index-stats", error);
            }
        };
        fetchStats();
    }, [meiliConfig.apikeys.meili]);

    const searchClient = instantMeiliSearch(
      process.env.REACT_APP_MEILI_URL,
      JSON.parse(sessionStorage.getItem('meili')).apikeys.meili,
      {
        paginationTotalHits: 100,
        primaryKey: 'sAMAccountName',
      }
    );
    return (
      <>
        <Container>
          <main>
            <NavBar />
            <div className="header"><h4>KTH Användare(UG)</h4>
            {indexStats && (
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                    Index senast synkroniserat: {new Date(indexStats.updatedAt).toLocaleString('sv-SE')}
                </p>
            )}
            </div>
            <div className="ais-InstantSearch">
              <InstantSearch indexName="ugusers" searchClient={searchClient}>
                <div className="left-panel">
                  <ClearRefinements />

                  <h2>Title</h2>
                  <RefinementList
                    attribute="title"
                    limit={10}
                    showMore />
  
                  <h2>Grupp</h2>
                  <RefinementList
                    attribute="kthPAGroupMembership"
                    limit={10}
                    showMore />
  
                  <h2>Primary affiliation</h2>
                  <RefinementList
                    attribute="ugPrimaryAffiliation"
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
      return (
        <div>
          <div className="hit-givenName field">
            <div>Förnamn:</div>
            <div>{props.hit.givenName}</div>
          </div>
          <div className="hit-sn field">
            <div>Efternamn:</div>
            <div><Highlight attribute="sn" hit={props.hit} /></div>
          </div>
          <div className="hit-displayName field">
            <div>Display namn:</div>
            <div>{props.hit.displayName}</div>
          </div>
          <div className="hit-ugKthid field">
            <div>KTH-id:</div>
            <div>{props.hit.ugKthid}</div>
          </div>
          <div className="hit-title field">
            <div>Titel:</div>
            <div>{props.hit.title}</div>
          </div>
          <div className="hit-ugPrimaryAffiliation field">
            <div>Primär affiliering:</div>
            <div>{props.hit.ugPrimaryAffiliation}</div>
          </div>
          <div className="hit-ugAffiliation field">
            <div>Affilieringar:</div>
            <div className="ugAffiliation">{ugaff}</div>
          </div>
          <div className="hit-mail field">
            <div>Mail:</div>
            <div>{props.hit.mail}</div>
          </div>
          <div className="hit-kthPAGroupMembership field">
            <div>Grupp:</div>
            <div>{props.hit.kthPAGroupMembership}</div>
          </div>
              {props.hit.mail && props.hit.ugPrimaryAffiliation == "staff" && (
                <div className="hit-actions field">
                  <div>Profile:</div>
                  <div>
                    <a target = "_new" href={"https://www.kth.se/profile/" + props.hit.mail.replace("@kth.se","")}>{"https://www.kth.se/profile/" + props.hit.mail.replace("@kth.se","")}</a>
                  </div>
                </div>
              )}
          <div className="hit-whenChanged field">
            <div>Uppdaterad:</div>
            <div>{formatMeiliDate(props.hit.whenChanged)}</div>
          </div>
        </div>
      );
    }
}

export default Ugusers;