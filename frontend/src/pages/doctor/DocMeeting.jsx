// components/ZoomButton.jsx
import { createZoomMeeting } from '@/store/videoCall-slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ZoomButton = () => {
  const dispatch = useDispatch();
  const { meeting, loading, error } = useSelector((state) => state.video);

  const handleClick = () => {
    dispatch(createZoomMeeting("Doctor Consultation"));
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className="btn btn-primary">
        {loading ? 'Creating Meeting...' : 'Create Zoom Meeting'}
      </button>

      {meeting && (
        <div className="mt-3">
          <p><strong>Join URL:</strong> <a href={meeting.join_url} target="_blank" rel="noreferrer">{meeting.join_url}</a></p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ZoomButton;
