import React from 'react';
import uuid from 'uuid';

const voteFor = props => {
    return (
        <div className="votes">
        {props.candidate.map(cand => (
          <div className="votes-div" key={uuid()}>
            <img src={cand.passporturl} alt="contestant" />
            <p>{`${cand.firstname} ${cand.lastname}`}</p>
            <p>FOR</p>
            <p>{cand.offices_name}</p>
            <button
              onClick={() =>
                props.voteForCand(
                  cand.office_id,
                  cand.createdby,
                  props.details
                )
              }
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    )
}

export default voteFor;