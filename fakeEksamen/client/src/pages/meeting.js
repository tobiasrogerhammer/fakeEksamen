import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../meeting.module.css";

function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    agenda: "",
    isCompleted: false,
  });

  const createMeeting = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/meeting/create", formData);
      setFormData({
        title: "",
        startTime: "",
        endTime: "",
        location: "",
        agenda: "",
        isCompleted: false,
      });
      alert("Meeting created successfully!");
    } catch (err) {
      console.log(err);
      alert("Error creating meeting.");
    }
  };

  const updateIsCompleted = async (id, isCompleted) => {
    try {
      await axios.put(`http://localhost:5000/meeting/update/${id}`, {
        isCompleted,
      });
      setMeetings((prevMeetings) => {
        const updatedMeetings = prevMeetings.map((meeting) =>
          meeting._id === id ? { ...meeting, isCompleted } : meeting
        );
        return updatedMeetings;
      });
      alert("Meeting updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Error updating meeting.");
    }
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/meeting/fetch");
        const meetings = response.data.map((meeting) => ({
          ...meeting,
        }));
        setMeetings(meetings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
    const intervalId = setInterval(fetchMeetings, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.meeting}>
      <h2>Metings</h2>
      <div className={styles.meetingsMain}>
        <ul>
          {meetings.map((meeting, i) => (
            <li key={i}>
              <h3>{meeting.title}</h3>
              <p>Start Time: {new Date(meeting.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(meeting.endTime).toLocaleString()}</p>
              <p>Location: {meeting.location}</p>
              <p>Agenda: {meeting.agenda}</p>
              <p>
                Godkjent møte:{" "}
                {meeting.isCompleted ? <span> ja</span> : <span>Nei</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={createMeeting}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={formData.startTime}
            onChange={(event) =>
              setFormData({ ...formData, startTime: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={formData.endTime}
            onChange={(event) =>
              setFormData({ ...formData, endTime: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="agenda">Agenda:</label>
          <textarea
            id="agenda"
            value={formData.agenda}
            onChange={(event) =>
              setFormData({ ...formData, agenda: event.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="isCompleted">Is Completed:</label>
          <input
            type="checkbox"
            id="isCompleted"
            checked={formData.isCompleted}
            onChange={(event) =>
              setFormData({ ...formData, isCompleted: event.target.checked })
            }
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Meeting;
