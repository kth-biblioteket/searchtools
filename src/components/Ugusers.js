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
  
function Ugusers() {
    const [apiResponse, setApiResponse] = useState({});

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
            <div className="header"><h4>KTH Användare(UG)</h4></div>
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
            <div className="hit-actions">
              <button onClick={() => fetchProfileData(props.hit.ugKthid)}>Fetch Profile</button>
          </div>
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
        </div>
      );
    }

    async function fetchProfileData(ugKthid) {
      try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const headers = { 'api_key': JSON.parse(sessionStorage.getItem('meili')).apikeys.kthprofiles };
        const response = await axios.get(`https://api.kth.se/api/profile/v1/kthid/${ugKthid}`);
        setApiResponse(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
}

export default Ugusers;