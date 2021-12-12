import React, { useEffect, useState } from "react";

const InsertForm: React.FC = () => {
  return (
    <div>
      <form>
        <div className="mb-4">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input type="text" id="title" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input type="text" id="description" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="description">
            Type
          </label>
          <select className="form-control" >
            <option disabled selected hidden></option>
            <option value="PAST">PAST</option>
            <option value="UPCOMING">UPCOMING</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="dateTime">
            Date & Time
          </label>
          <input type="datetime-local" id="dateTime" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="link">
            Link
          </label>
          <input type="text" id="link" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="tags">
            Tags
          </label>
          <input type="text" id="tags" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="imageUrl">
            Image
          </label>
          <input type="file" id="imageUrl" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          ADD
        </button>
      </form>
    </div>
  );
};

export default InsertForm;
