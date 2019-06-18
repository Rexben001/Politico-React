import React from "react";

const AddOffice = props => {
  return (
    <div className="login">
      <h3>Petition</h3>
      <form
        onSubmit={event =>
          this.props.onPetition(
            event,
            office,
            evidence,
            details,
            this.props.token,
            this.props.history
          )
        }
      >
        <label>Office</label>
        <input
          type="text"
          placeholder="Enter office"
          name="office"
          required
          onChange={this.onChange}
        />
        <label>Evidence</label>
        <input
          type="text"
          placeholder="Enter evidence"
          name="evidence"
          required
          onChange={this.onChange}
        />
        <label>Details</label>

        <input
          type="text"
          placeholder="Enter details"
          name="details"
          required
          onChange={this.onChange}
        />

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOffice;
